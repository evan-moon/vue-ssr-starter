const env = process.env.NODE_ENV;

function get (env) {
    let apiBaseUrl = '';
    let s3BaseUrl = '';

    if (env === 'production') {
        apiBaseUrl = 'https://api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/pixelstairs';
    }
    else if (env === 'development') {
        apiBaseUrl = 'https://dev.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
    }
    else if (env === 'local') {
        apiBaseUrl = 'http://local.api.pixelstairs.com/v1';
        s3BaseUrl = 'https://s3.ap-northeast-2.amazonaws.com/dev.pixelstairs';
    }

    return {
        API_BASE_URL: apiBaseUrl,
        S3_BASE_URL: s3BaseUrl,
    };
}

export const {
    API_BASE_URL,
    S3_BASE_URL,
} = get(env);
