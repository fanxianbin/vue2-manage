<template>
    <div class="wrapper">
        <el-container style="height:100%">
            <el-header style="height:50px;">
                <v-head></v-head>
            </el-header>
            <el-container style="position:relative;left:0;top:0">
                <el-aside class="sidebar">
                    <v-sidebar></v-sidebar>
                </el-aside>
                <el-main id="content-box" class="content-box" style="padding:0;" :class="{'content-collapse':collapse}">
                        <!-- 如果当前页面是导航页则显示导航标签，如果是详情页则显示为面包屑 -->
                        <v-tags class="fixed-tags"></v-tags>
                        <!-- <div style="height:25px;width:100%;"></div> -->
                        <div class="content">
                            <!-- <transition mode="out-in">
                                <keep-alive :include="tagsList">
                                    <router-view></router-view>
                                </keep-alive>
                            </transition> -->
                             <keep-alive :include="tagsList">
                                <router-view></router-view>
                            </keep-alive>
                        </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import store from '@/store/store'
    export default {
        data(){
            return {
                tagsList: [],
            }
        },
        computed:{
            collapse(){
                return store.state.mainMenuItemCollapse;
            }
        },
        methods:{
            afterenter(){
                // debugger;
                // if(this.mode == 'out-in'){
                //     //window.scrollTo(0,this.scrollTop);
                // }
                // console.log("afterenter"+position);
                // debugger;
                // let position = store.state.pagePosition;
                // document.querySelector("#content-box .content").scrollTo(0,position);
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>

<style  scoped>
    .el-header{
        padding:0;
    }
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }

    #content-box .fixed-tags{
        width:100%;
        height: 30px;
        /* overflow: hidden; */
        background: #fff;
         /* padding-right: 220px; */
         /* z-index: 10; */
        box-shadow: 0 5px 10px #ddd;
    }
</style>
