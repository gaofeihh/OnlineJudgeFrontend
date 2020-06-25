<template>
    <div id="admin">
        <v-card class="admin-menu">
            <v-navigation-drawer
                    absolute
                    permanent
                    :color="color"
                    dark
                    width="100%"
            >
                <template v-slot:prepend>
                    <v-list-item two-line>
                        <!--                        <v-list-item-avatar>-->
                        <!--                            <img src="../assets/sdtbu.jpg">-->
                        <!--                        </v-list-item-avatar>-->

                        <v-list-item-content>
                            <v-list-item-title>Admin</v-list-item-title>
                            <v-list-item-subtitle>管理面板</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <v-divider />

                <v-list dense>
                    <v-list-item
                            v-for="item in menu"
                            :key="item.title"
                            link
                            @click="menuLink(item.link)"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-select
                        class="theme-select"
                        v-model="color"
                        :items="colors"
                        dense
                        outlined
                        label="主题"/>
            </v-navigation-drawer>
        </v-card>
        <router-view class="admin-view"/>
    </div>
</template>

<script>
    import {adminMenu} from "@/assets/config/caseConfig";

    export default {
        name: "Admin",
        data() {
            return {
                menu: adminMenu,
                color: 'primary',
                colors: ['primary', 'blue', 'success', 'red', 'teal'],
            }
        },
        methods: {
            menuLink(target) {
                this.$router.push(`/admin/${target}`)
            }
        }
    }
</script>

<style lang="less" scoped>
    #admin {
        margin: 60px auto 0 auto;
        height: 100%;
        width: 100%;
        display: flex;

        .admin-menu {
            height: 100%;
            width: 20%;
            .theme-select {
                width: 70%;
                margin: 5px auto;
            }
        }

        .admin-view {
            padding: 20px;
            width: 80%;
        }
    }
</style>
