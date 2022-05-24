<template>
    <a-layout has-sider>
        <!-- Sider -->
        <a-layout-sider
            :style="{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }"
        >
            <a-menu theme="dark" mode="inline">
                <div class="flex justify-between p-4 border-b-2">
                    <a-avatar
                        size="large"
                        :src="currentUrl"
                        @click="profile"
                        class="hover:cursor-pointer"
                        alt="currentUserName"
                    />
                    <a-button type="primary" size="small" @click="logOut"
                        >Log out</a-button
                    >
                </div>
                <div
                    v-for="item in listUser"
                    :key="item.id"
                    v-show="item.id != currentUserId"
                >
                    <div class="p-2 flex">
                        <a-menu-item :key="item.key" @click="letChat(item)">
                            <a-avatar :src="item.url" />
                            <span class="nav-text ml-8 text-sm text-gray-200">{{
                                item.name
                            }}</span>
                        </a-menu-item>
                    </div>
                    <hr />
                </div>
            </a-menu>
        </a-layout-sider>
        <!-- Content -->
        <a-layout :style="{ marginLeft: '250px' }">
            <a-layout-content :style="{ overflow: 'initial' }">
                <div
                    :style="{
                        background: '#fff',
                        height: '100vh',
                    }"
                >
                    <div
                        class="mx-auto justify-content text-center"
                        v-if="currentPeerUser === null"
                    >
                        <a-avatar
                            :src="currentUrl"
                            :size="{
                                xs: 64,
                                sm: 80,
                                md: 100,
                                lg: 150,
                                xl: 200,
                            }"
                        />
                        <h2
                            class="md:text-2xl lg:text-4xl text-orange-400 pt-4"
                        >
                            Hi, {{ currentUserName }}
                        </h2>
                        <p class="md:text-xl lg:text-2xl pt-4">
                            {{ currentUserDescription }}
                        </p>
                    </div>
                    <div v-else>
                        <ChatBox :currentPeerUser="currentPeerUser" />
                    </div>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import ChatBox from '@/components/ChatBox.vue';
import firebase from '@/services/firebase';
export default {
    components: {
        ChatBox,
    },
    data() {
        return {
            currentPeerUser: null,
            currentUserName: localStorage.getItem('name'),
            currentUserId: localStorage.getItem('id'),
            currentUserDescription: localStorage.getItem('description'),
            currentUrl: localStorage.getItem('url'),
            listUser: [],
        };
    },
    methods: {
        profile() {
            this.$router.push('/profile');
        },
        logOut() {
            firebase.auth().signOut();
            localStorage.clear();
            this.$router.push('/');
        },
        letChat(item) {
            this.currentPeerUser = item;
        },
        async getListUser() {
            await firebase
                .firestore()
                .collection('users')
                .get()
                .then((query) => {
                    // console.log('querySnapshot', query);
                    if (query.docs.length > 0) {
                        let users = [...query.docs];
                        users.forEach((user, index) => {
                            // console.log(user.data());
                            this.listUser.push({
                                key: index,
                                firebaseDocumentId: user.id,
                                id: user.data().id,
                                name: user.data().name,
                                description: user.data().description,
                                url: user.data().url,
                            });
                        });
                    }
                });
        },
    },
    created() {
        if (localStorage.getItem('id') == null) {
            this.$router.push('/');
        } else {
            this.getListUser();
        }
    },
};
</script>
<style>
#components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
.ant-layout-sider.ant-layout-sider-dark {
    min-width: 250px !important;
}
</style>
