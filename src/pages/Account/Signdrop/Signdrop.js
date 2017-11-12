/*
    @name: Signdrop.js
    @desc: 회원 탈퇴 페이지 컴포넌트
    @author: Evan Moon
    @created_at: 2017.09.11
*/
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
