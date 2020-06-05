<template>
    <div id="contest">
        <contest-item v-for="item in contestList"
                      :key="item.id"
                      :contestObj="item"
                      @changePasswordDialog="changePasswordDialog"
        />
<!--        <contest-item />-->
        <v-pagination
                v-model="contestPage"
                :length="contestTotalPage"
                :total-visible="10"
        />
        <v-dialog
                v-model="passwordDialog"
                persistent
                max-width="40%"
        >
            <v-card>
                <v-card-title>输入密码</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form>
                            <v-text-field
                                    label="Password"
                                    v-model="contestPassword"
                                    outlined
                            />
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="green darken-1" text @click="passwordDialog = false">取消</v-btn>
                    <v-btn color="green darken-1" text @click="authPassword">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import ContestItem from "@/components/ContestItem";
    export default {
        name: "Contest",
        components: {ContestItem},
        props: {
            page: Number
        },
        data() {
            return {
                contestList: [],
                contestPage: 1,
                contestSize: 15,
                contestTotalPage: 0,
                passwordDialog: false,
                protectContest: '',
                contestPassword: ''
            }
        },
        methods: {
            getContestList() {
                this.$http.get(`/contest/all?page=${this.contestPage-1}&size=${this.contestSize}`)
                    .then(res => {
                        // console.log(res.data)
                        this.contestList = res.data.content
                        this.contestTotalPage = res.data.totalPages
                    })
            },
            changePasswordDialog(contestId) {
                this.passwordDialog = true;
                this.protectContest = contestId;
            },
            authPassword() {
                console.log(this.protectContest);
                console.log(this.contestPassword);
                this.passwordDialog = false;
            }
        },
        created() {
            this.getContestList()
        },
        watch: {
            page() {
                if (this.page < 1 || this.page > this.contestTotalPage) {
                    this.contestPage = 1
                    this.getContestList()
                } else {
                    this.contestPage = this.page
                    this.getContestList()
                }
            },
            contestPage() {
                if (this.pageNumber < 1 || this.pageNumber > this.totalPage) {
                    this.$router.push("/contest?page=1")
                } else {
                    this.$router.push({path: "/contest", query: {page: this.contestPage}})
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #contest {
        margin: 100px auto 0 auto;
        width: 70%;


        @media screen and (max-width: 780px) {
            width: 90%;
        }
    }
</style>
