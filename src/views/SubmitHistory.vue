<template>
    <div id="submit-history">
        <div class="filtrate">
            <div class="filtrate-item filtrate-per">
                <v-select v-model="lang"
                          :items="langList"
                          label="language"
                          outlined
                          dense/>
            </div>

            <div class="filtrate-item filtrate-text">
                <v-text-field label="User"
                              v-model="userId"
                              outlined
                              dense/>
            </div>

            <div class="filtrate-item filtrate-text">
                <v-text-field label="problemId"
                              v-model="problemId"
                              outlined
                              dense/>
            </div>
            <div class="filtrate-item">
                <v-select v-model="resultStatus"
                          :items="resultStatusList"
                          label="结果"
                          outlined
                          dense/>
            </div>
            <!--            <div class="filtrate-item filtrate-text">-->
            <!--                <v-text-field label="相似问题"-->
            <!--                              v-model="similar"-->
            <!--                              outlined-->
            <!--                              dense/>-->
            <!--            </div>-->
            <div class="filtrate-item filtrate-per" v-if="role === 'ADMIN'">
                <v-select v-model="similarPercent"
                          :items="similarPercentList"
                          label="相似度"
                          outlined
                          dense/>
            </div>
            <div class="filtrate-btn">
                <v-btn color="primary" @click="submit">查询</v-btn>
            </div>
            <div class="switch filtrate-item">
                <v-switch v-model="owner"
                          :label="owner ? '只看自己' : '查看全部'"
                          dense/>
            </div>
        </div>
        <div class="history-view">
            <table>
                <thead>
                <tr>
                    <td v-for="(item, index) in thead" :key="index">{{item}}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in resultList" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>
                        <router-link :to="`/user/${item.userInfo.username}`">{{item.userInfo.username}}</router-link>
                    </td>
                    <td>
                        <router-link :to="`/problem/${item.problemId}`">{{item.problemId}}</router-link>
                    </td>
                    <td>
                        <span v-if="item.similarAt">*</span>
                        <span :style="{color: (item.result === 'ACCEPT' ? 'green' : 'red' )}">{{detailResult(item.result)}}</span>
                        <span v-if="item.similarAt">-
                            <router-link>{{item.similarAt}}
                                <span v-if="item.similarPercent">({{item.similarPercent}})</span>
                            </router-link>
                        </span>
                    </td>
                    <td>{{item.memoryUsed}} <span style="color: #7093DB">kb</span></td>
                    <td>{{item.timeUsed}} <span style="color: #7093DB">ms</span></td>
                    <td>
                        <router-link to="">{{item.lang}}</router-link>
                        <span v-if="role === 'ADMIN'">/ <router-link to="">edit</router-link></span>
                    </td>
                    <td>{{item.codeLength}} <span style="color: #7093DB">B</span></td>
                    <td>{{dateFormat(item.createAt)}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pages">
            <v-pagination
                    v-model="historyPageNumber"
                    :length="historyTotalPage"
                    :total-visible="15"
            />
        </div>
    </div>
</template>

<script>
    import {formatDate} from "@/assets/config/formatDate";
    import {statusDic} from "@/assets/config/dictionary";
    import {languageList} from "@/assets/config/caseConfig";
    import {getStorage} from "@/assets/config/storage";
    import {mapGetters} from "vuex"

    export default {
        name: "SubmitHistory",
        data() {
            return {
                owner: false,
                userId: '',
                problemId: '',
                lang: 'all',
                langList: ['all', ...languageList],
                // similar: '',
                similarPercent: 'all',
                similarPercentList: ['all', 50, 60, 70, 80, 90, 100],
                resultStatus: 'all',
                resultStatusList: ['all', 'REJUDGE_PENDING', 'PENDING', 'PREPARING', 'COMPILING', 'RUNNING',
                    'ACCEPT', 'PRESENTATION_ERROR', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEED', 'MEMORY_LIMIT_EXCEED',
                    'OUTPUT_LIMIT_EXCEED', 'RUNTIME_ERROR', 'COMPILE_ERROR', 'SYSTEM_ERROR', 'FAILED_OTHER'],
                thead: ['RunId', 'User', 'Problem', 'Result', 'Memory',
                    'Time', 'Language', 'Code Length', 'Submit Time'],
                resultList: [],
                historyPageNumber: 1,
                historyPageSize: 20,
                historyTotalPage: 1
            }
        },
        props: {
            page: Number,
            // user: String,
            // language: String,
            // problem: String,
            // result: String,
            // similar: String
        },
        watch: {
            page() {
                this.historyPageNumber = this.page
            },
            historyPageNumber() {
                if (this.historyPageNumber < 1 || this.historyPageNumber > this.historyTotalPage) {
                    this.$router.push("/history?page=1")
                } else {
                    this.$router.push(`/history?page=${this.historyPageNumber}`)
                }
                this.getResultList()
            },
            owner() {
                if (this.owner) {
                    if (getStorage('userId')) {

                        this.userId = getStorage('userId')
                    } else {
                        alert("当前未登录，请前往登录")
                        this.$router.push('/login')
                    }

                } else {
                    this.userId = ''
                }
                this.getResultList()
            }
        },
        computed: {
            ...mapGetters('auth', {role: "getUserRole"}),
            // tranResultStatus() {
            //     const tran = ['全部']
            //     for(let i = 1; i< this.resultStatusList.length - 1; i++) {
            //         tran.push(statusDic[this.resultStatusList[i]])
            //     }
            //     return tran
            // }
        },
        methods: {
            getResultList() {
                let url = this.userId ? `&ownerId=${this.userId}` : ''
                url += this.problemId ? `&problemId=${this.problemId}` : ''
                url += this.lang === 'all' ? '' : `&lang=${this.lang}`
                url += this.resultStatus === 'all' ? '' : `&result=${this.resultStatus}`
                url += this.similarPercent === 'all' ? '' : `&similarPercent=${this.similarPercent}`
                // console.log(`/solution?page=${this.historyPageNumber - 1}&size=${this.historyPageSize}${url}`)
                this.$http.get(`/solution?page=${this.historyPageNumber - 1}&size=${this.historyPageSize}${url}`,)
                    .then(res => {
                        if (res) {
                            this.resultList = res.data.content
                            this.historyTotalPage = res.data.totalPages
                        }
                    })
            },
            submit() {
                this.getResultList()
            },
            detailResult(result) {
                // 根据不同结果处理

                return statusDic[result]
            },
            dateFormat(date) {
                return formatDate(date)
            }
        },
        created() {
            this.getResultList()
        }
    }
</script>

<style lang="less" scoped>
    #submit-history {
        margin: 80px auto 0 auto;
        padding: 20px;
        width: 100%;
        min-width: 1024px;

        .filtrate {
            width: 100%;
            margin-bottom: 20px;
            padding: 10px;
            display: flex;
            box-shadow: 5px 5px 10px #f2f4fc;
            background-color: #fdfdfd;

            .filtrate-item {
                /*flex: 1;*/
                max-width: 15%;
                margin: 0 10px;
            }

            .switch {
                margin-top: -9px;
            }

            .filtrate-btn {
                flex: 1;
            }

            .filtrate-text {
                max-width: 8%;
            }

            .filtrate-per {
                max-width: 10%;
            }
        }

        .history-view {
            text-align: center;
            width: 100%;
            padding: 10px;
            box-shadow: 5px 5px 10px #f2f4fc;
            background-color: #fdfdfd;

            table {
                width: 100%;
                border-collapse: collapse;


                thead {
                    background-color: #1a5cc8;
                    color: #ffffff;

                    tr {
                        height: 3em;
                    }
                }

                tbody {
                    tr {
                        height: 2em;
                        border-top: solid 1px #dddddd;
                    }

                    tr:nth-child(even) {
                        background-color: #d7ebff;
                    }

                    tr:last-child {
                        border-bottom: solid 1px #dddddd;
                    }
                }
            }
        }

        .pages {
            margin-top: 20px;
            overflow: hidden;
            width: 100%;
        }
    }
</style>
