<template>
    <div id="contest">
<!--        <contest-item v-for="item in contestList" :key="item.id" :contestObj="item"/>-->
        <contest-item />
    </div>
</template>

<script>
    import ContestItem from "@/components/ContestItem";
    export default {
        name: "Contest",
        components: {ContestItem},
        data() {
            return {
                contestList: [],
                contestPage: 1,
                contestSize: 15,
                contestTotalPage: 0
            }
        },
        methods: {
            getContestList() {
                this.$http.get(`/contest/all?page=${this.contestPage-1}&size=${this.contestSize}`)
                    .then(res => {
                        this.contestList = res.data.content
                        this.contestTotalPage = res.data.totalPages
                    })
            }
        },
        created() {
            this.getContestList()
        }
    }
</script>

<style lang="less" scoped>
    #contest {
        margin: 100px auto 0 auto;
        width: 70%;


        @media screen and (max-width: 780px) {
            width: 90%;
        }
    }
</style>
