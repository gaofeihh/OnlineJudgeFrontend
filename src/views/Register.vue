<template>
    <div id="register">
        <div class="register-form">
            <v-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
                <v-text-field type="email"
                              v-model="registerForm.email"
                              :rules="registerFormRules.email"
                              label="请输入邮箱"/>

                <v-text-field type="text"
                              v-model="registerForm.nickname"
                              :rules="registerFormRules.nickname"
                              :counter="20"
                              label="请输入昵称"/>

                <v-text-field type="password"
                              v-model="registerForm.password"
                              :rules="registerFormRules.password"
                              :counter="20"
                              label="请输入密码"/>

                <v-text-field type="password"
                              :rules="registerFormRules.rePassword"
                              :counter="20"
                              label="请再次输入密码"/>

                <v-text-field type="text"
                              v-model="registerForm.school"
                              :rules="registerFormRules.school"
                              :counter="20"
                              label="请输入学校"/>

                <v-text-field type="text"
                              v-model="registerForm.username"
                              :rules="registerFormRules.username"
                              :counter="20"
                              label="请输入用户名"/>
            </v-form>

            <v-btn style="margin-top: 12px;" @click="reset">重置</v-btn>
            <v-btn type="primary" color="primary" style="margin-top: 12px;float: right" @click="register">注册</v-btn>
        </div>


    </div>
</template>

<script>
    import {rules} from '../assets/config/rules'
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
                    email: rules.registerFormRules.email,
                    nickname: rules.registerFormRules.nickname,
                    password: rules.registerFormRules.password,
                    rePassword: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 20 || '不能高于20位',
                        value => (value || '').length >= 7 || '不能低于7位',
                        value => (!!value && value) === this.registerForm.password || '两次输入不相同'
                    ],
                    school: rules.registerFormRules.school,
                    username: rules.registerFormRules.username
                }
            };
        },
        methods: {
            reset() {   // 重置
                this.$refs.registerFormRef.reset()
            },
            register() {    // 注册方法
                const result = this.$refs.registerFormRef.validate()
                if(result) {
                    const submit = async() => {
                        // console.log(this.registerForm)
                        // 发送请求
                        const res = await this.$http.put('/user', this.registerForm)
                        // 已经设置响应拦截，错误不会生效
                        if (res.status !== 200) {
                            // return this.$message.error("注册失败")
                            return console.log('error')
                        }

                        this.$message.success("注册成功")
                        // console.log('success')
                        await this.$router.push('/login')
                    }
                    submit()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #register {
        margin-top: 40px;
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
    @media (max-width: 780px) {
        #register {
            width: 90%;
        }
    }

</style>
