<template>
    <div id="loading-cartoon">
        <v-progress-circular
                v-show="requestCount !== 0"
                indeterminate
                color="#409eff"
        />
    </div>
</template>

<script>
    export default {
        name: "LoadingCartoon",
        computed: {
            requestCount() {
                return this.$store.getters.getRequestCount
            }
        }
    }
</script>

<style lang="less" scoped>
    #loading-cartoon {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 9999999;
    }
</style>
