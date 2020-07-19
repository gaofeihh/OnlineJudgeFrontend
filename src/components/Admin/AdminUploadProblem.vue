<template>
    <div id="upload-problem">
        <div class="left">
            <v-form :model="problem" ref="uploadProblemRef" :rules="rule">
                <div id="upload-problem-head">
                    <div>
                        <v-switch
                                v-model="problem.hide"
                                label="隐藏"
                        />
                    </div>

                    <div>
                        <v-switch
                                v-model="problem.specialJudge"
                                label="SPJ"
                        />
                    </div>

                    <div class="limit">
                        <v-text-field
                                v-model="problem.memoryLimit"
                                :rules="rule.memoryRule"
                                label="内存限制(KB)"
                                placeholder="内存限制"
                                outlined
                        />
                    </div>

                    <div class="limit">
                        <v-text-field
                                v-model="problem.timeLimit"
                                :rules="rule.timeRule"
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
                                :rules="rule.titleRule"
                                label="标题"
                                dense
                                outlined
                                clearable
                        />
                    </div>
                    <div>
                        <h2>描述:</h2>
                        <text-editor :init-content="problem.description" ref="descriptionRef"/>
                        <!--                        <v-textarea-->
                        <!--                                v-model="problem.description"-->
                        <!--                                :rules="rule.descriptionRule"-->
                        <!--                                dense-->
                        <!--                                outlined-->
                        <!--                                clearable-->
                        <!--                                label="描述"-->
                        <!--                        />-->
                    </div>

                    <div>
                        <h2>输入描述:</h2>
                        <text-editor :init-content="problem.input" ref="inputRef"/>
                        <!--                            <v-textarea-->
                        <!--                                    v-model="problem.input"-->
                        <!--                                    :rules="rule.inputRule"-->
                        <!--                                    dense-->
                        <!--                                    outlined-->
                        <!--                                    clearable-->
                        <!--                                    label="输入"-->
                        <!--                            />-->
                    </div>
                    <div>
                        <h2>输出描述:</h2>
                        <text-editor :init-content="problem.output" ref="outputRef"/>
                        <!--                        <v-textarea-->
                        <!--                                v-model="problem.output"-->
                        <!--                                :rules="rule.outputRule"-->
                        <!--                                dense-->
                        <!--                                outlined-->
                        <!--                                clearable-->
                        <!--                                label="输出"-->
                        <!--                        />-->
                    </div>

                    <div id="upload-problem-outin" v-for="(item, index) in problem.sample" :key="index">
                        <div class="outin-style">
                            <v-textarea
                                    v-model="item.inputSample"
                                    :rules="rule.sampleRule"
                                    dense
                                    outlined
                                    clearable
                                    :label="'输入样例'+(index+1)"
                            />
                        </div>
                        <div class="outin-style">
                            <v-textarea
                                    v-model="item.outputSample"
                                    :rules="rule.sampleRule"
                                    dense
                                    outlined
                                    clearable
                                    :label="'输出样例'+(index+1)"
                            />
                        </div>
                    </div>
                    <div class="sample-icons">
                        <div class="sample-icon" @click="subSample">
                            <v-icon>fa-minus</v-icon>
                        </div>
                        <div class="sample-icon" @click="addSample">
                            <v-icon>fa-plus</v-icon>
                        </div>
                    </div>
                    <div>
                        <h2>提示:</h2>
                        <text-editor :init-content="problem.hint" ref="hintRef"/>
                        <!--                        <v-textarea-->
                        <!--                                v-model="problem.hint"-->
                        <!--                                :rules="rule.hintRule"-->
                        <!--                                dense-->
                        <!--                                outlined-->
                        <!--                                clearable-->
                        <!--                                label="提示"-->
                        <!--                        />-->
                    </div>
                    <div style="margin-top: 20px">
                        <!--                    <h2>资源</h2> :rules="rule.sourceRule"-->
                        <v-text-field
                                v-model="problem.source"
                                label="问题来源"
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
    // import {problemExample, problemExampleType} from "@/assets/config/caseConfig";
    import {rules} from "@/assets/config/rules";
    import TextEditor from "@/components/TextEditor";

    export default {
        name: "AdminUploadProblem",
        components: {
            TextEditor
        },
        data() {
            return {
                problem: {
                    description: "",
                    hide: false,
                    hint: "",
                    input: "",
                    memoryLimit: 512,
                    output: "",
                    sample: [{
                        inputSample: '',
                        outputSample: ''
                    }],
                    source: "",
                    specialJudge: false,
                    timeLimit: 1000,
                    title: "",
                    type: "NORMAL"
                },
                type: ['NORMAL', 'SUPPLEMENT_AFTER_SUBMIT_CODE', 'SUPPLEMENT_BEFORE_JUDGE'],
                rule: rules.uploadProblemRules
            }
        },
        methods: {
            upload() {
                console.log('update')
                // 验证
                const isSpace = this.$refs.uploadProblemRef.validate()
                if (!isSpace) {
                    return
                }
                // 富文本取值
                this.problem.description = this.$refs.descriptionRef.getContent()
                this.problem.input = this.$refs.inputRef.getContent()
                this.problem.output = this.$refs.outputRef.getContent()
                // this.problem.sample = this.$refs.sampleRef.getContent()
                this.problem.hint = this.$refs.hintRef.getContent()
                if (!(this.problem.description && this.problem.sample)) {
                    alert('输入信息不全，描述和样例不能为空,请检查')
                    return;
                }
                // 过滤problem对象
                const newObj = this.filterParams();

                // sample转换字符串
                newObj.sample = JSON.stringify(newObj.sample)
                console.log(newObj.sample)

                // 上传
                this.$http.put(`/admin/problem`, newObj).then(res => {
                    if (res) {
                        this.$message.success(`上传成功`)
                        //初始化界面数据
                        this.$router.go(0)
                    }
                })
            },
            addSample() {
                this.problem.sample.push({
                    inputSample: '',
                    outputSample: ''
                })
            },
            subSample() {
                if(this.problem.sample.length < 2) {
                    alert('至少保留一组')
                    return
                }
                this.problem.sample.pop()
            },
            filterParams() {
                let newProblem = {};
                for(let i in this.problem) {
                    if(this.problem[i]) {
                        newProblem[i] = this.problem[i]
                    }
                }
                return newProblem;
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
            min-width: 730px;

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
                position: relative;


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
                margin-top: 20px;
                justify-content: space-between;

                .outin-style {
                    width: 46%;
                }
            }
            .sample-icons {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                .sample-icon {
                    display: inline-block;
                    margin: 0 20px;
                    border: solid 3px #757575;
                    border-radius: 50%;
                    padding: 3px 5px;
                }
            }
        }


        /*h2 {*/
        /*    color: #409eff;*/
        /*}*/

    }

    .btn {
        display: flex;
        justify-content: flex-end;
    }
</style>
