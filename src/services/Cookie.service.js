import Cookie from 'js-cookie';
import Base64Service from 'src/services/Base64.service';

class CookieService {
    save ({ key, value }) {
        const KEY = this._encodeKey(key);
        const VALUE = this._encodeValue(value);

        Cookie.set(KEY, VALUE);
    }

    get (key) {
        const KEY = this._encodeKey(key);
        const VALUE = Cookie.get(KEY);

        return this._decode(VALUE);
    }

    clear (key) {
        const KEY = this._encodeKey(key);

        Cookie.remove(KEY);
    }

    _encodeKey (key) {
        if (!key) {
            return null;
        }
        else {
            return Base64Service.encode(`lubycon-${key}`).split('').reverse().join('');
        }
    }

    _encodeValue (value) {
        if (!value) {
            return null;
        }
        else {
            value = JSON.stringify(value);
            return Base64Service.encode(value);
        }
    }

    _decode (value) {
        if (!value) {
            return null;
        }
        else {
            value = Base64Service.decode(value);
            return JSON.parse(value);
        }
    }
}

const instance = new CookieService();

export default instance;
