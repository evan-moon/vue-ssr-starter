import APIBaseResources from './APIBaseResources';
import { authAPIList } from './APIAuthResources.config';

class APIAuthResources extends APIBaseResources {
    constructor () {
        super({
            baseURL: '',
            apiList: authAPIList,
        });
    }
    signinAccount (payload) {
        /**
         * @function { signinAccount }
         * @summary 회원 로그인 로직 처리 함수
         */
        return this.post(this.apiList.signin, payload);
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

const apiAuthResources = new APIAuthResources();

export default apiAuthResources;
