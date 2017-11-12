<template>
<div class="account-form">
    <b-form @submit.prevent="submit" autocomplete="off" novalidate>
        <b-form-group
            :key="opt.question_id"
            :label="opt.question.en"
            v-for="(opt,idx) in options"
        >
            <b-form-select
                :options="opt.answer"
                value-field="id"
                text-field="en"
                v-model="signdropData.answerIds[idx]"
            />
        </b-form-group>
        <b-button type="submit" class="btn">Sign drop</b-button>
    </b-form>
</div>
</template>

<style lang="scss">

</style>

<script>
import APIService from 'src/services/API.service';

export default {
    name: 'Signdrop-form',
    data () {
        return {
            options: [],
            signdropData: {
                answerIds: [],
            },
        };
    },
    methods: {
        fetchOptions () {
            return APIService.resource('users.signdropSurvey')
            .get().then(res => {
                this.$set(this, 'options', res.result);
            });
        },
        submit () {
            this.$emit('submit', this.signdropData);
        },
    },
    created () {
        this.fetchOptions();
    },
};
</script>
