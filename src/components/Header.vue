<template>
<nav class="row navbar fixed-top">
    <div class="col-4"></div>
    <div class="col-4 header--global-logo">
        <router-link to="/">
            <img :src="logoSrc" alt="global-logo">
        </router-link>
    </div>
    <div class="col-4 header--user-menu">
        <div v-if="isAuthorized">isAuthorized</div>
        <div v-else>
            <router-link class="btn btn-round" :to="{ name: 'signin' }">
                Login
            </router-link>
        </div>
    </div>

    <!-- MODAL -->
    <signup-modal ref="signupModal"></signup-modal>
    <!-- /MODAL -->
</nav>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

#app-header {
    margin: 0;
    height: $global-header-height;
    border-bottom: 1px solid $grey-400;
    background: {
        color: $white;
    }
    .col-4 {
        @include mq('sm') {
            padding: 0;
        }
    }
    .header--global-logo {
        text-align: center;
        img {
            height: 100%;
        }
    }
    .header--user-menu {
        text-align: right;
        & > div{
            display:inline-block;
            &:nth-child(1){
                margin-right: 30px;
            }
        }
        i {
            color: $white;
        }
    }
}
</style>

<script>
import { mapGetters } from 'vuex';
import { LOGO } from 'src/constants';
import SignupModal from 'src/components/modals/SignupModal.vue';

export default {
    name: 'GlobalHeader',
    components: {
        SignupModal,
    },
    data () {
        return {
            logoSrc: LOGO,
            msg: 'This is Global Header',
        };
    },
    computed: {
        ...mapGetters({
            isAuthorized: 'isAuthorized',
        }),
    },
};
</script>
