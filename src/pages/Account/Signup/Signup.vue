<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div class="logo">
            <router-link :to="{ name: 'home' }">
                <img :src="logo" alt="pixelstairs-logo" title="pixelstairs-logo">
                <p>Welcome to Pixelstairs!</p>
            </router-link>
        </div>

        <div class="card-body">
            <signup-form :is-busy="isBusy" @submit="postData"></signup-form>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    @import './Signup';
</style>

<script>
    import Signup from './Signup';
    export default Signup;
</script>
