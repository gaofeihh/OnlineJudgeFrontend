<template>
    <div id="notfound">
        <div class="number">
            <span>4</span>
            <span>0</span>
            <span>4</span>
        </div>
        <div class="btns">
            <router-link to="/"><v-btn>返回首页</v-btn></router-link>
            <v-btn color="primary" @click="$router.go(-1)">返回上一页</v-btn>
        </div>

    </div>
</template>

<script>
    export default {
        name: "notfound"
    }
</script>

<style lang="less" scoped>
#notfound {
    margin-top: 100px;
    margin-right: auto;
    margin-left: auto;
    .number {
        text-align: center;
        span{
            font-size: 100px;
        }
        span:nth-of-type(odd) {
            color: #409eff;
        }
        span:nth-of-type(even) {
            color: #1976d2;
        }
    }
    .btns {
        margin-top: 60px;
        button:first-child {
            margin-right: 100px;
        }
    }
}
</style>
