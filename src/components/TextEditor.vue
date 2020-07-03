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
                editorContent: ""
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
