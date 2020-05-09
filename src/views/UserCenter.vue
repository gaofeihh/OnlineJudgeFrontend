<template>
    <div id="user-center">
        <router-link :to="`/problem/${item}`" v-for="item in userCenterInfo.accepted" :key="item">{{item}} &nbsp;</router-link>
<!--        <Chart :status="resultMap"/>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {formatDate} from "@/assets/formatDate"
    // import Chart from "@/components/Chart"

    export default {
        name: "UserCenter",
        data() {
            return {
                userCenterInfo: [],
                resultMap: {}
            }
        },
        components :{
            // Chart
        },
        computed: {
            ...mapGetters(['getUserId'])
        },
        methods: {
            getCenterInfo() {
                this.$http.get(`/user/center?userId=${this.getUserId}`)
                    .then(res => {
                        this.userCenterInfo = res.data
                        this.resultMap = res.data.resultMap
                        // this.resultMapKeys = Object.keys(res.data.resultMap)
                        // this.resultMapValues = Object.values(res.data.resultMap)
                    })
            },
            format(date) {
                return formatDate(date, 2)
            }
        },
        created() {
            this.getCenterInfo()
        }
    }
</script>

<style lang="less" scoped>
    #user-center {
        margin-top: 100px;
    }
</style>
