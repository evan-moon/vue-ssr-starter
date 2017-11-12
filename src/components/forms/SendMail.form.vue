<template>
<div>
    <b-form @submit.prevent="submit">
        <b-form-group>
            <b-form-input
                type="email"
                v-model="email"
                placeholder="ex) john0102@pixelstairs.com"
            />
        </b-form-group>
        <b-button type="submit">
            <span v-show="!isBusy">Submit</span>
            <i v-show="isBusy" class="loading-ico pxs-spinner-1 spin"></i>
        </b-button>
    </b-form>
</div>
</template>

<script>
import APIService from 'src/services/API.service';

export default {
    name: 'SendMailForm',
    props: {
        api: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            email: null,
            isBusy: false,
        };
    },
    methods: {
        submit () {
            this.isBusy = true;
            return APIService.resource(this.api).post({ email: this.email })
            .then(res => {
                this.isBusy = false;
                this.$emit('submit', {
                    res,
                    email: this.email,
                });
            }, err => {
                if (err) {}
                this.isBusy = false;
            });
        },
    },
};
</script>
