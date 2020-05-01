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
            <div class="photo-box">
                <v-img class="user-photo" src="../assets/user.jpg"/>

                <div class="btns">
                    <v-btn class="btn" :color="color" @click="changeEdit">{{Editor}}</v-btn>
                    <v-btn class="btn" color="primary" @click="postInfo" :disabled="isEdit">提交修改</v-btn>
                    <v-btn class="btn" color="error" @click="logout">退出登录</v-btn>
                </div>
            </div>

        </v-card>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {rules} from '../assets/rules'
    import {formatDate} from "@/assets/formatDate";

    export default {
        name: "User",
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
                updateFormRules: rules.updateFormRules
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
                if(this.infoForm.email !== this.getJSON.email) {
                    this.postForm['email'] = this.infoForm.email
                }
                if(this.infoForm.nickname !== this.getJSON.nickname) {
                    this.postForm['nickname'] = this.infoForm.nickname
                }
                if(this.infoForm.school !== this.getJSON.school) {
                    this.postForm['school'] = this.infoForm.school
                }
            },
            getInfo() {
                const get = async () => {
                    const url = '/user/' + this.getUserId
                    const res = await this.$http.get(url)
                    // console.log(url)
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
                if(isFormat) {
                    const submit = async() => {
                        const url = '/user/' + this.getUserId
                        const res = await this.$http.post(url, this.postForm)
                        if(res.status !== 200) {
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
            }
        },
        computed: {
            ...mapGetters(['getUserId'])
        },
        created() {
            this.getInfo()
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
        }
    }

</style>
