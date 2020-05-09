<template>
    <div id="online-judge">
        <div class="problem-search">
            <div class="search-text">
                <v-text-field label="编号"
                              v-model="searchId"
                              outlined
                              dense/>
            </div>
            <div class="search-btn">
                <v-btn color="primary" @click="searchById">查找题目</v-btn>
            </div>
        </div>

        <div class="problem-list">
            <table border="1">
                <thead>
                <tr>
                    <td>编号</td>
                    <td>标题</td>
                    <td>Ratio(AC/Submit)</td>
                    <td>难度</td>
                    <td>最后提交</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in problemList" :key="item.problemId">
                    <td>{{item.problemId}}</td>
                    <td>
                        <router-link :to="`/problem/${item.problemId}`">{{item.hide ? '' : item.title}}</router-link>
                    </td>
                    <td>{{item.submitCount === 0 ? 0 : Math.round((item.acCount * 100)/item.submitCount)}}%
                        ({{item.acCount}}/{{item.submitCount}})</td>
                    <td>0%</td>
                    <td>{{date(item.lastSubmit)}}</td>
                    <td :class="[item.isAccepted ? 'true-class' : 'false-class']">
                        {{item.isAccepted ? '✔' : '✘'}}</td>
                </tr>
                </tbody>
            </table>
            <div class="pages">
                <ul class="pagination">
                    <li><a @click="subNumber">«</a></li>
                    <li><a @click="addNumber">»</a></li>
                </ul>
                <div class="pageNumInput">
                    第<input class="pageInput" v-model="pageLimit.pageNumber"/>/{{totalPage}}页
                    <v-btn small color="primary" @click="getList">go</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from '@/assets/formatDate'
    export default {
        name: "OnlineJudge",
        data() {
            return {
                pageLimit: {
                    pageNumber: 1,
                    pageSize: 10
                },
                problemList: [],
                searchId: '',
                totalPage: ''
            }
        },
        methods: {
            date(date) {
                return formatDate(date, 2)
            },
            getList() {
                this.$http.get(`/problems?page=${this.pageLimit.pageNumber-1}&size=${this.pageLimit.pageSize}`)
                    .then(value => {
                        this.problemList = value.data.content
                        this.totalPage = value.data.totalPages
                        // console.log(value.data)
                    })
            },
            searchById() {
                this.$router.push(`/problem/${this.searchId}`)
            },
            addNumber() {
                if(this.pageLimit.pageNumber < this.totalPage) {
                    this.pageLimit.pageNumber++
                    this.getList()
                }
            },
            subNumber() {
                if(this.pageLimit.pageNumber > 1) {
                    this.pageLimit.pageNumber--
                    this.getList()
                }
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="less" scoped>
    #online-judge {
        margin-top: 100px;

        .problem-search {
            margin: 0 auto;
            padding: 30px;
            width: 70%;
            height: 100px;
            border-radius: 8px;
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;
            display: flex;

            .search-text {
                width: 70%;
            }

            .search-btn {
                width: auto;
                margin: 0 auto;
            }
        }

        .problem-list {
            width: 70%;
            margin-top: 30px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;

            table {
                width: 100%;
                border: none;
                border-collapse: collapse;
                table-layout:fixed;
                word-break:break-all;

                td {
                    border: none;
                    border-collapse: collapse;
                    border-top: solid 1px #dddddd;
                    padding: 10px;
                    text-align: center;

                }
                td:nth-of-type(1) {
                    width: 7%;
                }
                td:nth-of-type(2) {
                    width: auto;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                td:nth-of-type(3) {
                    width: 17%;
                }
                td:nth-of-type(4) {
                    width: 10%;
                }
                td:nth-of-type(5) {
                    width: 15%;
                }
                td:nth-of-type(6) {
                    width: 4%;
                }

                tr:last-child {
                    border-bottom: solid 1px #dddddd;
                }
                tr:nth-child(even) {
                    background-color: #d7ebff;
                }
                thead {
                    background-color: #1a5cc8;
                    color: #ffffff;
                }
                tbody {
                    .true-class {
                        color: green;
                    }
                    .false-class {
                        color: red;
                    }
                }

                /*tbody tr:hover {*/
                /*    !*cursor: default;*!*/
                /*    background: #d7ebff;*/
                /*}*/
            }

            .pages {
                margin-top: 20px;
                .pagination {
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                    li {
                        display: inline;
                        padding: 5px 16px;
                        a {
                            color: black;
                            float: left;
                            padding: 5px 16px;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        a:hover:not(.active) {
                            background-color: #ddd;
                        }
                    }
                }
                .pageNumInput {
                    float: right;
                    margin-right: 10px;
                    .pageInput {
                        width: 25px;
                        height: 20px;
                        border: solid 1px #777777;
                    }
                }
            }
        }

        @media screen and (max-width: 780px) {
            .problem-search {
                margin: 0 auto;
                padding: 30px;
                width: 90%;
                height: 100px;
                border-radius: 8px;
                background-color: #fdfdfd;
                box-shadow: 5px 5px 10px #f2f4fc;
                display: flex;

                .search-text {
                    width: 70%;
                    padding-right: 10px;
                }

                .search-btn {
                    width: auto;
                    margin: 0 auto;
                }
            }

            .problem-list {
                width: 90%;
                margin-top: 30px;
                border-radius: 8px;
                background-color: #fdfdfd;
                box-shadow: 5px 5px 10px #f2f4fc;
                table {
                    td:nth-of-type(1) {
                        width: 20%;
                    }
                    td:nth-of-type(3) {
                        display: none;
                    }
                    td:nth-of-type(4) {
                        display: none;
                    }
                    td:nth-of-type(5) {
                        display: none;
                    }
                    td:nth-of-type(6) {
                        width: 10%;
                    }
                }
            }
        }
    }
</style>
