<template>
    <div style="padding: 30px; max-width: 500px" class="m-auto">
        <a-card>
            <h2 class="text-center font-semibold text-2xl text-cyan-500">
                Create An Account
            </h2>
            <br />
            <a-form
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
            >
                <a-form-item label="Email" name="email">
                   <a-input v-model:value="email" />
                </a-form-item> 
                <a-form-item label="Username" name="username">
                    <a-input v-model:value="name" />
                </a-form-item>

                <a-form-item label="Password" name="password">
                    <a-input-password v-model:value="password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button
                        type="primary"
                        @click="SignUp"
                        :loading="isLoading"
                        >Submit</a-button
                    >
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <p class="font-semibold">
                        Already account ?
                        <router-link :to="{ name: 'login' }">
                            Login app
                        </router-link>
                    </p>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script>
import firebase from '../services/firebase';
import { notification } from 'ant-design-vue';
export default {
    data() {
        return {
            email: '',
            name: '',
            password: '',
            isLoading: false,
        };
    },
    methods: {
        SignUp(e) {
            e.preventDefault();
            this.isLoading = true;
            const auth = firebase.auth();
            const name = this.name;
            const password = this.password;
            const email = this.email;
            auth.createUserWithEmailAndPassword(email, password)
                .then(async (res) => {
                    console.log('res', res);
                    await firebase
                        .firestore()
                        .collection('users')
                        .add({
                            email,
                            name,
                            password,
                            id: res.user.uid,
                            url: '',
                            description: '',
                        })
                        .then((ref) => {
                            localStorage.setItem('id', res.user.uid);
                            localStorage.setItem('name', name);
                            localStorage.setItem('email', email);
                            localStorage.setItem('password', password);
                            localStorage.setItem('FirebaseDocumentId', ref.id);
                            this.name = '';
                            this.password = '';
                            this.email = '';
                        })
                        .catch((err) => console.log('err', err));
                    notification.success({
                        description: 'Register Successfully',
                    });
                    this.isLoading = false;
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 1000);
                })
                .catch((err) => {
                    console.log('err', err);
                    notification.error({
                        description: 'Login Error !',
                    });
                    this.isLoading = false;
                });
        },
    },
};
</script>

<style></style>
