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
                isDisplay: false,
                polling: function () {

                }
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
            // 隐藏动画，开始轮询
            this.getOnlinePerson();
            const that = this;
            this.polling = setInterval(function() {
                that.getOnlinePerson()
            }, 5000);
            setTimeout(function() {
                that.displayCount()
            }, 1000)
            document.getElementById("loading-cartoon").style.display = 'none';
        },
        destroyed() {
            // 组件销毁显示动画，结束轮询
            clearInterval(this.polling);
            document.getElementById("loading-cartoon").style.display = 'block';
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
