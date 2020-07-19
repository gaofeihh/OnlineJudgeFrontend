<template>
    <div id="login-log">
        <div class="log-des">
            <div>
                IP:<span>{{logItem.ip}}</span>
            </div>
            <div>
                登入:<span>{{format(parseInt(logItem.createAt))}}</span>
            </div>
            <div>
                登出:<span>{{format(parseInt(logItem.logoutTime))}}</span>
            </div>
            <div>
                登录时长:<span>{{toHMS(parseInt(logItem.logoutTime) - logItem.createAt)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "@/assets/script/formatDate";
    import {MilltoHMS} from "../assets/script/formatDate";

    export default {
        name: "LoginLog",
        props: {
            logItem: Object
        },
        methods: {
            format(date) {
                return formatDate(date)
            },
            toHMS(mss) {
                return MilltoHMS(mss)
            }
        }
    }
</script>

<style lang="less" scoped>
    #login-log {
        /*height: 100px;*/
        margin-bottom: 20px;
        padding: 10px;
        background-color: #fafafa;
        border-radius: 10px;
        box-shadow: 5px 5px 10px #f2f4fc;
        .log-des {
            text-align: center;
            div {
                display: inline-block;
            }
            div:nth-of-type(1) span {
                color: #9d9d9d;
                display: inline-block;
                width: 10em;
            }
            div:nth-of-type(2) span {
                color: #9d9d9d;
                display: inline-block;
                width: 12em;
            }
            div:nth-of-type(3) span {
                color: #9d9d9d;
                display: inline-block;
                width: 12em;
            }
            div:nth-of-type(4) span {
                color: #9d9d9d;
                display: inline-block;
                width: 12em;
            }
        }
    }
</style>
