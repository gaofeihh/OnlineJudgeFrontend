<template>
    <div id="app">
        <s-chart class="wrapper" canvasId="canvas" :options="options"/>
    </div>
</template>

<script>
    import Schart from 'vue-schart'
    import {statusDic} from '@/assets/dictionary'

    export default {
        name: "Chart",
        components: {
            's-chart': Schart
        },
        props :{
            status: Object
        },
        data() {
            return {
                options: {
                    type: "pie",
                    title: {
                        text: "解题状态"
                    },
                    legend: {
                        position: 'left'
                    },
                    bgColor: "#fbfbfb",
                    labels: ["AC", "WA", "TLE", "MLE", "OLE", "RE", "CE"],
                    datasets: [
                        {
                            data: []
                        }
                    ]
                }
            }
        },
        mounted() {
            this.options.labels = Object.keys(this.status)
            // this.options.labels = ["AC", "WA", "TLE", "MLE", "OLE", "RE", "CE"]
            this.options.datasets[0].data = Object.values(this.status)
            for(let i = 0; i< this.options.labels.length; i++) {
                this.options.labels[i] = statusDic[this.options.labels[i]]
            }
        },
        watch: {
            status() {
                this.options.labels = Object.keys(this.status)
                // this.options.labels = ["AC", "WA", "TLE", "MLE", "OLE", "RE", "CE"]
                this.options.datasets[0].data = Object.values(this.status)
                for(let i = 0; i< this.options.labels.length; i++) {
                    this.options.labels[i] = statusDic[this.options.labels[i]]
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrapper {
        width: 60%;
        height: 400px;
        margin: 0 auto;
    }
    @media screen and (max-width: 780px) {
        .wrapper {
            width: 90%;
        }
    }
</style>
