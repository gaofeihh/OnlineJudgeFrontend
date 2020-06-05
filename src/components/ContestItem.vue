<template>
    <div id="contest-item">
        <div class="contest-main">
            <div class="contest-title">
                <h2>
                    <router-link :to="`/contest-detail/${contestObj.id}`">
                        {{contestObj.name}}
                    </router-link>
                </h2>
                <v-icon v-if="contestObj.privilege === 'PROTECT'" small color="#409eff">fas fa-lock</v-icon>
            </div>
            <div class="contest-info">
                <v-icon small>fas fa-clock</v-icon>
                <span title="开始时间">{{format(contestObj.startAt)}}</span>
                <v-icon small>fas fa-user</v-icon>
                <span>201</span>
                <v-icon small>fas fa-users</v-icon>
                <span :title="'创办者：'+contestObj.owner">{{contestObj.owner}}</span>
                <v-icon small>fas fa-hand-paper</v-icon>
                <span>{{status[contestObj.privilege]}}</span>
                <v-icon small>fas fa-info</v-icon>
                <span>{{status[contestObj.status]}}</span>
            </div>
        </div>
        <div class="contest-btn">
            <v-btn v-if="contestObj.status === 'ENDED'"
                   @click="enterContest">回顾
            </v-btn>
            <v-btn v-else-if="contestObj.privilege === 'PUBLIC'"
                   color="primary"
                   @click="enterContest">进入
            </v-btn>
            <v-btn v-else-if="contestObj.privilege === 'NEED_REGISTER'"
                   color="primary">报名
            </v-btn>
            <v-btn v-else-if="contestObj.privilege === 'PROTECT'"
                   color="primary"
                   @click="inputPassword">参加
            </v-btn>
            <!--            <v-btn v-else  @click="$router.push(`/contestDetail/${contestObj.id}`)">回顾</v-btn>-->
        </div>
    </div>
</template>

<script>
    import {formatDate} from "@/assets/formatDate";
    import {contestStatus} from "@/assets/dictionary";

    export default {
        name: "ContestItem",
        props: {
            contestObj: Object
        },
        data() {
            return {
                status: contestStatus
            }
        },
        methods: {
            format(date) {
                return formatDate(date, 1)
            },
            inputPassword() {
                this.$emit('changePasswordDialog', this.contestObj.id);
            },
            enterContest() {
                this.$router.push(`/contest-detail/${this.contestObj.id}`);
            }
        }
    }
</script>

<style lang="less" scoped>
    #contest-item {
        width: 100%;
        background-color: #fdfdfd;
        box-shadow: 0 5px 6px 0 rgba(146, 166, 231, .13);
        border-radius: 5px;
        margin-bottom: 20px;
        padding: 20px 40px 20px 80px;
        display: flex;
        justify-content: center;
        align-items: center;

        .contest-main {
            flex: 1;

            .contest-title {
                margin-bottom: 10px;

                h2 {
                    display: inline;
                    margin-right: 20px;

                    a {
                        color: #495060;
                    }
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
