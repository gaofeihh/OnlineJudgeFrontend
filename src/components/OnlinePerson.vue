<template>
    <div id="online-person">
        <h3>当前在线人数:{{personCount}}</h3>
    </div>
</template>

<script>
    export default {
        name: "OnlinePerson",
        props: {
            personCount: Number,
        }
    }
</script>

<style lang="less" scoped>
#online-person {
    position: fixed;
    width: 200px;
    height: 200px;
    background-image: url("../assets/count.png");
    background-size: contain;
    right: 30px;
    bottom: 30px;
    h3 {
        margin-top: 147px;
    }
}
</style>
