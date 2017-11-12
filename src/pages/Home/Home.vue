<template>
<div class="container-fluid">
    <h1>{{ msg }}</h1>

    <!-- MODAL -->
    <signup-modal ref="signupModal"></signup-modal>
    <!-- /MODAL -->
</div>
</template>

<style lang="scss" scoped>
@import './Home';
</style>

<script>
import Home from './Home';
export default Home;
</script>
