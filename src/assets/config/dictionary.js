const statusDic = {
    "REJUDGE_PENDING": "等待重新判断",
    "PENDING": "等待中",
    "PREPARING": "准备中",
    "COMPILING": "编译中",
    "RUNNING": "运行中",
    "ACCEPT": "通过",
    "PRESENTATION_ERROR": "格式错误",
    "WRONG_ANSWER": "答案错误",
    "TIME_LIMIT_EXCEED": "时间超限",
    "MEMORY_LIMIT_EXCEED": "内存超限",
    "OUTPUT_LIMIT_EXCEED": "输出超限",
    "RUNTIME_ERROR": "运行错误",
    "COMPILE_ERROR": "编译错误",
    "SYSTEM_ERROR": "系统错误",
    "fAILED_ERROR": "其他错误"
};

const contestStatus = {
    "REGISTERED": "已报名",
    "PUBLIC": "开放",
    "NEED_REGISTER": "需要报名",
    "PROTECT": "有限制",
    "PRIVATE": "私有",
    "ENDED": "已结束",
    "RUNNING": "进行中",
    "PENDING": "准备中",
    "REGISTERING": "报名中",
    "REJECTED": "被拒绝"
};

const runResult = {
    "REJUDGE_PENDING": "-5",
    "PENDING": "-4",
    "PREPARING": "-3",
    "COMPILING": "-2",
    "RUNNING": "-1",

    "ACCEPT": "0",

    "PRESENTATION_ERROR": "1",
    "WRONG_ANSWER": "2",
    "TIME_LIMIT_EXCEED": "3",
    "MEMORY_LIMIT_EXCEED": "4",
    "OUTPUT_LIMIT_EXCEED": "5",
    "RUNTIME_ERROR": "6",
    "COMPILE_ERROR": "7",
    "SYSTEM_ERROR": "8",
    "FAILED_OTHER": "9"
}
const rankListType = {
    "总榜": "OVERALL",
    "月榜": "MONTHLY",
    "周榜": "WEEKLY",
    "日榜": "DAILY"
}
const unStatusDic = {
    "通过": 'ACCEPT',
    "格式错误": 'PRESENTATION_ERROR',
    "答案错误": 'WRONG_ANSWER',
    "时间超限": 'TIME_LIMIT_EXCEED',
    "内存超限": 'MEMORY_LIMIT_EXCEED',
    "输出超限": 'OUTPUT_LIMIT_EXCEED',
    "运行错误": 'RUNTIME_ERROR',
    "编译错误": 'COMPILE_ERROR',
    "系统错误": 'SYSTEM_ERROR',
    "其他错误": 'FAILED_OTHER'
}

module.exports = {
    statusDic,
    contestStatus,
    runResult,
    rankListType,
    unStatusDic
}
