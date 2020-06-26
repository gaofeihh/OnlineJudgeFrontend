// 导航栏菜单
export const navCase =
    [
        {id: 1, links: '/', show: '首页'},
        {id: 2, links: '/onlineJudge?page=1', show: '题库'},
        {id: 3, links: '/history', show: '历史'},
        {id: 4, links: '/contest?page=1', show: '竞赛'},
        {id: 5, links: '/rankList?page=1', show: '排名'},
        {id: 6, links: '/about', show: 'ABOUT'}
    ];

// admin 菜单项
export const adminMenu =
    [
        {title: '在线用户', icon: 'fa-users', link: 'personCount'},
        {title: '上传题目', icon: 'fa-upload', link: 'uploadProblem'},
        {title: '创建比赛', icon: 'fa-plus', link: 'createContest'},
    ]

// admin 上传问题示例
export const problemExample =
    {
            description: "",
            hide: false,
            hint: "",
            input: "",
            memoryLimit: 512,
            output: "",
            sample: "",
            source: "",
            specialJudge: false,
            timeLimit: 1000,
            title: "",
            type: "NORMAL"
    };
export const problemExampleType =
    ['NORMAL','SUPPLEMENT_AFTER_SUBMIT_CODE','SUPPLEMENT_BEFORE_JUDGE']

// 支持语言列表
export const languageList =
    ['C_11', 'C_98', 'JAVA_8', 'PYTHON_2', 'PYTHON_3']
