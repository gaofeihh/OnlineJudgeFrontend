<template>
    <div id="detail">
        <div class="problem">
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
    </div>
</template>

<script>
    export default {
        name: "ProblemDetail",
        props: {
            id: String
        },
        data() {
            return {
                problem: {
                    title: '',
                    description: '',
                    input: '',
                    output: '',
                    hint: '',
                    sample: ''
                },
            }
        },
        methods: {
            getProblemInfo() {
                this.$http.get(`/problem/${this.id}`)
                    .then(value => {
                        // console.log(value.data)
                        this.problem = value.data
                    })
            }
        },
        watch: {
            id: function() {
                this.getProblemInfo()
            }
        },
        created() {
            // 修改标题
            // window.document.title = this.problem.title
            this.getProblemInfo()
        }
    }
</script>

<style lang="less" scoped>
#detail {
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    h2 {
        color: #409eff;
    }
    .problem {
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
    @media screen and (max-width: 780px) {
        width: 90%;
    }
}
</style>
