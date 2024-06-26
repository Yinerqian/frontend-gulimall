import Vue from 'vue'

var extend = {
  //使用混入定义全局中常用的变量方法等
  data() {
    return {
      pagination: {
        pageNum: 1,
        pageSize: 20, //每页中显示10条数据
        total: 0,
      },
      tableList: [], //主页面表格列表数据
      searchForm: {}, //搜索框组内的条件对象
      isSearchMore: false, // 是否展示全部搜索条件
      isShowSearchGroups: false, //主页面是否显示搜索框组
      primaryIdd: '',
      readonlyy: false, //主页面弹框的新增,编辑,查看所需要的可编辑状态
      isShowSubDialog: false, //主页面是否展示查看页面,如果新增,查看,编辑页面内容都是用的同一个组件,那么就不要要使用这个变量
      form: {}, //子页面接受详情的变量
      loading: false, // 加载中
      formLoading: false, // 加载中
      isNotPage: false, // 没有翻页的List
    }
  },
  computed: {
    _pagination: {
      //data中不能以下划线开头,用computed的替代,下划线没有任何语法意义,只是说明他是从extend继承过来的
      get() {
        return this.pagination
      },
      set(val) {
        this.pagination = val
      },
    },
    _primaryId: {
      get() {
        return this.primaryIdd
      },
      set(val) {
        this.primaryIdd = val
      },
    },
    _tableList: {
      get() {
        return this.tableList
      },
      set(val) {
        this.tableList = val
      },
    },
    _isShowSearchGroups: {
      get() {
        return this.isShowSearchGroups
      },
      set(val) {
        this.isShowSearchGroups = val
      },
    },
    _searchForm: {
      get() {
        return this.searchForm
      },
      set(val) {
        this.searchForm = val
      },
    },
    _isSearchMore: {
      get() {
        return this.isSearchMore
      },
      set(val) {
        this.isSearchMore = val
      },
    },
    _readonly: {
      get() {
        return this.readonlyy
      },
      set(val) {
        this.readonlyy = val
      },
    },
    _isShowSubDialog: {
      get() {
        return this.isShowSubDialog
      },
      set(val) {
        this.isShowSubDialog = val
      },
    },
    _form: {
      get() {
        return this.form
      },
      set(val) {
        this.form = val
      },
    },
    _loading: {
      get() {
        return this.loading
      },
      set(val) {
        this.loading = val
      },
    },
    _formLoading: {
      get() {
        return this.formLoading
      },
      set(val) {
        this.formLoading = val
      },
    },
  },
  created() { },
  methods: {
    _onMoreSearch() {
      this._isSearchMore = !this._isSearchMore
    },
    _searchText() {
      return !this.isSearchMore ? '更 多' : '收 起'
    },
    /**
     *
     * @param {*} fn 请求list的方法
     * @returns
     */
    _loadData(params = this.searchForm) {
      this._loading = true
      let newParams = Object.assign({}, this._searchForm, params)
      return new Promise((resolve, reject) => {
        this.pageListApi(this._pagination.pageNum, this._pagination.pageSize, newParams) // 需要在 data 中写好对应关系
          .then((res) => {
            this._loading = false
            if (this._searchForm.isNotPage) {
              this._tableList = res.content || []
            } else {
              this._tableList = res.content.list || []
              this._pagination.total = res.content.total
            }
            resolve(res)
          })
          .catch((res) => {
            this._loading = false
          })
      })
    },
    _loadDataWithNoPage(params = this.searchForm) {
      this._loading = true
      let newParams = Object.assign({}, this._searchForm, params)
      return new Promise((resolve, reject) => {
        this.pageListApi(newParams) // 需要在 data 中写好对应关系
          .then((res) => {
            this._loading = false
            this._tableList = res.content || []
            resolve(res)
          })
          .catch((res) => {
            reject(res)
            this._loading = false
          })
      })
    },
    /**
     * 表格序号自动累加
     * @param {*} index
     * @param {*} pageObj
     * @returns
     */
    _tableIndex(
      index,
      pageObj = {
        pageNum: this._pagination.pageNum,
        pageSize: this._pagination.pageSize,
      }
    ) {
      return (pageObj.pageNum - 1) * pageObj.pageSize + index + 1
    },
    /**
     * 切换到第几页
     * @param {*} args
     * @param {*} fn 回调
     */
    _onPageNumchange(args, fn) {
      this._pagination.pageNum = args[0]
      fn && fn()
    },
    /**
     * 每页展示多少条
     * @param {*} args
     * @param {*} fn
     */
    _onPageSizeChange(args, fn) {
      this._pagination.pageSize = args[0]
      this._pagination.pageNum = 1
      fn && fn()
    },
    /**
     * 表格查看一行详情, 传入这一行的id
     * @param {*} primaryId
     */
    _onWillView(primaryId) {
      this._isShowSubDialog = true
      this._readonly = true
      this._primaryId = primaryId
    },
    /**
     * 表格编辑一行, 传入这一行的id
     * @param {*} primaryId
     */
    _onWillEdit(primaryId) {
      this._isShowSubDialog = true
      this._readonly = false
      this._primaryId = primaryId
    },
    /**
     * 新增弹框打开
     */
    _onWillAdd() {
      this._isShowSubDialog = true
      this._readonly = false
      this._primaryId = ''
    },
    _onConfirm(pre="", key, suf = "") {
      let msg = `${pre} <strong style="font-size:14px; color: #ffb525;">[${key}]</strong> ${suf}`
      return this.$confirm(msg, '确认', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        confirmButtonClass: 'confirm-button-class el-icon-check',
        cancelButtonClass: 'cancel-button-class el-icon-close',
        type: "warning",
      })
    },
    /**
     *
     * @param {*} primaryId  // keyid
     * @param {*} msg // 删除的提示信息
     * @param {*} fn // 点击确认后执行的删除方法,回调函数
     * @returns
     */
    _onDelete(primaryId, keyName, msg = '你确定删除', fn) {
      if (keyName) {
        msg = `你确定删除<strong style="font-size:14px; color: #ffb525;">[${keyName}]</strong>吗？}`
      }
      return this.$confirm(msg, '确认', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: "warning",
      })
        .then(() => {
          return new Promise((resolve, reject) => {
            this.delRowApi(primaryId).then((res) => {
              this._loadData() // 删除刷新列表, 保证有loadData 这个方法
              resolve(res)
            })
          })
        })
        .catch((err) => { })
    },
    _onTableExport() { },
    /**
     * 表格查询事件
     * @param {*} fn 搜索后执行的回调函数,一般是loadData
     */
    _onSearchTable(fn) {
      this._pagination.pageNum = 1 // 分页变回1
      if (fn && (typeof fn == 'function')) {
        fn()
      } else {
        this._loadData()
      }
    },
    /**
     * 查询后重置事件
     * @param {*} fn 清除后的回调函数,一般是loadData
     * @param {*} searchForm 清除需要的可能会保留的一些搜索条件
     */
    _onResetTable(fn, searchForm) {
      this._pagination.pageNum = 1 // 分页变回1
      this._searchForm = {} // 查询条件清空
      this.$refs["table"] && this.$refs["table"].clearSort(); // 重置排序
      fn && fn()
    },
    /**
     * 表格每列排序功能
     * @param {*} item
     * @param {*} loadData  // 排序后刷新的回调函数
     */
    _onTableSortChange(item, loadData) {
      if (item.order) {
        // new Promise(resolve => {
        //   resolve(item.prop.replace(/([A-Z])/g, "_$1").toLowerCase())
        // }).then((value) => {
        this.$set(this._searchForm, "orderByName", item.prop)
        this.$set(this._searchForm, "orderByDirection", item.order === 'descending' ? 'DESC' : 'ASC')
        // })
      } else {
        delete this._searchForm.orderByName
        delete this._searchForm.orderByDirection
      }
      setTimeout(() => {  // 防止this._searchForm不立刻生效
        if (loadData) {
          loadData()
        } else {
          this._loadData()
        }
      }, 100)
    },
    _onTableSortChangeByMongodb(item, loadData) {
      if (item.order && item.prop) {
        this._searchForm.sort = item.prop + ',' + (item.order === 'descending' ? 'desc' : 'asc')
      } else {
        delete this._searchForm.sort
      }
      setTimeout(() => {  // 防止this._searchForm不立刻生效
        if (loadData) {
          loadData()
        } else {
          this._loadData()
        }
      }, 100)
    },
    /**
     *
     * @param {*} primaryId 主键
     * @param {*} params 查详情的参数
     * @returns
     */
    _loadDialogForm(primaryId, params) {
      this.$refs.form.resetFields()
      return new Promise((resolve, reject) => {
        this._formLoading = true
        if (primaryId) {
          // 有主键获取详情
          this.getRowApi('', params).then((res) => {
            this._form = res.content
            this._formLoading = false
            resolve(res)
          })
        } else {
          this._form = Vue.observable({}) // 让_form变成可响应式的
          this._formLoading = false
        }
      }).catch((err) => {
        console.log(err, 'err')
      })
    },
    /**
     *
     * @param {*} primaryId
     * @param {*} readonly
     * @param {*} data
     * @returns
     */
    _onSubmitForm(primaryId, readonly, data) {
      return this.$refs['form'].validate().then((bool) => {
        if (bool) {
          this._formLoading = true
          let form = Object.assign({}, this._form)
          if (data) {
            form = Object.assign({}, this._form, data)
          }
          return new Promise((resolve, reject) => {
            if (!primaryId) {
              // 如果没有主键,说明新增
              this.createRowApi(form)
                .then((res) => {
                  this._onCloseDialog(true)
                  resolve(res)
                })
                .catch((err) => {
                  this._formLoading = false
                  reject(err)
                })
            } else {
              //有主键,说明修改
              this.updateRowApi(form)
                .then((res) => {
                  this._onCloseDialog(true)
                  resolve(res)
                })
                .catch((err) => {
                  this._formLoading = false
                  reject(err)
                })
            }
          })
        }
      }).catch(err => {
        this._formLoading = false
        let errList = document.getElementsByClassName("el-form-item__error");
        setTimeout(() => {
          errList[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      })
    },
    /**
     * @description: 弹出框表单的验证方法
     * @param {formName: form的ref标记}
     * @return:
    */
    _hasFormValid(formName = "form") {
      //判断表单验证是否通过
      let bool = false;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          let errList = document.getElementsByClassName("el-form-item__error");
          setTimeout(() => {
            const h = this.$createElement;
            errList[0] && errList[0].scrollIntoView({ behavior: "smooth", block: "center" });
            // this.$message(errList[0].innerText);
          }, 300);
          bool = false;
        } else {
          bool = true;
        }
      });
      return bool;
    },
    /**
     * 弹框关闭事件
     * @param {*} bool  // 布尔值表示关闭后表格是否需要刷新
     */
    _onCloseDialog(bool) {
      this.$emit('_afterClose', false) // 弹框关闭
      this.$emit('close', bool) // 弹框关闭后向父组件发送事件
      this.$emit('_display', false) // 弹框关闭
      setTimeout(() => {
        this._form = {} // 弹框表单清空
      }, 500)
      this._formLoading = false
      this.$nextTick(()=>{
        this.$refs['form'] && this.$refs['form'].clearValidate() // 表单验证重置
      })
    },
    _afterClose(bool) {
      if (Object.prototype.toString.call(bool).slice(8, -1) === 'Boolean' && bool) {
        this._loadData()
      }
    },
    /**
     *
     * @param {*} title 原始标题
     * @param {*} primaryId // 主键,用于判断是否是新增还是编辑查看
     * @param {*} readonly // 是否只读,判断编辑还是查看
     * @returns
     */
    _getFormTitle(title, primaryId, readonly) {
      if (!primaryId) {
        return `新增${title}`
      } else {
        if (readonly) {
          return `查看${title}`
        } else {
          return `编辑${title}`
        }
      }
    },
    /**
     * 表单必填项验证
     * @param {*} message
     * @returns
     */
    _mustValid(message = '请输入必填项', trigger = 'blur') {
      return {
        required: true,
        message,
        trigger,
      }
    },
    /**
     * vxe-table 分页条件变化回调函数
     * @param args
     * @param fn
     * @private
     */
    _onVxePageEvent(event) {
      const eventName = event.type
      if (eventName === 'size') {
        // 分页数量发生变化
        this._pagination.pageNum = 1
        this._pagination.pageSize = event.pageSize
      } else if (eventName === 'current') {
        // 当前页发生变化
        this._pagination.pageNum = event.currentPage
      }
      this._loadData()
    },
    _goDetailPage(routePath, ...params) {
      params.forEach((item) => {
        routePath += `/${item}`
      })
      console.log(routePath)
      this.$router.push({ path: routePath })
    },
    _goBack() {
      this.$router.go(-1)
    }
  },
}

export default extend
