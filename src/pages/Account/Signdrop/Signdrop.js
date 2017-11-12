import APIService from 'src/services/API.service';
import SigndropForm from 'src/components/forms/Signdrop.form.vue';

export default {
    name: 'Signdrop',
    components: {
        SigndropForm,
    },
    methods: {
        postData (data) {
            return APIService.resource('users.signdrop').delete(data)
            .then(res => {
                console.log(res);
            });
        },
    },
};
