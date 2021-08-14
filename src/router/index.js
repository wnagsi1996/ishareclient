import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/basis/Home.vue'),
		meta: {
			login: false,
			title: 'iSHARE',
		}
	},
	{
		path: '/mobile',
		name: 'Home',
		redirect:'/'
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/basis/Login.vue'),
		meta: {
			login: false,
			title: 'Login',
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/basis/Register.vue'),
		meta: {
			login: false,
			title: 'Register',
		}
	},
	{
		path: '/findpassword',
		name: 'FindPassword',
		component: () => import('@/views/basis/FindPassword.vue'),
		meta: {
			login: false,
			title: 'FindPassword',
		}
	},
	{
		path: '/menulist',
		name: 'MenuList',
		component: () => import('@/views/basis/MenuList.vue'),
		meta: {
			login: false,
			title: 'Menu List',
		}
	},
	{
		path: '/productlist',
		name: 'ProductList',
		component: () => import('@/views/basis/ProductList.vue'),
		meta: {
			login: false,
			title: 'Product List',
		}
	},
	{
		path: '/product',
		name: 'ProductDetail',
		component: () => import('@/views/basis/ProductDetail.vue'),
		meta: {
			login: false,
			title: 'Product Detail',
		}
	},
	{
		path: '/cart',
		name: 'Cart',
		component: () => import('@/views/basis/Cart.vue'),
		meta: {
			login: false,
			title: 'Cart',
		}
	},
	{
		path: '/payment',
		name: 'PayMent',
		component: () => import('@/views/basis/PayMent.vue'),
		meta: {
			login: true,
			title: 'PayMent',
		}
	},
	{
		path: '/paymentsuccessful',
		name: 'PayMentSuccessful',
		component: () => import('@/views/basis/PaySuccess.vue'),
		meta: {
			login: false,
			title: 'PayMent Successful',
		}
	},
	{
		path: '/groupswait',
		name: 'GroupsWait',
		component: () => import('@/views/basis/GroupsWait.vue'),
		meta: {
			login: true,
			title: 'GroupsWait',
		}
	},
	{
		path: '/groups',
		name: 'Groups',
		component: () => import('@/views/basis/Groups.vue'),
		meta: {
			login: false,
			title: 'Groups',
		}
	},
	{
		path: '/grouphelp',
		name: 'GroupHelp',
		component: () => import('@/views/basis/GroupHelp.vue'),
		meta: {
			login: false,
			title: 'Groups',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/groupsbuy',
		name: 'GroupsBuy',
		component: () => import('@/views/basis/GroupBuy.vue'),
		meta: {
			login: false,
			title: 'GroupsBuy',
		}
	},
	{
		path: '/groupswaitbuy',
		name: 'GroupsWaitBuy',
		component: () => import('@/views/basis/GroupsWaitBuy.vue'),
		meta: {
			login: true,
			title: 'GroupsWaitBuy',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/freelist',
		name: 'FreeProductList',
		component: () => import('@/views/basis/FreeProductList.vue'),
		meta: {
			login: false,
			title: 'Free Product List',
		}
	},
	{
		path: '/dealslist',
		name: 'DealsList',
		component: () => import('@/views/basis/DealsList.vue'),
		meta: {
			login: false,
			title: 'Deals List',
		}
	},
	{
		path: '/deals',
		name: 'DealsDetail',
		component: () => import('@/views/basis/DealsDetail.vue'),
		meta: {
			login: false,
			title: 'Deals Detail',
		}
	},
	{
		path: '/contactus',
		name: 'ContactUs',
		component: () => import('@/views/basis/ContactUs.vue'),
		meta: {
			login: false,
			title: 'ContactUs',
		}
	},
	{
		path: '/shop',
		name: 'Shop',
		component: () => import('@/views/basis/Shop.vue'),
		meta: {
			login: false,
			title: 'Shop',
		}
	},
	{
		path: '/shopdetail',
		name: 'ShopDetail',
		component: () => import('@/views/basis/ShopDetail.vue'),
		meta: {
			login: false,
			title: 'Shop Detail',
		}
	},
	{
		path: '/usercenter',
		name: 'UserCenter',
		component: () => import('@/views/user/UserCenter.vue'),
		meta: {
			login: true,
			title: 'UserCenter',
		}
	},
	{
		path: '/mymembers',
		name: 'MyMembers',
		component: () => import('@/views/user/MyMember.vue'),
		meta: {
			login: true,
			title: 'My Memters',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/mymembers2',
		name: 'MyMembers2',
		component: () => import('@/views/user/MyMember2.vue'),
		meta: {
			login: true,
			title: 'My Members2',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/myincome',
		name: 'MyIncome',
		component: () => import('@/views/user/MyIncome.vue'),
		meta: {
			login: true,
			title: 'My Income',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/mygifts',
		name: 'MyGifts',
		component: () => import('@/views/user/MyGifts.vue'),
		meta: {
			login: true,
			title: 'My Gifts',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/mylike',
		name: 'MyLike',
		component: () => import('@/views/user/MyLike.vue'),
		meta: {
			login: true,
			title: 'My Like',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/mycoupon',
		name: 'MyCoupon',
		component: () => import('@/views/user/MyCoupon.vue'),
		meta: {
			login: true,
			title: 'My Coupon',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/address',
		name: 'Address',
		component: () => import('@/views/user/Address.vue'),
		meta: {
			login: true,
			title: 'Address',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/addaddress',
		name: 'AddAddress',
		component: () => import('@/views/user/AddAddress.vue'),
		meta: {
			login: true,
			title: 'Add Address',
		}
	},
	{
		path: '/myprofile',
		name: 'MyProfile',
		component: () => import('@/views/user/MyProfile.vue'),
		meta: {
			login: true,
			title: 'My Profile',
		}
	},
	{
		path: '/myorder',
		name: 'MyOrder',
		component: () => import('@/views/user/MyOrder.vue'),
		meta: {
			login: true,
			title: 'My Order',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/profilemodify',
		name: 'MyProfileModify',
		component: () => import('@/views/user/MyProfileModify.vue'),
		meta: {
			login: true,
			title: 'My Profile Modify',
		}
	},
	{
		path: '/setting',
		name: 'Setting',
		component: () => import('@/views/user/Setting.vue'),
		meta: {
			login: true,
			title: 'Setting',
			bjColor: '#f7f7f7'
		}
	},
	{
		path: '/modifyemail',
		name: 'ModifyEmail',
		component: () => import('@/views/user/ModifyEmail.vue'),
		meta: {
			login: true,
			title: 'Modify Email',
		}
	},
	{
		path: '/modifypass',
		name: 'ModifyPass',
		component: () => import('@/views/user/ModifyPass.vue'),
		meta: {
			login: true,
			title: 'Modify Password',
		}
	},
	{
		path: '/setreceiptaccount',
		name: 'SetReceiptAccount',
		component: () => import('@/views/user/SetReceiptAccount.vue'),
		meta: {
			login: true,
			title: 'Set Receipt Account'
		}
	},
	{
		path: '/uploadphoto',
		name: 'UploadPhoto',
		component: () => import('@/views/user/UploadPhoto.vue'),
		meta: {
			login: true,
			title: 'Upload Photo',
		}
	},
	{
		path: '/noticelist',
		name: 'NoticeList',
		component: () => import('@/views/user/NoticeList.vue'),
		meta: {
			login: true,
			title: 'Notice List',
			bjColor: '#f7f7f7'
		}
	},

	{
		path: '/faq',
		name: 'FAQ',
		component: () => import('@/views/basis/FAQ.vue'),
		meta: {
			login: false,
			title: 'FAQ',
		}
	},
	{
		path: '/aboutus',
		name: 'AboutUs',
		component: () => import('@/views/basis/AboutUs.vue'),
		meta: {
			login: false,
			title: 'AboutUs',
		}
	},
	{
		path: '/returnpolicy',
		name: 'ReturnPolicy',
		component: () => import('@/views/basis/ReturnPolicy.vue'),
		meta: {
			login: false,
			title: 'Return Policy',
		}
	},
	{
		path: '/privacysecuritypolicy',
		name: 'PrivacySecurityPolicy',
		component: () => import('@/views/basis/PrivacySecurityPolicy.vue'),
		meta: {
			login: false,
			title: 'Privacy Security Policy',
		}
	},
	{
		path: '/termsofuse',
		name: 'TermsOfUse',
		component: () => import('@/views/basis/TermsOfUse.vue'),
		meta: {
			login: false,
			title: 'Terms Of Use',
		}
	},
	{
		path: '/help',
		name: 'Help',
		component: () => import('@/views/basis/Help.vue'),
		meta: {
			login: false,
			title: 'Help',
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/basis/404.vue'),
		meta: {
			login: false,
			title: '404',
		}
	},
	{
		path: '/freerule',
		name: 'FreeRule',
		component: () => import('@/views/basis/FreeRule.vue'),
		meta: {
			login: false,
			title: 'Free Rule',
			bjColor:"#f69d12"
		}
	}
]


const router = new VueRouter({
	mode: 'history',
	// base: "",
	base: process.env.NODE_ENV === "production" ? "mobile" : "/",
	routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router
