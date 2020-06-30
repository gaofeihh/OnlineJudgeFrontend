<template>
    <div id="upload-problem">
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
                            label="判断"
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
                    <h2>题目</h2>
                    <v-text-field
                            v-model="problem.title"
                            label="题目"
                            solo
                            clearable
                    />
                </div>
                <div>
                    <h2>描述</h2>
                    <v-textarea
                            v-model="problem.description"
                            solo
                            clearable
                            label="描述"
                    />
                </div>
                <div id="upload-problem-outin">
                    <div class="outin-style">
                        <h2>输入</h2>
                        <v-textarea
                                v-model="problem.input"
                                solo
                                clearable
                                label="输入"
                        />
                    </div>
                    <div class="outin-style">
                        <h2>输出</h2>
                        <v-textarea
                                v-model="problem.output"
                                solo
                                clearable
                                label="输出"
                        />
                    </div>

                </div>
                <div>
                    <h2>样例</h2>
                    <v-textarea
                            v-model="problem.sample"
                            solo
                            clearable
                            label="样例"
                    />
                </div>
                <div>
                    <h2>提示</h2>
                    <v-textarea
                            v-model="problem.hint"
                            solo
                            clearable
                            label="提示"
                    />
                </div>
                <div>
                    <h2>资源</h2>
                    <v-text-field
                            v-model="problem.source"
                            label="资源"
                            solo
                            clearable
                    />
                </div>
            </div>
            <div class="btn">
                <v-btn color="primary" @click="upload">上传</v-btn>
            </div>
        </v-form>

    </div>
</template>

<script>
    import {problemExample, problemExampleType} from "@/assets/config/caseConfig";

    export default {
        name: "AdminUploadProblem",
        data() {
            return {
                problem: problemExample,
                type: problemExampleType
            }
        },
        methods: {
            upload() {
                // 上传
                const submit = async() => {
                    const res = await this.$http.put(`/admin/problem`, this.problem) // 添加接口地址
                    // 已经设置响应拦截，错误不会生效
                    if (res) {
                        this.$message.success(`上传成功`)
                        //初始化界面数据
                        this.problem.description = "",
                        this.problem.hide  = false,
                        this.problem.hint = "",
                        this.problem.input = "",
                        this.problem.memoryLimit= 512,
                        this.problem.output = "",
                        this.problem.sample = "",
                        this.problem.source = "",
                        this.problem.specialJudge = false,
                        this.problem.timeLimit=1000,
                        this.problem.title= "",
                        this.problem.type="NORMAL"

                    }
                }
                submit()

            }
        },
        created() {

        }
    }
</script>

<style lang="less" scoped>
    #upload-problem {
        width: 50% !important;
        overflow-y: auto;
        overflow-x: hidden;

        #upload-problem-head {
            box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 20px 0;


            .limit {
                display: flex;
                text-align: center;
                width: 30%;

                /deep/ .v-input__control {
                    margin: 0 8px;
                    height: 40px;

                    .v-input__slot {
                        min-height: 40px;
                    }
                }
            }

        }

    }

    #upload-problem {
        #upload-problem-outin {

            display: flex;
            justify-content: space-between;

            .outin-style {
                width: 46%;
            }
        }

        h2 {
            color: #409eff;
        }
    }

    .btn{
        display: flex;
        justify-content: flex-end;
    }
</style>
