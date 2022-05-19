<template>
    <div class="container">
        <h1 class="text-3xl font-semibold text-center text-orange-600 mt-5">
            Welcome to Chat App Vue
        </h1>
        <Login />
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
export default {
    components: {
        Login,
    },
};
</script>

<style></style>
