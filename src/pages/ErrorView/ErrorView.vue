<template>
<div class="container-fluid">
    <div class="card card--center-form">
        <div class="message">
            <h1 data-name="error-code">{{ code }}</h1>
            <h3 data-name="error-message">{{ message }}</h3>
        </div>

        <b-button class="btn" @click="go">Go home</b-button>
    </div>
</div>
</template>

<style lang="scss" scoped>
    @import './ErrorView';
</style>

<script>
    import ErrorView from './ErrorView';
    export default ErrorView;
</script>
