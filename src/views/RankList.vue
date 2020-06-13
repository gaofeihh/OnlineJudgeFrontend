<template>
    <div id="rank-list">
        <div class="rank-table">
            <table>
                <thead>
                <tr>
                    <td>No.</td>
                    <td>User</td>
                    <td>Nick Name</td>
                    <td>AC</td>
                    <td>Submit</td>
                    <td>Ratio</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in rankData" :key="item.id">
                    <td>{{rankBegin + index}}</td>
                    <td>
                        <router-link :to="`/user/${item.username}`">{{item.username}}</router-link>
                    </td>
                    <td>{{item.nickname}}</td>
                    <td>{{item.acceptedCount}}</td>
                    <td>{{item.submitCount}}</td>
                    <td>{{item.acceptedCount === 0 ? '0' : (item.acceptedCount*100/item.submitCount).toFixed(3)}}%</td>
                </tr>
                </tbody>
            </table>
            <div class="bottom">
                <div class="text-center">
                    <v-pagination
                            v-model="rankPage"
                            :length="totalPage"
                            :total-visible="10"
                    />
                </div>
                <div class="pageNumInput">
                    第<input class="pageInput" v-model="rankPage"/>/{{totalPage}}页
                    <v-btn small color="primary" @click="getRankList">go</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RankList",
        props: {
            page: Number
        },
        data() {
            return {
                rankData: [],
                rankPage: 1,
                rankSize: 50,
                totalPage: 0,
                number: 0,
                size: 50,
            }
        },
        computed: {
            rankBegin() {
                return (this.number) * this.size + 1
            }
        },
        methods: {
            getRankList() {
                this.$http.get(`/user/rank?page=${this.rankPage - 1}&size=${this.rankSize}`)
                    .then(res => {
                        if(res) {
                            this.rankData = res.data.content
                            this.totalPage = res.data.totalPages
                            this.number = res.data.number
                            this.size = res.data.size
                            // console.log(this.rankData)
                            // console.log(1)
                        }
                    })
            }
        },
        created() {
            this.rankPage = this.page
            this.getRankList()
        },
        watch: {
            page() {
                // if (this.page < 1 || this.page > this.totalPage) {
                //     this.rankPage =1
                //     this.getRankList()
                // } else {
                    this.rankPage = this.page

                // }
            },
            rankPage() {
                if (this.rankPage < 1 || this.rankPage > this.totalPage) {
                    this.$router.push("/rankList?page=1")
                } else {
                    this.$router.push(`/rankList?page=${this.rankPage}`)
                }
                this.getRankList()
            }
        }
    }
</script>

<style lang="less" scoped>
    #rank-list {
        margin: 100px auto 50px auto;
        width: 100%;

        .rank-table {
            width: 70%;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #fdfdfd;
            box-shadow: 5px 5px 10px #f2f4fc;

            table {
                width: 100%;
                /*min-height: 806px;*/
                border: none;
                border-collapse: collapse;
                table-layout: fixed;
                word-break: break-all;

                td {
                    border: none;
                    border-collapse: collapse;
                    border-top: solid 1px #dddddd;
                    padding: 10px;
                    text-align: center;

                }

                td:nth-of-type(1) {
                    width: 10%;
                }

                td:nth-of-type(3) {
                    width: auto;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                td:nth-of-type(2) {
                    width: 15%;
                }

                td:nth-of-type(4) {
                    width: 10%;
                }

                td:nth-of-type(5) {
                    width: 10%;
                }

                td:nth-of-type(6) {
                    width: 10%;
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
            }

            .bottom {
                overflow: hidden;
                margin-top: 20px;

                .text-center {
                    width: 100%;
                }

                .pageNumInput {
                    float: right;
                    margin-right: 10px;

                    .pageInput {
                        width: 25px;
                        height: 20px;
                        border: solid 1px #777777;
                    }

                    [v-cloak] {
                        display: none
                    }
                }
            }
        }

        @media screen and (max-width: 780px) {
            .rank-table {
                width: 90%;

                table {
                    td:nth-of-type(1) {
                        width: 8%;
                    }

                    td:nth-of-type(3) {
                        display: none;
                    }

                    td:nth-of-type(4) {
                        width: 8%;
                    }

                    td:nth-of-type(5) {
                        display: none;
                    }

                    td:nth-of-type(6) {
                        display: none;
                    }
                }
            }
        }
    }
</style>
