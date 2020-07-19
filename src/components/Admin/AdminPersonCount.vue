<template>
    <div id="admin-index">
        <table>
            <thead>
            <tr>
                <td>序号</td>
                <td>ID</td>
                <td>用户名</td>
                <td>昵称</td>
                <td>邮箱</td>
                <td>登陆时间</td>
                <td>IP地址</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in onlineUserList" :key="item.id">
                <td>{{index+1}}</td>
                <td>{{item.id}}</td>
                <td>{{item.username}}</td>
                <td>{{item.nickname}}</td>
                <td>{{item.email}}</td>
                <td>{{formatLoginTime(item.loginTime)}}</td>
                <td>{{item.ip}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {formatDate} from "@/assets/script/formatDate";

    export default {
        name: "AdminPersonCount",
        data() {
            return {
                onlineUserList: []
            }
        },
        methods: {
            getOnlineUserList() {
                this.$http.get(`/user/onlinePeopleList`).then(res => {
                    if(res) {
                        this.onlineUserList = res.data
                        // console.log(this.onlineUserList)
                    }
                })
            },
            formatLoginTime(date) {
                return formatDate(date)
            }
        },
        created() {
            this.getOnlineUserList()
        }
    }
</script>

<style lang="less" scoped>
    #admin-index {
        table {
            width: 100%;
            text-align: center;
            border: none;
            border-collapse: collapse;
            /*table-layout: fixed;*/
            word-break: break-all;
            td {
                border: none;
                border-collapse: collapse;
                border-top: solid 1px #dddddd;
                padding: 8px;
                text-align: center;

            }
            td:nth-child(3) {
                width: 15%;
            }
            td:nth-child(4) {
                width: 19%;
            }
            td:nth-child(5) {
                width: 19%;
            }
            td:nth-child(7) {
                width: 15%;
            }
            tr:last-child {
                border-bottom: solid 1px #dddddd;
            }

            tr:nth-child(even) {
                background-color: #d7ebff;
            }
            thead {
                background-color: #1a5cc8;
                color: #ffffff;
            }
        }
    }
</style>
