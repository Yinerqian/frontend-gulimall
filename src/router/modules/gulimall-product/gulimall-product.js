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
		{
			path: 'brand-manager',
			name: 'brand-manager',
			component: resolve => { return require(["@/views/gulimall-product/brand-manager/BrandManager"], resolve) },
			meta: { title: '品牌管理', icon: 'brand-manager' }
		},
	]
}
