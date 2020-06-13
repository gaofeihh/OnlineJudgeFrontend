<template>
    <div id="home">
        <h1>Home Page</h1>
        <online-person class="count" v-if="isDisplay" :personCount="onlineCount" />
    </div>
</template>

<script>
import OnlinePerson from "@/components/OnlinePerson";
    export default {
        name: 'Home',
        components: {
            OnlinePerson
        },
        data() {
            return {
                onlineCount: 0,
                isDisplay: false
            }
        },
        computed: {
            getSession() {
                return !!window.sessionStorage.getItem('token');
            }
        },
        methods: {
            getOnlinePerson() {
                this.$http.get(`/user/onlinePeople`).then(res => {
                    if(res) {
                        this.onlineCount = res.data
                        // console.log(1)
                    }
                })
            },
            displayCount() {
                this.isDisplay = true;
            }
        },
        created() {
            this.getOnlinePerson();
            const that = this;
            setInterval(function() {
                that.getOnlinePerson()
            }, 20000);
            setTimeout(function() {
                that.displayCount()
            }, 1000)
        }
    }
</script>
<style lang="less">
    #home {
        margin-top: 100px;
        text-align: center;
        @media screen and (max-width: 780px) {
            .count {
                display: none;
            }
        }
    }
</style>
