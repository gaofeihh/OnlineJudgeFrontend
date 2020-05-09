<template>
    <div id="app">
        <s-chart class="wrapper" canvasId="canvas" :options="options"/>
    </div>
</template>

<script>
    import Schart from 'vue-schart'

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
                    bgColor: "#fbfbfb",
                    labels: ["周一", "周二", "周三", "周四", "周五"],
                    datasets: [
                        {
                            // data: [234, 278, 270, 190, 230]
                        }
                    ]
                }
            }
        },
        // mounted() {
        //     this.options.labels = Object.keys(this.status)
        //     this.options.datasets[0].data = Object.values(this.status)
        // },
        watch: {
            status() {
                this.options.labels = Object.keys(this.status)
                this.options.datasets[0].data = Object.values(this.status)
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrapper {
        width: 80%;
        height: 400px;
        margin: 0 auto;
    }
    @media screen and (max-width: 780px) {
        .wrapper {
            width: 90%;
        }
    }
</style>
