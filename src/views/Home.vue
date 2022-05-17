<template>
    <div>
        <h1 class="text-3xl font-semibold text-center text-orange-600">
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
