<template>
    <div class="con">
        <div class="head">
            <div class="select">
                <v-select v-model="language"
                          :items="languagesList"
                          label="Language"
                          dense
                          outlined/>
            </div>
            <div class="space"></div>
            <div class="submit">
                <v-btn color="primary" @click="submitHandle">提交</v-btn>
            </div>
        </div>
        <div ref="code" id="monaco"></div>
    </div>
</template>

<script>
    import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
    import "monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution";
    import "monaco-editor/esm/vs/basic-languages/java/java.contribution";
    import "monaco-editor/esm/vs/basic-languages/pascal/pascal.contribution";
    import "monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution";
    import "monaco-editor/esm/vs/basic-languages/python/python.contribution";
    import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
    import {languageList} from "@/assets/config/caseConfig";

    export default {
        name: 'ProblemCode',
        data() {
            return {
                editor: null,
                language: languageList[0],
                languagesList: languageList,
                width: "100%",
                height: "100%"
            };
        },
        props: {
          userId: Number,
          questionId: Number
        },
        methods: {
          submitHandle() {
            alert(`code:`+this.editor.getValue()+`,
            userId——`+this.userId+`,
            problemId——`+this.questionId+`,
            language——`+this.language)
            // 提交请求
          }
        },
        watch: {
            language() {
                // console.log(this.editor.getValue());
                // if (confirm("有代码未保存，确定切换？")) {
                //   console.log("true");
                // } else console.log("false");

                let code = this.editor.getValue(); // 保留代码

                this.editor.dispose(); // 销毁原来的编辑器
                const that = this;
                this.editor = monaco.editor.create(this.$refs.code, {
                    value: code,
                    language: that.language,
                    theme: "vs",
                    showFoldingControls: "always",
                    showUnused: true
                });
            }
        },
        mounted() {
            document.getElementById("monaco").style.height = this.height;
            document.getElementById("monaco").style.width = this.width;
            this.editor = monaco.editor.create(this.$refs.code, {
                value: `printf(%s, "Hello, World!")`,
                language: "c",
                theme: "vs",
                showFoldingControls: "always",
                showUnused: true
            });
        }
    };
</script>

<style scoped lang="less">
    .con {
        height: calc(100vh - 180px);

        .head {
            display: flex;

            .select {
                width: 100px;
                flex: 2;
            }

            .space {
                flex: 5;
            }

            .submit {
                /*float: right;*/
                /*margin: 0 auto;*/
                flex: 1;
            }
        }
    }
</style>
