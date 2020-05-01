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
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in problemList" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>
                        <router-link :to="`/problem/${item.id}`">{{item.title}}</router-link>
                    </td>
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
            getList() {
                this.$http.get(`/problems?page=${this.pageLimit.pageNumber-1}&size=${this.pageLimit.pageSize}`)
                    .then(value => {
                        this.problemList = value.data.content
                        this.totalPage = value.data.totalPages
                        console.log(value.data)
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
            width: 60%;
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
            width: 60%;
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

                td {
                    border: none;
                    border-collapse: collapse;
                    border-top: solid 1px #dddddd;
                    padding: 10px;
                }

                thead {
                    background-color: #f2f4fc;
                }

                tr:last-child {
                    border-bottom: solid 1px #dddddd;
                }

                tbody tr:hover {
                    /*cursor: default;*/
                    background: #ddd;
                }
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
            }
        }
    }
</style>
