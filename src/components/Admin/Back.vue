<template>
    <div id="back">

    </div>
</template>

<script>
    // 用于刷新页面，没有实际意义
    export default {
        name: "Back",
        data() {
            this.$router.replace({
                path: '/admin/uploadProblem',
                name: 'UploadProblem'
            });
            return {

            }
        },
    }
</script>

<style lang="less" scoped>

</style>
