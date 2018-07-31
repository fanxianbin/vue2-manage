import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let home = resolve => require(['../components/common/Home.vue'], resolve);
let dashboard =  resolve => require(['../components/page/Dashboard.vue'], resolve);
let table = resolve => require(['../components/page/BaseTable.vue'], resolve);
let tabs = resolve => require(['../components/page/Tabs.vue'], resolve);
let form = resolve => require(['../components/page/BaseForm.vue'], resolve);
let editor = resolve => require(['../components/page/VueEditor.vue'], resolve);
let markdown = resolve => require(['../components/page/Markdown.vue'], resolve);
// Vue.use(VueRouter);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: home,
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: dashboard,
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: table,
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: tabs,
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: form,
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: editor,
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: markdown,
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
