<template>
    <div id="user">
        <v-card class="user-info-card">
            <div class="info-form">
                <v-form ref="updateRef" :model="infoForm" :rules="updateFormRules">
                    <v-text-field type="text" disabled v-model="infoForm.id" label="ID"/>
                    <v-text-field type="text" disabled v-model="infoForm.rank" label="排名"/>
                    <v-text-field type="text" v-model="infoForm.email" :disabled="isEdit" label="邮箱"
                                  :rules="updateFormRules.email"/>
                    <v-text-field type="text" v-model="infoForm.nickname" :disabled="isEdit" label="昵称"
                                  :rules="updateFormRules.nickname"/>
                    <!--                    <v-text-field type="password" v-model="infoForm.password" :disabled="isEdit" label="密码"-->
                    <!--                                  :rules="rules.password"/>-->
                    <v-text-field type="text" v-model="infoForm.school" :disabled="isEdit" label="学校"
                                  :rules="updateFormRules.school"/>
                    <v-text-field type="text" v-model="infoForm.username" disabled label="用户名"/>
                </v-form>
            </div>
            <div class="photo-box">
                <!--                <v-img class="user-photo" src="../assets/user.jpg"/>-->
                <StatusChart class="status" :status="resultMap" v-if="JSON.stringify(resultMap) !== '{}'"/>
                <div v-else class="status" style="text-align: center; width:100%; height: 200px;padding-top: 80px"><h2>
                    暂无状态信息</h2></div>
                <div class="btns" v-if="isOwner">
                    <div class="btn">
                        <v-btn :color="color" @click="changeEdit">{{Editor}}</v-btn>
                    </div>
                    <div class="btn">
                        <v-btn color="primary" @click="postInfo" :disabled="isEdit">提交修改</v-btn>
                    </div>
                    <div class="btn">
                        <v-btn color="error" @click="logout">退出登录</v-btn>
                    </div>
                </div>
            </div>
        </v-card>

        <v-divider class="br"/>

        <div class="user-center" v-if="JSON.stringify(resultMap) !== '{}'">

            <div class="result-list">
                <div class="accepted-list">
                    <h2>accepted</h2>
                    <router-link :to="`/problem/${item}`" v-for="item in userCenterInfo.accepted" :key="item">
                        {{item}}&nbsp;
                    </router-link>
                </div>

                <!--            <v-divider vertical="true"/>-->

                <div class="unsolved-list">
                    <h2>unsolved</h2>
                    <router-link :to="`/problem/${item}`" v-for="item in userCenterInfo.unsolved" :key="item">{{item}}
                        &nbsp;
                    </router-link>
                </div>
            </div>
        </div>

        <v-divider class="br"/>

        <div class="log" v-show="isOwner">
            <div class="log-text"><h2>最近登录</h2></div>
            <div class="log-component">
                <login-log v-for="item in logList" :key="item.id" :log-item="item"/>
            </div>

            <div v-if="hasLog" class="log-btn" @click="getLog">点击加载更多</div>
            <div v-else class="log-btn-err">没有更多了...</div>
        </div>

        <v-dialog v-model="rePasswordCard" persistent width="800px">
            <template v-slot:activator="{ on }">
                <router-link to="">
                    <div class="re-password" v-on="on" title="修改密码" @click="rePassword = true">修改<br/>密码</div>
                </router-link>
            </template>
            <v-card>
                <v-card-title class="headline">修改密码</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="newPasswordRef">
                            <v-row>
                                <v-text-field label="原密码"
                                              type="password"
                                              v-model="newPasswordForm.oldPassword"
                                              :rules="newPasswordRules.oldPassword"
                                              required/>
                            </v-row>
                            <v-row>
                                <v-text-field label="新密码"
                                              type="password"
                                              v-model="newPasswordForm.newPassword"
                                              :rules="newPasswordRules.newPassword"
                                              required/>
                            </v-row>
                            <v-row>
                                <v-text-field label="确认新密码"
                                              type="password"
                                              :rules="newPasswordRules.reNewPassword"
                                              required/>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="green darken-1" text @click="rePasswordCard = false">取消</v-btn>
                    <v-btn color="green darken-1" text @click="newPasswordSubmit">修改</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    // import {mapGetters} from 'vuex'
    import {rules} from '../assets/rules'
    import {formatDate} from "@/assets/formatDate"
    import LoginLog from "@/components/LoginLog"
    import StatusChart from "@/components/StatusChart"

    export default {
        name: "User",
        components: {
            StatusChart,
            LoginLog,
        },
        props: {
            getUsername: String
        },
        data() {
            return {
                isEdit: true,
                color: 'normal',
                Editor: '编辑资料',
                id: '',
                createAt: '',
                updateAt: '',
                infoForm: {
                    email: '',
                    nickname: '',
                    password: '',
                    school: '',
                    username: ''
                },
                newPasswordForm: {
                    oldPassword: '',
                    newPassword: ''
                },
                postForm: {},
                getJSON: {},
                updateFormRules: rules.updateFormRules,
                newPasswordRules: {
                    oldPassword: rules.newPasswordRules.oldPassword,
                    newPassword: rules.newPasswordRules.newPassword,
                    reNewPassword: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 20 || '不能高于20位',
                        value => (value || '').length >= 7 || '不能低于7位',
                        value => (!!value && value) === this.newPasswordForm.newPassword || '两次输入不相同'
                    ]
                },
                logList: [],
                logPage: 0,
                hasLog: true,
                userCenterInfo: {
                    accepted: [],
                    unsolved: []
                },
                resultMap: {},
                isOwner: false,
                rePasswordCard: false
            }
        },
        methods: {
            changeEdit() {
                this.isEdit = !this.isEdit
                if (this.isEdit) {
                    this.color = 'normal'
                    this.Editor = '编辑资料'
                } else {
                    this.color = 'error'
                    this.Editor = '取消编辑'
                }
            },
            compareData() {
                if (this.infoForm.email !== this.getJSON.email) {
                    this.postForm['email'] = this.infoForm.email
                }
                if (this.infoForm.nickname !== this.getJSON.nickname) {
                    this.postForm['nickname'] = this.infoForm.nickname
                }
                if (this.infoForm.school !== this.getJSON.school) {
                    this.postForm['school'] = this.infoForm.school
                }
            },
            getInfo() {
                const get = async () => {
                    const res = await this.$http.get(`/user/${this.getUsername}`)
                    // console.log(res)
                    if (res.status !== 200) {
                        return console.log("出现错误")
                    }
                    this.id = res.data.id
                    this.createAt = formatDate(res.data.createAt)
                    this.updateAt = formatDate(res.data.updateAt)
                    this.infoForm.email = res.data.email
                    this.infoForm.nickname = res.data.nickname
                    // this.infoForm.password = res.data.password
                    this.infoForm.school = res.data.school
                    this.infoForm.username = res.data.username
                    this.getJSON = res.data
                }
                get()
            },
            postInfo() {
                this.compareData()
                const isFormat = this.$refs.updateRef.validate()
                // console.log(isFormat)
                // console.log(this.postForm)
                if (isFormat) {
                    const submit = async () => {
                        const url = '/user/' + this.id
                        const res = await this.$http.post(url, this.postForm)
                        if (res.status !== 200) {
                            console.log(res.errors)
                        }
                        this.changeEdit()
                        this.infoForm.email = res.data.email
                        this.infoForm.nickname = res.data.nickname
                        this.infoForm.school = res.data.school
                        this.$message.success("修改成功")
                    }
                    submit()
                }
            },
            logout() {
                this.$http.post('/auth/logout')
                window.sessionStorage.clear()
                this.$store.dispatch('asyncChangeName')
                this.$router.push('/');
            },
            loginLog() {
                this.$http.get(`/user/loginLog/${this.id}?page=${this.logPage}&size=5`)
                    .then(res => {
                        // 根据返回数据样式再修改
                        this.logList.push(...res.data.content)
                        if (res.data.content.length < 5) {
                            this.hasLog = false
                        }
                    })

            },
            getLog() {
                this.logPage++
                this.loginLog()
            },
            getCenterInfo() {
                this.$http.get(`/user/center?isUserId=false&user=${this.getUsername}`)
                    .then(res => {
                        if(res) {
                            this.id = res.data.userInfo.id
                            this.userCenterInfo.accepted = res.data.accepted
                            this.userCenterInfo.unsolved = res.data.unsolved
                            this.infoForm = res.data.userInfo
                            this.resultMap = res.data.resultMap
                            this.isOwner = res.data.isOwner
                            window.document.title = res.data.userInfo.nickname
                            // this.resultMapKeys = Object.keys(res.data.resultMap)
                            // this.resultMapValues = Object.values(res.data.resultMap)
                            this.loginLog()
                        }
                    })
            },
            // format(date) {
            //     return formatDate(date, 2)
            // },
            newPasswordSubmit() {
                const isCan = this.$refs.newPasswordRef.validate()
                if (isCan) {
                    this.$http.patch('/user/password', this.newPasswordForm)
                        .then(res => {
                            if (res && res.status === 200) {
                                this.rePasswordCard = false
                                this.$message.success('修改成功')
                            }
                        })
                }
            }
        },
        // computed: {
        //     ...mapGetters(['getUserId'])
        // },
        created() {
            // this.getInfo()
            this.getCenterInfo()
            // this.loginLog()
        },
        watch: {
            getUsername() {
                // this.getInfo()
                this.logList.length = 0
                this.getCenterInfo()
                // this.loginLog()

            }
        }
    }
