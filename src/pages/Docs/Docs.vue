<template>
<div class="container document">
    <header>
        <nav class="row justify-content-center">
            <div class="col-6 col-lg-2">
                <b-button :to="{ name: 'terms-of-service' }">Terms of service</b-button>
            </div>
            <div class="col-6 col-lg-2">
                <b-button :to="{ name: 'privacy-policy' }">Privacy policy</b-button>
            </div>
        </nav>
    </header>
    <div class="row">
        <div class="col-12" data-name="document">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    @import './Docs';
</style>

<script>
import Docs from './Docs';
export default Docs;
</script>
