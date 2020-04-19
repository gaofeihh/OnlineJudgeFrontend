<template>
  <div id="app">
    <div class="nav">
      <div class="navbar">
        <a class="logo">sdtbu OJ</a>
        <label for="toggle-nav">
          <i class="el-icon-s-fold"/>
        </label>
        <input type="checkbox" id="toggle-nav"/>
        <div class="collapse">
          <div class="links">
            <!-- <router-link to="/">首页</router-link>
            <router-link to="/onlineJudge">题库</router-link>
            <router-link to="/history">历史成绩</router-link>
            <router-link to="/download">常用下载</router-link>
            <router-link to="/archives">档案馆</router-link>
            <router-link to="/about">ABOUT</router-link> -->
            <!-- :class="{active:this.$route.name===isSelect}" -->
            <router-link v-for="link in linkLists" :to="link.links" :key="link.id" >{{link.show}}</router-link>
          </div>
          <div v-if="!getNickname" class="form">
            <router-link class="form-bg" to="/login">登录</router-link>
            <router-link class="form-bg2" to="/register">注册</router-link>
          </div>
          <div v-else class="user">
            <router-link to="/user">{{getNickname}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <!--路由占位符-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        // isSelect: '/' + this.$route.name,
        linkLists: [
          {
            id: 1,
            links: '/',
            show: '首页'
          },
          {
            id: 2,
            links: '/onlineJudge',
            show: '题库'
          },
          {
            id: 3,
            links: '/history',
            show: '历史成绩'
          },
          {
            id: 4,
            links: '/download',
            show: '常用下载'
          },
          {
            id: 5,
            links: '/archives',
            show: '档案馆'
          },
          {
            id: 6,
            links: '/about',
            show: 'ABOUT'
          },
        ]

      }
    },
    beforeCreate() {
      this.$store.dispatch('asyncChangeName')
    },
    computed: {
      ...mapGetters(['getNickname'])
    },
    methods: {
      
    },
  }
</script>

<style lang="less">
  button {
    font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",
    Arial, sans-serif;
  }

  body {
    margin: 0 auto;
  }
  .active {
    color: #409eff;
  }

  #app {
    font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",
    Arial, sans-serif;
    /*text-align: center;*/

    a {
      text-decoration: none;
    }

    .nav {
      position: fixed;
      top: 0;
      z-index: 999;
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
          a:active {
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

    @media screen and (max-width: 780px) {
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
