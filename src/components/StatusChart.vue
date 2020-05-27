<template>
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="main"></div>
</template>
<script>
    import echarts from 'echarts'
    import {statusDic} from '@/assets/dictionary'

    export default {
        name: 'StatusChart',
        props: {
            status: Object
        },
        data() {
            return {
                data: []
            }
        },
        methods: {
            drawPie(id) {
                const that = this
                const myChart = echarts.init(document.getElementById(id))
                this.charts = myChart.setOption({
                    title: {
                        text: '状态',
                        left: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: {
                        type: 'pie',
                        name: '解题状态',
                        radius: '80%',
                        roseType: true,
                        data: that.data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                })
                myChart.on('click', (params) => {
                    // alert(params.dataIndex)
                    console.log(params.dataIndex)
                    // that.$router.push('/') // 可携参跳转
                })
            },
            update() {
                const keys = Object.keys(this.status)
                for(let i = 0; i< keys.length; i++) {
                    keys[i] = statusDic[keys[i]]
                }
                const values = Object.values(this.status)
                this.data.length = 0
                for (let i = 0; i < keys.length; i++) {
                    this.data.push({name: keys[i], value: values[i]})
                }
            }
        },
        //调用
        mounted() {
            this.update()
            this.$nextTick(function () {
                this.drawPie('main')
            })

        },
        watch: {
            status() {
                this.update()
                this.$nextTick(function () {
                    this.drawPie('main')
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    #main {
        width: 350px;
        height: 200px;
        margin: 0 auto;
    }

    @media screen and (max-width: 780px) {
        #main {
            width: 250px
        }
    }
</style>
