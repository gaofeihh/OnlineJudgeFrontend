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

        <v-dialog v-model="submitDialog" persistent max-width="30%">

            <v-card>
                <v-card-title class="headline">代码提交</v-card-title>
                <v-card-text>正在提交代码</v-card-text>

                <v-card-text>
                    <v-progress-circular
                            v-show="loading"
                            indeterminate
                            color="#409eff"
                    />
                    {{state}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="submitDialog = false" :disabled="over">完成</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
    import {statusDic, runResult} from "@/assets/config/dictionary";

    export default {
        name: 'ProblemCode',
        data() {
            return {
                editor: null,
                language: languageList[0],
                languagesList: languageList,
                width: "100%",
                height: "100%",
                token: '',
                submitDialog: false,
                state: '',
                loading: true,
                over: true,
                getResult: function () {

                }
            };
        },
        props: {
            userId: Number,
            questionId: Number,
            contestId: Number
        },
        methods: {
            submitHandle() {
                this.initSubmit()
                // 提交请求
                const that = this
                that.submitDialog = true
                const codeBody = {
                    code: that.editor.getValue(),
                    contestId: that.contestId ? this.contestId : '',
                    problemId: that.questionId,
                    type: that.language,
                    md5: that.$md5(that.editor.getValue())
                }
                that.$http.put(`/solution/submit`, codeBody)
                    .then(res => {
                        // console.log(res.data.token)
                        return res.data.token
                    }).then(token => {
                    // console.log(token)
                    that.getResult = setInterval(function () {
                        that.$http.get(`/solution/status?token=${token}`)
                            .then(state => {
                                if (state) {
                                    that.state = statusDic[state.data]
                                    if (runResult[state.data] >= 0) {
                                        clearInterval(that.getResult)
                                        that.loading = false
                                        that.over = false
                                    }
                                }
                            })
                        // console.log(runResult[that.state])

                    }, 700)

                }).catch(err => {
                    console.log(err)
                    clearInterval(that.getResult)
                    that.state = 'ERROR'
                    that.loading = false
                    that.over = false
                })
            },
            initSubmit() {
                this.loading = true
                this.over = true
                this.state = ''
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
        },
        created() {
            document.getElementById("loading-cartoon").style.display = 'none';
        },
        destroyed() {
            document.getElementById("loading-cartoon").style.display = 'block';
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
