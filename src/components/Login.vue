<template>
    <div style="padding: 30px; max-width: 500px" class="m-auto">
        <a-card>
            <h2 class="text-center font-semibold text-2xl text-cyan-500">
                Login to Chat App
            </h2>
            <br />
            <a-form
                name="basic"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 20 }"
                autocomplete="off"
            >
                <a-form-item label="Email" name="email">
                    <a-input v-model:value="email" />
                </a-form-item>

                <a-form-item label="Password" name="password">
                    <a-input-password v-model:value="password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" @click="Login" :loading="isLoading"
                        >Submit</a-button
                    >
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <p class="font-semibold">
                        Need an account ?
                        <router-link :to="{ name: 'signup' }">
                            Sign-up
                        </router-link>
                    </p>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script>
import firebase from '@/services/firebase';
import { notification } from 'ant-design-vue';
export default {
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
        };
    },
    methods: {
        Login(e) {
            e.preventDefault();
            this.isLoading = true;
            const email = this.email;
            const password = this.password;
            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(email, password)
                .then(async (res) => {
                    console.log(res.user);
                    if (res.user) {
                        await firebase
                            .firestore()
                            .collection('users')
                            .where('id', '==', res.user.uid)
                            .get()
                            .then((querySnapshot) => {
                                console.log('q', querySnapshot);
                                querySnapshot.forEach((doc) => {
                                    console.log(doc.data());
                                    let userData = doc.data();
                                    localStorage.setItem('id', userData.id);
                                    localStorage.setItem('name', userData.name);
                                    localStorage.setItem(
                                        'email',
                                        userData.email
                                    );
                                    localStorage.setItem('url', userData.url);
                                    localStorage.setItem(
                                        'description',
                                        userData.description
                                    );
                                    localStorage.setItem(
                                        'FirebaseDocumentId',
                                        doc.id
                                    );
                                });
                                setTimeout(() => {
                                    this.$router.push('/chat');
                                }, 1000);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        notification.success({
                            description: 'Login Successfully !',
                        });
                        this.isLoading = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    notification.error({
                        description: 'The email or password is incorrect !',
                    });
                });
        },
    },
};
</script>

<style></style>
