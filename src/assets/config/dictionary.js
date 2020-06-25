const statusDic = {
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

module.exports = {
    statusDic,
    contestStatus
}
