<template>
    <div class="mx-auto mt-2 container relative">
        <h1 class="text-2xl font-semibold text-center text-orange-600 mb-4">
            Welcome to Profile Section
        </h1>
        <div class="relative w-36 h-36 m-auto outline rounded-md">
            <img :src="this.url" class="object-cover w-36 h-36" alt="avatar" />
            <div class="absolute bottom-0 right-0">
                <input
                    type="file"
                    name="upload"
                    class="hidden w-0"
                    @change="changeAvatar"
                    ref="fileInput"
                />
                <button @click="$refs.fileInput.click()">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="p-8 max-w-lg mx-auto">
            <a-form
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 24 }"
                layout="vertical"
            >
                <a-form-item label="Name" class="font-semibold">
                    <a-input v-model:value="name" />
                </a-form-item>
                <a-form-item label="Tell us about" class="font-semibold">
                    <a-textarea v-model:value="description" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-space size="middle">
                        <a-button
                            type="primary"
                            size="large"
                            @click="uploadProfile"
                            :loading="isLoading"
                            >Save</a-button
                        >
                        <a-button type="danger" size="large" @click="goBack"
                            >Back</a-button
                        >
                    </a-space>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import firebase from '@/services/firebase';
import { notification } from 'ant-design-vue';
export default {
    data() {
        return {
            isLoading: false,
            newPhoto: null,
            firebaseDocumentId: localStorage.getItem('FirebaseDocumentId'),
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            description: localStorage.getItem('description'),
            url: localStorage.getItem('url'),
        };
    },
    created() {
        if (localStorage.getItem('id') === null) {
            this.$router.push('/');
        }
    },
    methods: {
        goBack() {
            this.$router.push('/chat');
        },
        changeAvatar(e) {
            if (e.target.files && e.target.files[0]) {
                const fileType = e.target.files[0].type.toString();
                if (fileType.indexOf('image') != 0) {
                    notification.warn({
                        description: 'Please choose image to upload',
                    });
                    return;
                }
                this.newPhoto = e.target.files[0];
                this.url = URL.createObjectURL(e.target.files[0]);
            } else {
                notification.error({
                    description: 'Something went wrong',
                });
            }
            // console.log(this.newPhoto);
            // console.log(this.url);
        },
        uploadProfile() {
            this.isLoading = true;
            if (this.newPhoto) {
                const upload = firebase
                    .storage()
                    .ref()
                    .child(this.id)
                    .put(this.newPhoto);
                // need to download url
                upload.on(
                    'state changed',
                    null,
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        upload.snapshot.ref.getDownloadURL().then((url) => {
                            console.log(url);
                            this.updateUserInfo(true, url);
                        });
                    }
                );
            } else {
                this.updateUserInfo(false, null);
            }
        },
        updateUserInfo(isUrlPresent, downloadUrl) {
            let newInfo = {};
            if (isUrlPresent) {
                newInfo = {
                    name: this.name,
                    description: this.description,
                    url: downloadUrl,
                };
            } else {
                newInfo = {
                    name: this.name,
                    description: this.description,
                };
            }
            firebase
                .firestore()
                .collection('users')
                .doc(this.firebaseDocumentId)
                .update(newInfo)
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('name', this.name);
                    localStorage.setItem('description', this.description);
                    if (isUrlPresent) {
                        localStorage.setItem('url', downloadUrl);
                    }
                    notification.success({
                        description: 'Update Profile Successfully',
                    });
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                    notification.error({
                        description: 'Something went wrong',
                    });
                    this.isLoading = false;
                });
        },
    },
};
</script>

<style scoped></style>
