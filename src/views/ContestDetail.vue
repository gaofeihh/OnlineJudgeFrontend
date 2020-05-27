<template>
    <div id="contest-detail">
        {{contestId}}
    </div>
</template>

<script>
    export default {
        name: "ContestDetail",
        props: {
            contestId: String
        },
        methods: {
            getContestInfo() {
                this.$http.get(`/contest/${this.contestId}`)
                    .then(res => {
                        console.log(res)
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
}
</style>
