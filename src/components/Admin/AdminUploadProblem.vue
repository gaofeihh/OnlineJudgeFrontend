<template>
    <div id="upload-problem">
        <div class="left">
            <v-form :model="problem">
                <div id="upload-problem-head">
                    <div>
                        <v-switch
                                v-model="problem.hide"
                                label="提示"
                        />
                    </div>

                    <div>
                        <v-switch
                                v-model="problem.specialJudge"
                                label="特殊判题"
                        />
                    </div>

                    <div class="limit">
                        <v-text-field
                                v-model="problem.memoryLimit"
                                label="内存限制(KB)"
                                placeholder="内存限制"
                                outlined
                        />
                    </div>

                    <div class="limit">
                        <v-text-field
                                v-model="problem.timeLimit"
                                label="时间限制(ms)"
                                placeholder="时间限制"
                                outlined
                        />
                    </div>

                    <div class="limit">
                        <v-select v-model="problem.type"
                                  :items="type"
                                  label="type"
                                  dense
                                  outlined/>
                    </div>
                </div>

                <div id="upload-problem-context">
                    <div>
                        <!--                    <h2>题目</h2>-->
                        <v-text-field
                                v-model="problem.title"
                                label="题目"
                                dense
                                outlined
                                clearable
                        />
                    </div>
                    <div>
                        <!--                    <h2>描述</h2>-->
                        <v-textarea
                                v-model="problem.description"
                                dense
                                outlined
                                clearable
                                label="描述"
                        />
                    </div>
                    <div id="upload-problem-outin">
                        <div class="outin-style">
                            <!--                        <h2>输入</h2>-->
                            <v-textarea
                                    v-model="problem.input"
                                    dense
                                    outlined
                                    clearable
                                    label="输入"
                            />
                        </div>
                        <div class="outin-style">
                            <!--                        <h2>输出</h2>-->
                            <v-textarea
                                    v-model="problem.output"
                                    dense
                                    outlined
                                    clearable
                                    label="输出"
                            />
                        </div>

                    </div>
                    <div>
                        <!--                    <h2>样例</h2>-->
                        <v-textarea
                                v-model="problem.sample"
                                dense
                                outlined
                                clearable
                                label="样例"
                        />
                    </div>
                    <div>
                        <!--                    <h2>提示</h2>-->
                        <v-textarea
                                v-model="problem.hint"
                                dense
                                outlined
                                clearable
                                label="提示"
                        />
                    </div>
                    <div>
                        <!--                    <h2>资源</h2>-->
                        <v-text-field
                                v-model="problem.source"
                                label="出处"
                                dense
                                outlined
                                clearable
                        />
                    </div>
                </div>
                <div class="btn">
                    <v-btn color="primary" @click="upload">上传</v-btn>
                </div>
            </v-form>
        </div>

    </div>
</template>

<script>
    import {problemExample, problemExampleType} from "@/assets/config/caseConfig";

    export default {
        name: "AdminUploadProblem",
        data() {
            return {
                problem: {
                    description: "",
                    hide: false,
                    hint: "",
                    input: "",
                    memoryLimit: 512,
                    output: "",
                    sample: "",
                    source: "",
                    specialJudge: false,
                    timeLimit: 1000,
                    title: "",
                    type: "NORMAL"
                },
                type: problemExampleType
            }
        },
        methods: {
            upload() {
                // 上传
                this.$http.put(`/admin/problem`, this.problem).then(res => {
                    if (res) {
                        this.$message.success(`上传成功`)
                        //初始化界面数据
                        this.problem = problemExample

                    }
                })
            }
        },
        created() {

        }
    }
</script>

<style lang="less" scoped>
    #upload-problem {
        width: 100% !important;
        .left {
            width: 50%;
            #upload-problem-head {
                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
                border-radius: 4px;
                overflow-y: auto;
                overflow-x: hidden;
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 10px;
                margin: 20px 0;


                .limit {
                    display: flex;
                    text-align: center;
                    width: 25%;

                    /deep/ .v-input__control {
                        margin: 0 8px;
                        height: 40px;

                        .v-input__slot {
                            min-height: 40px;
                        }
                    }
                }

            }

            #upload-problem-outin {

                display: flex;
                justify-content: space-between;

                .outin-style {
                    width: 46%;
                }
            }
        }



        h2 {
            color: #409eff;
        }

    }

    .btn {
        display: flex;
        justify-content: flex-end;
    }
</style>
