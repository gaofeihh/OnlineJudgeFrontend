<template>
  <div id="app">
    <div class="nav">
      <div class="navbar">
        <a class="logo">SDTBU OJ</a>
        <label for="toggle-nav">
          <p>选项</p>
        </label>
        <input type="checkbox" id="toggle-nav"/>
        <div class="collapse">
          <div class="links">
            <!-- :class="{active:this.$route.name===isSelect}" -->
            <router-link v-for="link in linkLists" :to="link.links" :key="link.id" >{{link.show}}</router-link>
          </div>
          <div v-if="!getUsername" class="form">
            <router-link class="form-bg" to="/login">登录</router-link>
            <router-link class="form-bg2" to="/register">注册</router-link>
          </div>
          <div v-else class="user">
            <router-link to="/user">{{getUsername}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <!--路由占位符-->
    <keep-alive>
      <v-app>
        <router-view/>
      </v-app>
    </keep-alive>
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
      ...mapGetters(['getUsername'])
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
    height: auto;
  }
  ::-webkit-scrollbar{
    width:10px;
    height:10px;
    /**/
  }
  ::-webkit-scrollbar-track{
    background: rgb(239, 239, 239);
    border-radius:2px;
  }
  ::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius:10px;
  }
  ::-webkit-scrollbar-thumb:hover{
    background: #409eff;
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
