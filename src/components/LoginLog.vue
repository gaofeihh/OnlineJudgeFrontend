<template>
    <div id="login-log">
        <div class="log-des">
            ID:<span>{{logItem.userId}}</span>
            在<span>{{logItem.ip}}</span>登录，
            时间<span>{{format(parseInt(logItem.createAt))}}</span>
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
            span {
                color: #9d9d9d;
            }
        }
    }
</style>
