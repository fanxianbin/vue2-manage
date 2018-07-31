<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <a @click="changeToTag(item.path)" class="tags-li-title">
                    {{item.title}}
                </a>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-add-box">
            <el-button size="mini" type="primary" @click="addTag">
                <i class="el-icon-plus el-icon--right"></i>
                <span>添加标签</span>
            </el-button>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    import store from '@/store/store';
    let addTagValidator =(value) =>{
        if(!value){
            return "内容不能为空";
        }
        if(value.startsWith("http") && !value.startsWith(location.origin)){
            return "跳转地址不能跨域";
        }
    }

    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            addTag(){
                this.$prompt("请输入您想显示的页面地址",{
                    inputValidator: addTagValidator
                }).then(({value})=>{
                    let path;
                    let href = location.href;
                    if(value.startsWith("/")){
                        path = location.origin+value;
                    }else if(href == location.origin){
                        path=href+'/'+value
                    }else if(href.endsWith("/")){
                        path=href+value;
                    }else{
                        path = href.substring(0,href.lastIndexOf("/")+1)+value
                    }
                    console.log(this);
                    this.$router.push({fullPath: "/table"});
                }).catch(()=>{
                    
                });
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            changeToTag(toPath){
                let currPath = this.$route.fullPath;
                if(currPath === toPath){
                    return;
                }
                for(let tag of this.tagsList){
                    if(currPath == tag.path){
                        tag.position = document.querySelector("#content-box .content").scrollTop;
                    }
                    if(toPath == tag.path){
                        store.commit("setPagePosition",tag.position);
                    }
                }
                this.$router.push(toPath);
            },
            // 设置标签
            setTags(route){
                let tag = this.tagsList.some(item => {
                    if(item.path === route.fullPath){
                        return item;
                    }
                });
                if(!tag){
                    // if(this.tagsList.length >= 8){
                    //     this.tagsList.shift();
                    // }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name,
                        position:0
                    });
                }
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
        }
    }

</script>


<style>
    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-add-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
