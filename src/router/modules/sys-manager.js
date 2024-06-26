import Layout from "@/layout/index";

// 系统管理
export default {
    path: '/sys-manager',
    component: Layout,

    children: [
        {
            path: 'user-manager',
            name: 'user-manager',
            component: resolve => { return require(["@/views/sys-manager/user-manager/UserManager"], resolve) },
            meta: { title: '用户管理', icon: 'user-manager' }
        },
        {
            path: 'role-manager',
            name: 'role-manager',
            component: resolve => { return require(["@/views/sys-manager/role-manager/RoleManager"], resolve) },
            meta: { title: '角色管理', icon: 'role-manager' }
        },
        {
            path: 'auth-manager',
            name: 'auth-manager',
            component: resolve => { return require(["@/views/sys-manager/auth-manager/AuthManager"], resolve) },
            meta: { title: '权限管理', icon: 'auth-manager' }
        },
        {
            path: 'param-manager',
            name: 'param-manager',
            component: resolve => { return require(["@/views/sys-manager/param-manager/ParamManager"], resolve) },
            meta: { title: '参数管理', icon: 'param-manager' }
        },
        // {
        //     path: 'op-log',
        //     name: 'op-log',
        //     component: resolve => { return require(["@/views/sys-manager/op-log/OpLog"], resolve) },
        //     meta: { title: '操作日志', icon: 'op-log' }
        // },
        //个人中心
        {
            path: 'profile-manager',
            name: 'profile-manager',
            component: resolve => { return require(["@/views/sys-manager/user-manager/Profile"], resolve) },
            meta: { title: '个人中心', icon: 'profile-manager' }
        },
    ]
}
