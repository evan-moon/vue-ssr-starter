<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div v-if="validity" data-section="form-desc" data-name="result">
            <h1>Welcome to the <strong>Pixelstairs</strong></h1>
            <p>
                Now, You can upload your works freely!
            </p>
        </div>
        <div v-else data-section="form-desc" data-name="error">
            <h4 data-name="error-code">Error Code: <strong>{{ errCode }}</strong></h4>
            <h1>Oh, Something is wrong...</h1>
            <p data-name="error-message">
                {{ errMsg }}<br>
                If the problem persists, contact Pixelstairs.
            </p>
        </div>
        <div data-section="control" v-if="validity">
            <b-button v-if="!isAuthorized" :to="{ name: 'signin' }">Login now!</b-button>
            <b-button v-if="isAuthorized" :to="{ name: 'artwork-upload' }">Upload now!</b-button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    @import './AuthGradeLanding';
</style>

<script>
    import AuthGradeLanding from './AuthGradeLanding';
    export default AuthGradeLanding;
</script>
