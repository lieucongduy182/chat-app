<template>
    <div class="chatBox">
        <a-layout-header style="background: lightblue">
            <a-avatar :src="currentPeerUser.url" size="large" />
            <span class="nav-text ml-8 text-black font-medium text-2xl">{{
                currentPeerUser.name
            }}</span>
        </a-layout-header>
        <a-layout-content
            :style="{
                background: '#efe9e2',
                height: '100%',
                overflow: 'auto',
            }"
            class="scroll"
        >
            <h2 class="text-center text-orange-500 text-2xl">
                Welcome to Chat Box
            </h2>
            <div class="text-outer">
                <div
                    class="text-inner"
                    v-for="item in listMessage"
                    :key="item.id"
                    :class="
                        item.idFrom === currentUserId ? 'textFrom' : 'textTo'
                    "
                >
                    <p>
                        {{ item.content }}
                    </p>
                </div>
            </div>
        </a-layout-content>
        <a-layout-footer
            style="background: lightblue; padding: 16px; padding-left: 25%"
        >
            <a-input-group>
                <a-row :gutter="8">
                    <a-col :span="16">
                        <a-input
                            @keyup.enter="sendMessage(inputValue)"
                            v-model:value="inputValue"
                        >
                            <template #suffix>
                                <div @click="sendMessage(inputValue)">
                                    <SendOutlined />
                                </div>
                            </template>
                        </a-input>
                    </a-col>
                </a-row>
            </a-input-group>
        </a-layout-footer>
    </div>
</template>

<script>
import { SendOutlined } from '@ant-design/icons-vue';
import firebase from '@/services/firebase';
import moment from 'moment';
export default {
    props: ['currentPeerUser'],
    components: {
        SendOutlined,
    },
    data() {
        return {
            inputValue: '',
            currentUserId: localStorage.getItem('id'),
            currentUserName: localStorage.getItem('name'),
            currentUserUrl: localStorage.getItem('url'),
            listMessage: [],
            groupChatId: null,
        };
    },
    watch: {
        currentPeerUser: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getMessage();
            }
        },
    },
    methods: {
        sendMessage(content) {
            console.log(`message ${content}`);
            console.log(moment().valueOf().toString());
            if (content.trim() == '') {
                return;
            }
            const timestamp = moment().valueOf().toString();
            const message = {
                id: timestamp,
                idFrom: this.currentUserId,
                idTo: this.currentPeerUser.id,
                timestamp: timestamp,
                content: content.trim(),
            };
            firebase
                .firestore()
                .collection('messages')
                .doc(this.groupChatId)
                .collection(this.groupChatId)
                .doc(timestamp)
                .set(message)
                .then(() => {
                    this.inputValue = '';
                });
        },
        getMessage() {
            this.listMessage = [];
            let groupChatId = `${this.currentPeerUser.id} + ${this.currentUserId}`;
            // create room chat
            firebase
                .firestore()
                .collection('messages')
                .doc(groupChatId)
                .collection(groupChatId)
                .onSnapshot((Snapshot) => {
                    if (Snapshot.docChanges().length > 0) {
                        this.groupChatId = groupChatId;
                        Snapshot.docChanges().forEach((res) => {
                            // console.log(res.doc);
                            // console.log('data', res.doc.data());
                            this.listMessage.push(res.doc.data());
                        });
                    } else {
                        this.groupChatId = `${this.currentUserId} + ${this.currentPeerUser.id}`;
                        firebase
                            .firestore()
                            .collection('messages')
                            .doc(this.groupChatId)
                            .collection(this.groupChatId)
                            .onSnapshot((Snapshot) => {
                                Snapshot.docChanges().forEach((res) => {
                                    if (res.type === 'added') {
                                        let index = this.listMessage.findIndex(
                                            (mess) => {
                                                return (
                                                    mess.id ===
                                                    res.doc.data().id
                                                );
                                            }
                                        );
                                        if (index < 0) {
                                            this.listMessage.push(
                                                res.doc.data()
                                            );
                                        }
                                        // console.log(res.doc.data());
                                    }
                                });
                            });
                    }
                });
        },
        scroll() {
            const scroll = document.querySelector('.scroll');
            setInterval(() => {
                scroll.scrollTop = scroll.scrollTop + scroll.scrollHeight;
            }, 1000);
        },
    },
    mounted() {
        this.getMessage();
        this.scroll();
    },
};
</script>

<style scoped>
.chatBox {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
}
.text-outer {
    display: flex;
    flex-direction: column;
}
.text-inner {
    padding-top: 10px;
    padding-left: 20px;
    border-radius: 1.5rem;
    width: 20%;
    font-size: 14px;
}
.textFrom {
    background: teal;
    color: white;
    margin: 0% 0% 20px 75%;
}
.textTo {
    background: lightcoral;
    color: white;
    margin: 0% 0% 20px 5%;
}
</style>
