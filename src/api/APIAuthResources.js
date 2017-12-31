import APIBaseResources from './APIBaseResources';
<<<<<<< HEAD
import { authAPIList } from './APIAuthResources.config';
=======
import authAPIList from './APIAuthResources.config';
>>>>>>> b48451f29dd4fae14b91141a80e708e925c54a90

class APIAuthResources extends APIBaseResources {
    constructor () {
        super({
            baseURL: '',
            apiList: authAPIList,
        });
    }
<<<<<<< HEAD
    signinAccount (payload) {
=======
    signinAccount () {
>>>>>>> b48451f29dd4fae14b91141a80e708e925c54a90
        /**
         * @function { signinAccount }
         * @summary 회원 로그인 로직 처리 함수
         */
<<<<<<< HEAD
        return this.post(this.apiList.signin, payload);
=======
>>>>>>> b48451f29dd4fae14b91141a80e708e925c54a90
    }

    signoutAccount () {
        /**
         * @function { signoutAccount }
         * @summary 회원 로그아웃 로직 처리 함수
         */
    }

    signupAccount () {
        /**
         * @function { signupAccount }
         * @summary 회원 가입 로직 처리 함수
         */
    }

    signdropAccount () {
        /**
         * @function { signdropAccount  }
         * @summary 회원 탈퇴 로직 처리 함수
         */
    }

    checkExistEmail () {
        /**
         * @function { checkExistAccount }
         * @summary 회원 이메일 중복 여부 로직 처리 함수
         */
    }

    checkExistName () {
        /**
         * @function { checkExistName }
         * @summary 회원 이름 중복 여부 로직 처리 함수
         */
    }
}
<<<<<<< HEAD

const apiAuthResources = new APIAuthResources();

export default apiAuthResources;
=======
>>>>>>> b48451f29dd4fae14b91141a80e708e925c54a90
