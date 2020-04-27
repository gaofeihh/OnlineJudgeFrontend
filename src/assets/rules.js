const rules = {
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
    },
    registerFormRules: {
        email: [
            value => !!value || '不能为空！',
            value => /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value) || '请输入邮箱'
        ],
        nickname: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
            value => (value || '').length >= 2 || '不能低于2位'
        ],
        password: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
            value => (value || '').length >= 7 || '不能低于7位'
        ],
        rePassword: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
            value => (value || '').length >= 7 || '不能低于7位',
            value => (!!value && value) === this.registerForm.password || '两次输入不相同'
        ],
        school: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
            value => (value || '').length >= 5 || '不能低于5位'
        ],
        username: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
        ]
    },
    updateFormRules: {
        email: [
            value => !!value || '不能为空！',
            value => /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value) || '请输入邮箱'
        ],
        nickname: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
            value => (value || '').length >= 2 || '不能低于2位'
        ],
        school: [
            value => !!value || '不能为空！',
            value => (value || '').length <= 20 || '不能高于20位',
            value => (value || '').length >= 5 || '不能低于5位'
        ]
    }
}
export {rules}
