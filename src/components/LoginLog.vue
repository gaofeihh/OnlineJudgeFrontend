<template>
    <div id="login-log">
        <div class="log-des">
            <div>
                登陆地：<span>{{logItem.ip}}</span>
            </div>
            <div>
                时间：<span>{{format(parseInt(logItem.createAt))}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "@/assets/formatDate";

    export default {
        name: "LoginLog",
        props: {
            logItem: Object
        },
        methods: {
            format(date) {
                return formatDate(date)
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
            span:nth-of-type(1) {
                color: #9d9d9d;
                display: inline-block;
                width: 12em;
            }
            span:nth-of-type(2) {
                color: #9d9d9d;
                display: inline-block;
                width: 12em;
            }
        }
    }
</style>
