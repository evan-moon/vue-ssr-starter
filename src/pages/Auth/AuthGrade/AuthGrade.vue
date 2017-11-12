<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div data-section="form-desc">
            <h1>Now, it's the last step for more activities</h1>
            <p>
                You need to authenticate your email address for further activity.<br>
                Please check your email!
            </p>
        </div>
        <div data-section="time">
            <p v-if="!isExpired">
                <strong>{{ computedLeftTime.minutes() }}</strong> min
                <strong>{{ computedLeftTime.seconds() }}</strong> sec left
            </p>
            <p v-else="isExpired" class="expired-time">
                Expired
            </p>
        </div>
        <div data-section="control">
            <b-button class="btn" @click="sendEmailAgain">Send email again</b-button>
            <b-button class="btn btn-border" :to="{ name: 'home' }">Later</b-button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    @import './AuthGrade';
</style>

<script>
    import AuthGrade from './AuthGrade';
    export default AuthGrade;
</script>
