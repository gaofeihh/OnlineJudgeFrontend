<template>
    <div id="notfound">
        <img src="../assets/404.png"/>
        <div class="btns">
            <router-link to="/">
                <v-btn>返回首页</v-btn>
            </router-link>
            <router-link to="">
                <v-btn color="primary" @click="$router.go(-1)">返回上一页</v-btn>
            </router-link>
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
        background-size: contain;

        img {
            width: 100%;
            height: auto;
        }

        .btns {
            margin: 0 auto;
            display: flex;

            a {
                flex: 1;
                text-align: center;
            }
        }
    }
</style>
