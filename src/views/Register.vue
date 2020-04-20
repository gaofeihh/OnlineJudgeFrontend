<template>
    <div id="register">
        <div class="register-form">
            <v-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
                <v-text-field type="email"
                              v-model="registerForm.email"
                              :rules="registerFormRules.email"
                              :counter="25"
                              label="请输入邮箱"/>

                <v-text-field type="text"
                              v-model="registerForm.nickname"
                              :rules="registerFormRules.nickname"
                              :counter="10"
                              label="请输入姓名"/>

                <v-text-field type="password"
                              v-model="registerForm.password"
                              :rules="registerFormRules.password"
                              :counter="20"
                              label="请输入密码"/>

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
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 25 || '不能高于25位',
                        value => (value || '').length >= 10 || '不能低于10位',
                        value => /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value) || '请输入邮箱'
                    ],
                    nickname: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 10 || '不能高于10位',
                        value => (value || '').length >= 2 || '不能低于2位'
                    ],
                    password: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 20 || '不能高于20位',
                        value => (value || '').length >= 7 || '不能低于7位'
                    ],
                    school: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 20 || '不能高于20位',
                        value => (value || '').length >= 5 || '不能低于5位'
                    ],
                    username: [
                        value => !!value || '不能为空！',
                        value => (value || '').length <= 20 || '不能高于20位',
                        value => (value || '').length >= 6 || '不能低于6位'
                    ]
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
                        const {data:res} = await this.$http.put('/user', this.registerForm)
                        // 已经设置响应拦截，错误不会生效
                        if (res !== 'success') {
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
