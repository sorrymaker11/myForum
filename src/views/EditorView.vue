<template>

<transition enter-active-class="animate__animated animate__fadeIn"
        appear
        mode="out-in">
<el-card class="blog-write">
    <!-- <div id="blog-editor-textarea" class="blog-write--wrap"></div> -->
    <div style="border: 1px solid #ccc;">
        <el-input
            ref="title"
            class="blog-write--title"
            type="text"
            placeholder="请输入文章的标题..."
            v-model="title"
            maxlength="30"
            show-word-limit/>
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="content"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>

    <div class="blog-write--type">
        <div class="blog-write--type_header">分类选择</div>
        <div class="blog-write--column">
            <el-radio-group v-model="column">
                <el-radio-button v-for="(item) in columns"  
                                 :key="item.id" 
                                 :label="item.id">{{item.name}}</el-radio-button>
            </el-radio-group>
        </div>
    </div>

    <div class="blog-editor-button">
        <el-button type="primary" @click="submitEditor">提交</el-button>
        <el-button type="info" @click="cancelEditor">重置</el-button>
    </div>
</el-card>
</transition>
</template>

<script>
import { Editor, Toolbar  } from '@wangeditor/editor-for-vue'
// const { Editor, Toolbar  }=WangEditorForVue
        // console.log(WangEditorForVue);
        console.log(Editor, Toolbar);
import EDITOR_CONFIG from '@/config/editor.config';
export default {
    name: 'EditorView',
    components: { Editor, Toolbar },
    props:{
        columnId:{
            type:String
        }
    },
    data() {
        return {
            title:'',
            content:'',
            editor: null,
            placeholder: '请输入内容...',
            "MENU_CONF":{"uploadImage":EDITOR_CONFIG},
            mode: 'default',
            columns:[],
            column:''
        };
    },
    created(){
        this.getColumns()
    },
    mounted() {
    },

    methods: {
        async getColumns(){
            try {
                let columns=await this.$api({type:'columns'})
                this.columns=columns.list.map(item=>{
                    return {id:item._id,name:item.name}
                })
                        
                if(this.columnId){
                    this.column=this.columnId
                    return
                }
                this.column=this.columns[0].id
            } catch (err) {
                this.$notify.error({
                    title:'错误',
                    message:err.msg
                })
            }
        },
        submitEditor(){
            if(!this.validateEditor()){
                return
            }
            this.postEditorData()
        },
        cancelEditor(){
            this.content=''
            // this.editor.focus()
        },
        validateEditor(){
            if(this.title.trim().length===0){
                this.$notify.warning({
                    title:'警告',
                    message:'标题不能为空'
                })
                this.$refs.title.focus()
                return false
            }
            if(this.content.trim().length===0){
                this.$notify.warning({
                    title:'警告',
                    message:'内容不能为空'
                })
                return false
            }
            return true
        },
        async postEditorData(){
            // 6411e01b257c6653983470e3
            try {
                await this.$api({type:'postArticle',data:{
                    title:this.title,
                    content:this.content,
                    column:this.column,
                    cover:this.content.match(/src="([^"'"]*)"/)?.[1]
                }})
                this.$notify.success({
                    title:'成功',
                    message:'提交成功'
                })
                this.$router.push('/index')
            } catch (err) {
                this.$notify.error({
                    title:'错误',
                    message:'提交失败'
                })
            }
        },
        onCreated(editor) {
            console.log(this.editor)
            this.editor = Object.seal(editor) 
            console.log(this.editor)
        },
    },
    beforeDestroy(){
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
};

</script>

<style lang="stylus">
@import '~assets/css/base.styl';
.blog-write
    padding padding-space
    .w-e-text 
        ul>li
            list-style-type: disc;
        ol>li
            list-style-type: decimal;
        
.blog-write--title
    padding: 10px 0
    margin-bottom:10px 
    width:100%
    height: 50px
    font-size: 18px
    outline: none
    border: none
    border-bottom: 1px solid #ccc
    color: #000000
    // text-indent: 1em
    .el-input__inner
        height: 38px
        border none
        font-weight: 700
        &::placeholder
            color: #86909C

.blog-write--type
    margin:padding-space 0
    border: 1px solid #92c8ec

.blog-write--type_header
    padding-left:padding-space*3
    // width 100%
    line-height 40px
    background-color: #92c8ec
    color  #fff

.blog-write--column
    display: flex
    flex-wrap:wrap
    width: 100%
    padding: padding-space padding-space*2
    align-items: center
    li
        margin:0 0 padding-space padding-space
        padding 4px padding-space*2
        border: 1px solid #92c8ec
        color: #92c8ec
        border-radius: radius-theme-size*2
        cursor pointer
        &.selected
            background-color: #92c8ec
            color  #fff
.blog-editor-button
    padding-top: 20px
    display: flex
    justify-content: space-around
    button
        flex: 1
</style>