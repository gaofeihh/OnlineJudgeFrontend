<template>
    <div id="register">
        <!--        <div class="register-steps">-->
        <!--            <el-steps :active="active" align-center="true" finish-status="success">-->
        <!--                <el-step title="步骤 1"/>-->
        <!--                <el-step title="步骤 2"/>-->
        <!--                <el-step title="步骤 3"/>-->
        <!--                <el-step title="步骤 4"/>-->
        <!--                <el-step title="步骤 5"/>-->
        <!--            </el-steps>-->
        <!--        </div>-->
        <div class="register-form">
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
                <el-form-item prop="email">
                    <label>邮箱：</label>
                    <el-input
                            v-model="registerForm.email"
                            placeholder="请输入邮箱"
                            prefix-icon="el-icon-message"
                            maxlength="25"
                            show-word-limit
                    />
                </el-form-item>

                <el-form-item prop="nickname">
                    <label>姓名：</label>
                    <el-input
                            v-model="registerForm.nickname"
                            placeholder="请输入姓名"
                            prefix-icon="el-icon-user"
                            maxlength="8"
                            show-word-limit
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <label>密码（未提供密码二次确认，点击密码框右侧确认密码）：</label>
                    <el-input
                            v-model="registerForm.password"
                            show-password
                            placeholder="请输入密码"
                            prefix-icon="el-icon-lock"
                            maxlength="20"
                    />
                </el-form-item>

                <el-form-item prop="school">
                    <label>学校：</label>
                    <el-input
                            v-model="registerForm.school"
                            placeholder="请输入学校"
                            prefix-icon="el-icon-user"
                            maxlength="20"
                            show-word-limit
                    />
                </el-form-item>

                <el-form-item prop="username">
                    <label>用户名（与邮箱一同作为登录方式）：</label>
                    <el-input
                            v-model="registerForm.username"
                            placeholder="请输入用户名"
                            prefix-icon="el-icon-user"
                            maxlength="20"
                            show-word-limit
                    />
                </el-form-item>
            </el-form>

            <el-button style="margin-top: 12px;" @click="reset">重置</el-button>
            <el-button type="primary" style="margin-top: 12px;float: right" @click="register">注册</el-button>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                active: 0,
                // 注册表单
                registerForm: {
                    email: '',
                    nickname: '',
                    password: '',
                    school: '',
                    username: ''
                },
                // 验证规则
                registerFormRules: {
                    email: [
                        {required: true, message: "请输入邮箱", trigger: "blur"},
                        {min: 10, max: 25, message: "长度在 10 到 25 个字符", trigger: "blur"}
                    ],
                    nickname: [
                        {required: true, message: "请输入姓名", trigger: "blur"},
                        {min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 7, max: 20, message: "长度在 7 到 20 个字符", trigger: "blur"}
                    ],
                    school: [
                        {required: true, message: "请输入学校", trigger: "blur"},
                        {min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur"}
                    ],
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 10, max: 20, message: "长度在 10 到 20 个字符", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            // next() {
            //     if (this.active++ > 4)
            //         this.register()
            // },
            reset() {   // 重置
                this.$refs.registerFormRef.resetFields()
            },
            register() {    // 注册方法
                this.$refs.registerFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    }
                    // console.log(this.registerForm)
                    // 发送请求
                    const {data:res} = await this.$http.put('/user', this.registerForm)
                    // console.log(res)
                    if (res !== 'success') {
                        return this.$message.error("注册失败")
                    }
                    this.$message.success("注册成功")
                    await this.$router.push('/login')
                })
            }
        }
    }
</script>

<style lang="less">
    #register {
        width: 450px;
        height: 600px;
        background-color: #ffffff;
        box-shadow: 0 0 10px #888888;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*.register-steps {*/
        /*    margin-top: 100px;*/
        /*    margin-left: 25%;*/
        /*    width: 50%;*/
        /*}*/

        .register-form {
            width: 90%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

</style>
