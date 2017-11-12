<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div class="logo">
            <router-link :to="{ name: 'home' }">
                <img :src="logo" alt="pixelstairs-logo" title="pixelstairs-logo">
                <p>Connect your creativity with the World!</p>
            </router-link>
        </div>

        <div class="card-body">
            <signin-form :is-busy="isBusy" @submit="postData"></signin-form>
        </div>
        <router-link
            class="btn-link"
            :to="{ name: 'find-password' }"
        >
            Find password
        </router-link>
    </div>
</div>
</template>

<style lang="scss">
    @import './Signin';
</style>

<script>
    import Signin from './Signin';
    export default Signin;
</script>
