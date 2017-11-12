<template>
<div class="account-form">
    <b-form @submit.prevent="submit" novalidate>
        <b-form-group>
            <b-form-input
                type="email"
                name="email"
                v-model.trim="email"
                placeholder="Email"
                v-validate="'required|email'"
                :class="{ 'has-error': errors.has('email') }"
            />
        </b-form-group>
        <b-form-group>
            <b-form-input
                type="password"
                name="password"
                v-model.trim="password"
                placeholder="Password"
                v-validate="'required'"
                :class="{ 'has-error': errors.has('password') }"
            />
        </b-form-group>
        <b-button type="submit">
            <span v-show="!isBusy">Sign in</span>
            <i v-show="isBusy" class="loading-ico pxs-spinner-1 spin"></i>
        </b-button>
    </b-form>
    <b-button class="btn-border signup-btn" :to="{ name: 'signup' }">
        Create an account
    </b-button>
</div>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

.signup-btn {
    float: right;
    color: $bluegrey-800;
}
</style>

<script>
export default {
    name: 'Signin-form',
    props: {
        isBusy: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            email: null,
            password: null,
        };
    },
    methods: {
        submit () {
            this.$validator.validateAll();
            if (this.errors.any()) {
                alert(this.errors.items[0].msg);
            }
            else {
                this.$emit('submit', {
                    email: this.email,
                    password: this.password,
                });
            }
        },
    },
};
</script>
