<template>
    <div class="login-box">
        <!-- logo部分 -->
        <div class="avatar-box">
            <img src="../assets/image/sdtbu.jpg" alt />
        </div>
        <!-- 登录表单 -->
        <v-form ref="loginFormRef" :model="loginForm" class="login-form" :rules="loginFormRules">
            <!-- 用户名 -->
            <v-text-field type="text"
                          v-model="loginForm.identify"
                          :rules="loginFormRules.identify"
                          label="请输入用户名/邮箱"
                          :counter="25"
                          clearable
                          required/>
            <!-- 密码 -->
            <v-text-field type="password"
                          v-model="loginForm.password"
                          :rules="loginFormRules.password"
                          :counter="20"
                          clearable
                          label="请输入密码"/>
            <v-switch
                    id="switch"
                    v-model="loginForm.remember"
                    label="记住密码">
            </v-switch>
            <!-- 登录 -->
            <div class="btns">
                <v-btn color="primary" @click="login">登录</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
    import {rules} from '../assets/config/rules';
    import {setStorage} from "@/assets/config/storage";
    export default {
        data() {
            // 数据绑定
            return {
                loginForm: {
                    identify: "",
                    password: "",
                    remember: true    // 是否记住密码
                },
                // 验证规则
                loginFormRules: rules.loginFormRules

            };
        },
        methods: {
            login() {
                // 验证表单
                const result = this.$refs.loginFormRef.validate()
                // 提交
                 const submit = async() => {
                    if(result) {
                        const res = await this.$http.post("/auth/login", this.loginForm) // 添加接口地址
                        // 已经设置响应拦截，错误不会生效
                        // console.log(res)
                        if (res) {
                            this.$message.success(`登陆成功`)
                            if(this.loginForm.remember) {
                                await this.rememberPassword()
                            } else {
                                window.localStorage.clear()
                            }
                            // 1 将登陆之后的token保存到客户端的sessionStorage中
                            // token,保留登录状态
                            setStorage("userId", res.data.id)
                            setStorage("token", res.data.token)
                            setStorage("username", res.data.username)
                            setStorage("role", res.data.role)
                            await this.$store.dispatch('asyncChangeName')
                            await this.$store.dispatch('asyncChangeId')
                            await this.$store.commit('auth/changeRole')
                            // 2 通过编程式导航跳转到主页 /
                            // await this.$router.push('/');
                            await this.$router.go(-1);
                        }


                    }

                }
                submit()
            },
            rememberPassword() {
                window.localStorage.setItem('identify', this.loginForm.identify)
                window.localStorage.setItem('password', this.loginForm.password)
            }
        },
        created() {
            if(window.localStorage.getItem("identify") !== null) {
                this.loginForm.identify = window.localStorage.getItem('identify');
                this.loginForm.password = window.localStorage.getItem('password');
            }

        }
    };
</script>


<style lang="less" scoped>
    /*  */
    .login-box {
        width: 450px;
        height: 350px;
        background-color: #ffffff;
        box-shadow: 0 0 10px #888888;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar-box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }

    .login-form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        margin-bottom: 25px;
        justify-content: flex-end;
    }
    @media (max-width: 780px) {
        .login-box {
            width: 90%;
        }
    }
</style>
