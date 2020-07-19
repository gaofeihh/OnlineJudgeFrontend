<template>
    <div id="text-editor">
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
        name: "TextEditor",
        data() {
            return {
                editorContent: "",
                // 自定义菜单配置
                menus: [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复
                ]
            };
        },
        props: {
            initContent: String
        },
        methods: {
            getContent() {
                return this.editorContent;
            }
        },
        mounted() {
            const editor = new E(this.$refs.editor);
            editor.customConfig.menus = this.menus;
            editor.customConfig.onchange = html => {
                this.editorContent = html;
            };
            editor.create();
            this.editorContent = this.initContent;
            editor.txt.html(this.initContent);
        }
    };
</script>

<style lang="less" scoped>

</style>
