<template>
    <div id="detail">
        <div class="problem">
            <div class="limit-info">
                <div>
                    时间限制:<span>{{problem.timeLimit}}</span>
                </div>
                <div>
                    内存限制:<span>{{problem.memoryLimit}}</span>
                </div>
                <div>
                    提交次数:<span>{{problem.submitCount}}</span>
                </div>
                <div>
                    通过次数:<span>{{problem.acCount}}</span>
                </div>
                <div>
                    我的状态:<span>{{problem.isAccepted === true ? '通过' : '未通过'}}</span>
                </div>
            </div>
            <div class="description">
                <h2>题目描述</h2>
                {{problem.description}}
            </div>

            <div class="tips">
                <div class="input">
                    <h2>输入描述</h2>
                    {{problem.input}}
                </div>

                <div class="output">
                    <h2>输出描述</h2>
                    {{problem.output}}
                </div>

                <div class="hint">
                    <h2>提示</h2>
                    {{problem.hint}}
                </div>
            </div>

            <div class="sample">
                <h2>样例</h2>
                {{problem.sample}}
            </div>
        </div>
        <div class="editor">
            <Code :user-id="parseInt(this.$store.getters.getUserId)"
                  :question-id="parseInt(this.problem.problemId)"/>
        </div>
    </div>
</template>

<script>
    import Code from "@/components/Code";
    export default {
        name: "ProblemDetail",
        props: {
            id: String
        },
        components: {
            Code
        },
        data() {
            return {
                problem: {
                    problemId: '',
                    title: '',
                    description: '',
                    input: '',
                    output: '',
                    hint: '',
                    sample: '',
                    timeLimit: '',
                    memoryLimit: '',
                    submitCount: '',
                    acCount: '',
                    isAccepted: ''
                },
            }
        },
        methods: {
            getProblemInfo() {
                this.$http.get(`/problem/${this.id}`)
                    .then(value => {
                        this.problem = value.data
                        // console.log(value.data)
                        window.document.title = this.problem.title
                    })
            }
        },
        watch: {
            id() {
                this.getProblemInfo()
            }
        },
        created() {
            // 修改标题
            this.getProblemInfo()
        }
    }
</script>

<style lang="less" scoped>
#detail {
    margin-top: 100px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    h2 {
        color: #409eff;
    }
    .problem {
        width: 50%;
        height: calc(100vh - 100px);
        padding: 10px;
        border-right: solid 2px #777;
        overflow-y: auto;
        overflow-x: hidden;
        .limit-info {
            display: flex;
            margin-bottom: 30px;
            padding: 20px;
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;
            border-radius: 8px;
            div {
                flex: 1;
                span {
                    color: #777777;
                }
            }
        }
        .description {
            margin-bottom: 30px;
            padding: 20px;
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;
            border-radius: 8px;
        }
        .tips {
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;
            border-radius: 8px;
            margin-bottom: 30px;
            div {
                margin-bottom: 20px;
                padding: 20px;
            }
        }
        .sample {
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;
            border-radius: 8px;
            margin-bottom: 30px;
            padding: 20px;
        }

    }
    .editor {
        width: 50%;
        height: calc(100vh - 100px);
        padding: 10px;
        /*overflow: scroll;*/
        /*overflow-x: hidden;*/
    }
    @media screen and (max-width: 780px) {

    }
}
</style>
