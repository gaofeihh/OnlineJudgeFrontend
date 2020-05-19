<template>
    <div id="user">
        <v-card class="user-info-card">
            <div class="info-form">
                <v-form ref="updateRef" :model="infoForm" :rules="updateFormRules">
                    <v-text-field type="text" disabled v-model="id" label="ID"/>
                    <v-text-field type="text" disabled v-model="createAt" label="注册时间"/>
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
            <div class="photo-box" v-if="isOwner">
<!--                <v-img class="user-photo" src="../assets/user.jpg"/>-->

                <div class="btns">
                    <v-btn class="btn" :color="color" @click="changeEdit">{{Editor}}</v-btn>
                    <v-btn class="btn" color="primary" @click="postInfo" :disabled="isEdit">提交修改</v-btn>
                    <v-btn class="btn" color="error" @click="logout">退出登录</v-btn>
                </div>
            </div>
        </v-card>

        <v-divider class="br"/>

        <div class="user-center">
            <Chart :status="resultMap" />
            <div class="result-list">
                <div class="accepted-list">
                    <h2>accepted</h2>
                    <router-link :to="`/problem/${item}`" v-for="item in userCenterInfo.accepted" :key="item">{{item}} &nbsp;</router-link>
                </div>

                <!--            <v-divider vertical="true"/>-->

                <div class="unsolved-list">
                    <h2>unsolved</h2>
                    <router-link :to="`/problem/${item}`" v-for="item in userCenterInfo.unsolved" :key="item">{{item}} &nbsp;</router-link>
                </div>
            </div>
        </div>

        <v-divider class="br"/>

        <div class="log" v-if="logList.length !== 0 && isOwner">
            <div class="log-text"><h2>最近登录</h2></div>
            <div class="log-component">
                <login-log v-for="item in logList" :key="item.id" :log-item="item"/>
            </div>

            <div v-if="hasLog" class="log-btn" @click="getLog">点击加载更多</div>
            <div v-else class="log-btn">没有更多了...</div>
        </div>


        <router-link to="">
            <div class="re-password" title="修改密码">修改<br/>密码</div>
        </router-link>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {rules} from '../assets/rules'
    import {formatDate} from "@/assets/formatDate"
    import LoginLog from "@/components/LoginLog"
    import Chart from "@/components/Chart"

    export default {
        name: "User",
        components: {
            'login-log': LoginLog,
            Chart
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
                postForm: {},
                getJSON: {},
                updateFormRules: rules.updateFormRules,
                logList: [],
                logPage: 0,
                hasLog: true,
                userCenterInfo: {
                    accepted: [],
                    unsolved: []
                },
                resultMap: {},
                isOwner: false
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
                        const url = '/user/' + this.getUserId
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
                window.localStorage.clear()
                this.$store.dispatch('asyncChangeName')
                this.$router.push('/');
            },
            loginLog() {
                this.$http.get(`/user/loginLog/${this.getUserId}?page=${this.logPage}&size=5`)
                    .then(res => {
                        // 根据返回数据样式再修改
                        this.logList.push(...res.data.content)
                        if (res.data.content.length === 0) {
                            this.hasLog = false
                        }
                    })
            },
            getLog() {
                this.logPage++
                this.loginLog()
            },
            getCenterInfo() {
                this.$http.get(`/user/center?username=${this.getUsername}`)
                    .then(res => {
                        this.userCenterInfo.accepted = res.data.accepted
                        this.userCenterInfo.unsolved = res.data.unsolved
                        this.infoForm = res.data.userInfo
                        this.resultMap = res.data.resultMap
                        this.isOwner = res.data.isOwner
                        // this.resultMapKeys = Object.keys(res.data.resultMap)
                        // this.resultMapValues = Object.values(res.data.resultMap)
                    })
            },
            // format(date) {
            //     return formatDate(date, 2)
            // }
        },
        computed: {
            ...mapGetters(['getUserId'])
        },
        created() {
            // this.getInfo()
            this.getCenterInfo()
            this.loginLog()
        },
        watch: {
            getUsername() {
                // this.getInfo()
                this.logList.length = 0
                this.getCenterInfo()
                this.loginLog()

            }
        }
    }
</script>

<style lang="less" scoped>
    #user {
        margin-top: 100px;

        .user-info-card {
            padding: 20px;
            width: 60%;
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

                .user-photo {
                    margin: 0 auto;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                }

                .btns {
                    margin: 0 auto;
                    width: 95px;
                    /*display: block;*/
                    /*margin-top: 50px;*/
                    /*margin-left: 20px;*/
                    /*margin-left: 50%;*/
                    /*transform: translate(-50%, 0);*/

                    .btn {
                        margin-top: 40px;
                    }
                }
            }

        }
        .br {
            width: 60%;
            margin: 20px auto;
        }

        .user-center {
            .result-list {
                width: 60%;
                margin: 20px auto;
                box-shadow: 4px 4px 10px #f2f4fc;
                border-radius: 10px;
                .accepted-list {
                    padding:0 20px 20px 20px;
                }

                .unsolved-list {
                    padding:0 20px 20px 20px;
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
            width: 60%;
            height: 420px;
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

                    .user-photo {
                        display: none;
                    }

                    .btns {
                        width: fit-content;
                        margin: 0 auto;

                        .btn {
                            width: 80px;
                            margin-left: 10px;
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
