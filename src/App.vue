<template>
    <div id="app">
        <div class="nav">
            <div class="navbar">
                <router-link to="/" class="logo">SDTBU OJ</router-link>
                <label for="toggle-nav">
                    <p>选项</p>
                </label>
                <input type="checkbox" id="toggle-nav"/>
                <div class="collapse">
                    <div class="links">
                        <!-- :class="{active:this.$route.name===isSelect}" -->
                        <router-link v-for="link in linkLists" :to="link.links" :key="link.id">{{link.show}}
                        </router-link>
                    </div>
                    <div v-if="!getUsername" class="form">
                        <router-link class="form-bg" to="/login">登录</router-link>
                        <router-link class="form-bg2" to="/register">注册</router-link>
                    </div>
                    <div v-else class="user">
                        <router-link :to="`/user/${this.getUsername}`">{{getUsername}}</router-link>
                    </div>
                </div>
            </div>
            <loading-cartoon/>
        </div>
        <!--路由占位符-->
        <keep-alive>
            <v-app>
                <transition name="slide-fade">
                    <router-view/>
                </transition>
            </v-app>
        </keep-alive>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import LoadingCartoon from "@/components/LoadingCartoon";
    import {navCase} from "@/assets/config/caseConfig";

    export default {
        name: 'app',
        components: {LoadingCartoon},
        data() {
            return {
                // isSelect: '/' + this.$route.name,
                linkLists: navCase
            }
        },
        beforeCreate() {
            this.$store.dispatch('asyncChangeName')
        },
        computed: {
            ...mapGetters(['getUsername'])
        },
        methods: {},

    }
</script>

<style lang="less">
    button {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",
        Arial, sans-serif;
    }

    body {
        margin: 0 auto;
        height: auto;
    }

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        /**/
    }

    ::-webkit-scrollbar-track {
        background: rgb(239, 239, 239);
        border-radius: 2px;
    }

    ::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #409eff;
    }

    .active {
        color: #409eff;
    }

    .slide-fade-enter-active {
        transition: all .6s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter{
        transform: translateY(15px);
        opacity: 0;
    }
    .slide-fade-leave-to {
        transition: all 0s ease;
    }

    #app {
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",
        Arial, sans-serif;
        /*text-align: center;*/

        a {
            text-decoration: none;
            color: #409eff;
        }

        .nav {
            position: fixed;
            top: 0;
            z-index: 100;
            padding: 15px 0;
            width: 100%;
            background-color: #fff;
            align-items: center;
            display: flex;
            border-bottom: solid 5px #409eff;
            box-shadow: 0 5px 10px #777;

            .navbar {
                list-style: none;
                margin: 0 auto;
                display: flex;
                width: 80%;

                label {
                    display: none;
                }

                input {
                    display: none;
                }

                .logo {
                    color: #409eff;
                    font-weight: bold;
                    margin-right: 20px;
                    display: flex;
                    font-size: 20px;
                }

                .collapse {
                    display: flex;
                    flex-grow: 1;
                }

                .links {
                    display: flex;
                    margin-right: auto;

                    a {
                        color: #777;
                        margin: 0 10px;
                    }

                    a:hover {
                        color: #409eff;
                    }
                }

                .form {
                    display: flex;

                    a {
                        margin-right: 10px;
                        border-radius: 5px;
                        padding: 5px 15px;
                        border: solid 1px #409eff;
                        color: #409eff;
                    }

                    .form-bg {
                        background-color: #409eff;
                        color: #fff;
                    }

                    .form-bg:active {
                        background-color: #fff;
                        color: #409eff;
                    }

                    .form-bg2:active {
                        background-color: #409eff;
                        color: #fff;
                    }
                }

                .user {
                    display: flex;

                    a {
                        color: #409eff;
                    }
                }
            }
        }

        @media (max-width: 780px) {
            .nav {
                .navbar {
                    flex-flow: row wrap;

                    .collapse {
                        display: none;
                        width: 100%;
                        flex-flow: column;

                        .links {
                            flex-flow: column;
                            margin-bottom: 25px;

                            a {
                                padding: 8px 0;
                            }
                        }
                    }

                    .logo {
                        /* display: flex;
                              flex: 1; */
                        margin-right: auto;
                    }

                    label {
                        display: block;
                        border: solid 1px #777;
                        padding: 8px 15px;
                        color: #555;
                        border-radius: 8px;
                        cursor: pointer;
                    }

                    label:active {
                        background: #CCCCCC;
                    }

                    input {
                        display: none;
                    }

                    input:checked {
                        & + .collapse {
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
