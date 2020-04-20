<template>
    <div class="login-box">
        <!-- logo部分 -->
        <div class="avatar-box">
            <img src="../assets/sdtbu.jpg" alt />
        </div>
        <!-- 登录表单 -->
        <v-form ref="loginFormRef" :model="loginForm" class="login-form" :rules="loginFormRules">
            <!-- 用户名 -->
            <v-text-field type="text"
                          v-model="loginForm.identify"
                          :rules="loginFormRules.identify"
                          label="请输入用户名/邮箱"
                          :counter="25"
                          required/>
            <!-- 密码 -->
            <v-text-field type="password"
                          v-model="loginForm.password"
                          :rules="loginFormRules.password"
                          :counter="20"
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
                loginFormRules: {
                    identify: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 25 || '不能高于25位',
                        value => (value || '').length >= 5 || '不能低于5位'
                    ],
                    password: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 20 || '不能高于20位',
                        value => (value || '').length >= 6 || '不能低于6位'
                    ]
                }
            };
        },
        methods: {
            login() {
                // 验证表单
                const result = this.$refs.loginFormRef.validate()
                // 提交
                 const submit = async() => {
                    if(result) {
                        const { data: res } = await this.$http.post("/auth/login", this.loginForm) // 添加接口地址
                        // 已经设置响应拦截，错误不会生效
                        if (res !== 'success') {
                            // return that.$message.error("登陆失败")
                            // return Message.error('登陆失败，请检查账号密码')
                            return console.log(res.errors)
                        }
                        this.$message.success(`登陆成功`)
                        // 1 将登陆之后的token保存到客户端的sessionStorage中
                        // token,保留登录状态
                        // window.localStorage.setItem("token", res.token)
                        window.localStorage.setItem("nickname", res.nickname)
                        await this.$store.dispatch('asyncChangeName')
                        // 2 通过编程式导航跳转到主页 /
                        await this.$router.push('/');
                    }

                }
                submit()
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
</style>
