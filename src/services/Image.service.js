/*
    @name: Image.service.js
    @desc: 픽셀스테어스 이미지 관리 서비스
    @author: Evan Moon
    @created_at: 2017.09.03
*/

import { DEFAULT_USER_PROFILE } from 'src/constants';

class ImageService {
    constructor (DEFAULT_USER_PROFILE) {
        this.defaultUserProfile = DEFAULT_USER_PROFILE;
    }

    getResolution (img, resolution = 1920) {
        if (!img) {
            return false;
        }

        if (img.isPixelOwn) {
            return img.file + resolution;
        }
        else {
            return img.file;
        }
    }

    getUserProfile (img, resolution = 320) {
        if (!img) {
            return this.defaultUserProfile;
        }
        else {
            return this.getResolution(img, resolution);
        }
    }
}

const instance = new ImageService(DEFAULT_USER_PROFILE);
export default instance;
