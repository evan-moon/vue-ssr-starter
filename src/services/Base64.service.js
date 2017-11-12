class Base64Service {
    constructor () {
        this._KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        this._REGX = /[^A-Za-z0-9+/=]/g;
    }

    encode (str) {
        str = escape(str);

        let output = '';

        let char1 = '';
        let char2 = '';
        let char3 = '';

        let enc1 = '';
        let enc2 = '';
        let enc3 = '';
        let enc4 = '';

        let i = 0;

        do {
            char1 = str.charCodeAt(i++);
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);

            enc1 = char1 >> 2;
            enc2 = ((char1 & 3) << 4) | (char2 >> 4);
            enc3 = ((char2 & 15) << 2) | (char3 >> 6);
            enc4 = char3 & 63;

            if (isNaN(char2)) enc3 = enc4 = 64;
            else if (isNaN(char3)) enc4 = 64;

            output = output +
                this._KEY_STR.charAt(enc1) +
                this._KEY_STR.charAt(enc2) +
                this._KEY_STR.charAt(enc3) +
                this._KEY_STR.charAt(enc4);

            char1 = '';
            char2 = '';
            char3 = '';
            enc1 = '';
            enc2 = '';
            enc3 = '';
            enc4 = '';
        }
        while (i < str.length);

        return output;
    }

    decode (str) {
        let output = '';

        let char1 = '';
        let char2 = '';
        let char3 = '';

        let enc1 = '';
        let enc2 = '';
        let enc3 = '';
        let enc4 = '';

        let i = 0;

        if (this._REGX.exec(str)) {
            console.error(
                'There were invalid base64 characters in the input text(str)\n' +
                'Valid base64 characters are A-Z, a-z, 0-9, +, / and =\n' +
                'Expect errors in decoding.'
            );

            return null;
        }

        str = str.replace(this._REGX, '');

        do {
            enc1 = this._KEY_STR.indexOf(str.charAt(i++));
            enc2 = this._KEY_STR.indexOf(str.charAt(i++));
            enc3 = this._KEY_STR.indexOf(str.charAt(i++));
            enc4 = this._KEY_STR.indexOf(str.charAt(i++));

            char1 = (enc1 << 2) | (enc2 >> 4);
            char2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            char3 = ((enc3 & 3) << 6) | enc4;

            output += String.fromCharCode(char1);

            if (enc3 !== 64) {
                output += String.fromCharCode(char2);
            }
            if (enc4 !== 64) {
                output += String.fromCharCode(char3);
            }

            char1 = '';
            char2 = '';
            char3 = '';
            enc1 = '';
            enc2 = '';
            enc3 = '';
            enc4 = '';
        }
        while (i < str.length);

        return unescape(output);
    }
}

const instance = new Base64Service();
export default instance;
