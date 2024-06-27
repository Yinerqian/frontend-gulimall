import Layout from "@/layout/index";

// 系统管理
export default {
	path: '/product-manager',
	component: Layout,

	children: [
		{
			path: 'category-manager',
			name: 'category-manager',
			component: resolve => { return require(["@/views/gulimall-product/product-manager/CategoryManager"], resolve) },
			meta: { title: '分类管理', icon: 'category-manager' }
		},
	]
}
