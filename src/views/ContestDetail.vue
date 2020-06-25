<template>
    <div id="contest-detail">
        <h1>{{contestInfo.name}}</h1>
        <div class="contest-detail-about">
            <v-icon>fa-calendar</v-icon>
            <span v-text="formatData(contestInfo.startAt)" />
            <v-icon>fa-clock</v-icon>
            <span v-text="dateTime(contestInfo.endBefore - contestInfo.startAt)" />
            <v-icon small>fa-users</v-icon>
            <span>{{contestInfo.owner}}</span>
            <v-icon small>fa-hand-paper</v-icon>
            <span>{{status[contestInfo.privilege]}}</span>
            <v-icon small>fa-info</v-icon>
            <span>{{status[contestInfo.status]}}</span>
        </div>
        <div class="contest-problem-list">
            <div class="problem-list-h2">
                <h2>问题列表(AC/Submit)</h2>
            </div>
            <div class="problem-list-content">
                <div class="problem-list-title" v-for="(item, index) in contestProblemList" :key="item.id">
                    <div class="problem-list-title-no">{{index+1}}</div>
                    <router-link :to="`/problem/${item.order}?contestId=${contestId}`">{{item.title}}</router-link>
                    <div class="problem-list-count">{{item.acCount}}/{{item.submitCount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {MilltoHMS, formatDate} from "@/assets/config/formatDate";
    import {contestStatus} from "@/assets/config/dictionary";

    export default {
        name: "ContestDetail",
        props: {
            contestId: String
        },
        data() {
            return {
                contestProblemList: [],
                contestInfo: {},
                status: contestStatus
            }
        },
        methods: {
            dateTime(mss) {
                return MilltoHMS(mss)
            },
            formatData(data) {
                return formatDate(data)
            },
            getContestInfo() {
                this.$http.get(`/contest/${this.contestId}`)
                    .then(res => {
                        if(res) {
                            this.contestInfo = res.data;
                            this.contestProblemList = res.data.problems;
                            window.document.title = res.data.name;
                        }
                    })
            }
        },
        created() {
            this.getContestInfo()
        }
    }
</script>

<style lang="less" scoped>
#contest-detail {
    margin: 100px auto 0 auto;
    width: 70%;
    h1 {
        margin-bottom: 20px;
        margin-left: 80px;
    }
    .contest-detail-about {
        width: 100%;
        padding: 20px 80px;
        background-color: #fdfdfd;
        box-shadow: 0 5px 6px 0 rgba(146,166,231,.13);
        border-radius: 5px;
        span {
            color: #777777;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 15px;
        }
    }
    .contest-problem-list {
        width: 100%;
        margin-top: 50px;
        background-color: #fdfdfd;
        box-shadow: 0 5px 6px 0 rgba(146,166,231,.13);
        border-radius: 5px;
        min-height: 200px;
        .problem-list-h2 {
            padding: 10px 0 10px 40px;
            background-color: #d9dae2;
            border-radius: 5px;
        }
        .problem-list-content {
            padding: 20px 40px;
            .problem-list-title {
                padding: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                border-top: 1px solid rgba(255, 255, 255, 0.3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .problem-list-title-no {
                    width: 1.5em;
                    height: 1.5em;
                    border-radius: 50%;
                    border: solid 2px #8659e2;
                    display: inline-block;
                    text-align: center;
                    line-height: 1.2em;
                    color: #8659e2;
                    background-color: #cdd4ff;
                    margin-right: 10px;
                    cursor: default;
                }
                .problem-list-count {
                    float: right;
                }
            }
        }
    }
    @media screen and (max-width: 780px) {
        width: 90%;
        h1 {
            margin-left: 0;
        }
        .contest-detail-about {
            padding: 20px;
        }
        .contest-problem-list {
            .problem-list-h2 {
                padding: 10px;
            }
            .problem-list-content {
                padding: 10px;
            }
        }
    }
}
</style>
