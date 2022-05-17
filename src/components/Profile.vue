<template>
    <div class="mx-auto pt-4 container relative">
        <h1 class="text-2xl font-semibold text-center text-orange-600">
            Welcome to Profile Section
        </h1>
        <div class="relative w-36 h-36 m-auto">
            <img
                src="@/assets/logo.png"
                class="mx-auto object-cover"
            />
            <div class="absolute bottom-0 right-0 hover:cursor-pointer" @click="changeAvatar">
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
            </div>
        </div>
        <div class="p-8 max-w-lg mx-auto">
            <a-form
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 24 }"
                layout="vertical"
            >
                <a-form-item label="Name">
                    <a-input v-model:value="name" />
                </a-form-item>
                <a-form-item label="Tell us about">
                    <a-textarea v-model:value="description" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" class="mr-4" size="large"
                        >Save</a-button
                    >
                    <a-button type="danger" size="large">Back</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            description: '',
        }
    },
    methods: {
        changeAvatar() {
            console.log('change avt');
        }
    },
};
</script>

<style scoped>
</style>
