<template>
    <div id="upload-problem">
        upload
    </div>
</template>

<script>
    import {problemExample,problemExampleType} from "@/assets/config/caseConfig";

    export default {
        name: "AdminUploadProblem",
        data() {
            return {
                problem: problemExample,
                type: problemExampleType
            }
        },
        methods: {

        },
        created() {

        }
    }
</script>

<style lang="less" scoped>

</style>
