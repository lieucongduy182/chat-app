<template>
    <div style="padding: 30px; max-width: 500px" class="m-auto">
        <a-card>
            <h2 class="text-center font-semibold text-2xl text-cyan-500">
                Login to Chat App
            </h2>
            <br />
            <a-form
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
            >
                <a-form-item label="Email" name="email">
                    <a-input />
                </a-form-item>

                <a-form-item label="Password" name="password">
                    <a-input-password />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary">Submit</a-button>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <router-link :to="{name: 'SignUp'}">
                        Create An Account
                    </router-link>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