</script>

<style lang="less" scoped>
    #user {
        margin-top: 100px;

        .user-info-card {
            padding: 20px;
            width: 70%;
            /*height: 200px;*/
            margin: 0 auto;
            /*border: solid 1px #777777;*/
            box-shadow: 5px 5px 10px #f2f4fc;
            background-color: #fdfdfd;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .info-form {
                width: 50%;
            }

            .photo-box {
                display: block;
                width: 50%;
                height: auto;
                padding-top: 50px;
                /*flex: 1;*/

                /*.user-photo {*/
                /*    margin: 0 auto;*/
                /*    width: 150px;*/
                /*    height: 150px;*/
                /*    border-radius: 50%;*/
                /*}*/

                .btns {
                    margin: 90px auto 0 auto;
                    width: 80%;
                    display: flex;

                    .btn {
                        flex: 1;
                    }
                }
            }

        }

        .br {
            width: 70%;
            margin: 20px auto;
        }

        .user-center {
            .result-list {
                width: 70%;
                margin: 20px auto;
                box-shadow: 4px 4px 10px #f2f4fc;
                border-radius: 10px;

                .accepted-list {
                    padding: 0 20px 20px 20px;
                }

                .unsolved-list {
                    padding: 0 20px 20px 20px;
                }

                h2 {
                    color: #409eff;
                }

                a:hover {
                    color: #ffa500;
                    font-size: 17px;
                }
            }
        }

        .log {
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
            width: 70%;
            max-height: 420px;
            padding: 0 10px 10px 10px;
            overflow: scroll;
            overflow-x: hidden;

            .log-text {
                margin-bottom: 10px;
                color: #1a5cc8;
                background-color: #ffffff;
                width: 100%;
                /*position: relative;*/
                position: sticky;
                top: 0;
            }

            .log-btn {
                text-align: center;
                color: #777777;
            }

            .log-btn:hover {
                cursor: pointer;
                color: #409eff;
            }

            .log-btn-err {
                text-align: center;
                color: #777777;
            }

            .log-btn-err:hover {
                cursor: default;
            }
        }

        .re-password {
            position: fixed;
            background-color: #fd928b;
            color: #d13b57;
            box-shadow: 0 0 10px #c5c5c5;
            height: 50px;
            width: 50px;
            text-align: center;
            border-radius: 50%;
            padding: 10px;
            font-size: 11px;
            right: 10px;
            top: 250px;
        }

        .shadow {
            box-shadow: 0 0 10px #555555;
        }

        @media screen and (max-width: 780px) {
            .user-info-card {
                width: 90%;

                .info-form {
                    width: 80%;
                    margin: 0 auto;
                }

                .photo-box {
                    padding-top: 10px;
                    width: fit-content;
                    margin: 0 auto;

                    .status {
                        display: none;
                    }

                    .btns {
                        width: fit-content;
                        margin: 0 auto;

                        .btn {
                            width: 80px;
                            margin-left: 10px;

                            button {
                                width: 90%;
                            }
                        }
                    }
                }
            }

            .user-center {
                .result-list {
                    width: 90%;
                }
            }

            .br {
                width: 90%;
            }

            .log {
                width: 90%;
            }
        }
    }

</style>
