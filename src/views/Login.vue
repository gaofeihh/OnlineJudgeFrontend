<template>
    <div class="login-box">
        <!-- logo部分 -->
        <div class="avatar-box">
            <img src="../assets/sdtbu.jpg" alt />
        </div>
        <!-- 登录表单 -->
        <el-form ref="loginFormRef" :model="loginForm" class="login-form" :rules="loginFormRules">
            <!-- 用户名 -->
            <el-form-item prop="identify">
                <el-input
                        v-model="loginForm.identify"
                        placeholder="请输入用户名/邮箱"
                        prefix-icon="el-icon-user"
                        maxlength="20"
                        show-word-limit
                />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input
                        v-model="loginForm.password"
                        show-password
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                        maxlength="16"
                        show-word-limit
                />
            </el-form-item>
            <el-switch
                    id="switch"
                    v-model="loginForm.remember"
                    active-text="记住密码"
                    inactive-text="手动输入">
            </el-switch>
            <!-- 登录、注册 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
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
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { min: 7, max: 16, message: "长度在 7 到 16 个字符", trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            login() {
                // console.log(this.loginForm.remember)
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    }
                    // console.log(this.loginForm);
                    const { data: res } = await this.$http.post("/auth/login", this.loginForm) // 添加接口地址
                    // console.log(res)
                    if (res !== 'success') {
                        return this.$message.error("登陆失败")
                    }
                    this.$message.success("登陆成功")
                    // 1 将登陆之后的token保存到客户端的sessionStorage中
                    // token,保留登录状态
                    window.localStorage.setItem("token", res.token)
                    window.localStorage.setItem("nickname", res.nickname)
                    await this.$store.dispatch('asyncChangeName')
                    // 2 通过编程式导航跳转到主页 /
                    await this.$router.push('/');
                });
            }
        }
    };
</script>


<style lang="less" scoped>
    /*  */
    .login-box {
        width: 450px;
        height: 300px;
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
        justify-content: flex-end;
    }
</style>
