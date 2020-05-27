<template>
    <!--<div id="contest-item">
        <div class="contest-main">
            <div class="contest-title">
                <h2>{{contestObj.name}}</h2>
                <v-icon v-if="contestObj.allowed" small color="#409eff">fas fa-lock</v-icon>
            </div>
            <div class="contest-info">
                <v-icon small>fas fa-clock</v-icon>
                <span>{{format(contestObj.startAt)}}</span>
                <v-icon small>fas fa-user</v-icon>
                <span>201</span>
                <v-icon small>fas fa-users</v-icon>
                <span>{{contestObj.owner}}</span>
                <v-icon small>fas fa-hand-paper</v-icon>
                <span>{{contestObj.privilege}}</span>
                <v-icon small>fas fa-info</v-icon>
                <span>{{contestObj.status}}</span>
            </div>
        </div>
        <div class="contest-btn">
            <v-btn v-if="contestObj.allowed" color="primary" @click="$router.push(`/contestDetail/${contestObj.id}`)>报名</v-btn>
            <v-btn v-else  @click="$router.push(`/contestDetail/${contestObj.id}`)>回顾</v-btn>
        </div>
    </div>-->
    <div id="contest-item">
        <div class="contest-main">
            <div class="contest-title">
                <h2>第一届新生编程大赛</h2>
                <v-icon small color="#409eff">fas fa-lock</v-icon>
            </div>
            <div class="contest-info">
                <v-icon small>fas fa-clock</v-icon>
                <span>{{format(1590976200000)}}</span>
                <v-icon small>fas fa-user</v-icon>
                <span>201</span>
                <v-icon small>fas fa-users</v-icon>
                <span>ACM</span>
                <v-icon small>fas fa-hand-paper</v-icon>
                <span>私有</span>
                <v-icon small>fas fa-info</v-icon>
                <span>未开始</span>
            </div>
        </div>
        <div class="contest-btn">
            <v-btn color="primary" @click="$router.push(`/contest-detail/2`)">报名</v-btn>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "@/assets/formatDate";

    export default {
        name: "ContestItem",
        props: {
            contestObj: Object
        },
        methods: {
            format(date) {
                return formatDate(date, 1)
            }
        }
    }
</script>

<style lang="less" scoped>
#contest-item {
    width: 100%;
    background-color: #fdfdfd;
    box-shadow: 0 5px 6px 0 rgba(146,166,231,.13);
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 20px 40px 20px 80px;
    display: flex;
    justify-content:center;
    align-items:center;
    .contest-main {
        flex: 1;
        .contest-title {
            margin-bottom: 10px;
            h2 {
                display: inline;
                margin-right: 20px;
            }
        }
        .contest-info {

        }


        span {
            color: #777777;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 13px;
        }
    }
    .contest-btn {

    }
    @media screen and (max-width: 780px) {
        padding: 20px;
    }
}
</style>
