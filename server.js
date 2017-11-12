const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'local';

const app = express();
app.use(cookieParser());

let renderer;
if (isProd) {
    /*
     * @운영환경
     * 서버 번들과 index.html을 사용해서 서버 렌더러를 생성한다.
     * template은 node.js의 파일 시스템 모듈인 fs를 사용해 읽어온다.
     * 서버 번들은 vue-ssr-webpack-plugin을 통해 제너레이트 됨
     */
    const bundle = require('./dist/vue-ssr-bundle.json');
    /*
     * src/index.tmpl.html은 html-webpack-plugin에 의해서 injecting된다.
     * aseets과 output을 생성하고 dist/index.html에 inject한다.
     */
    const template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8');
    renderer = createRenderer(bundle, template);
} else {
    /*
     * @개발환경:
     * webpack-dev-middleware와 webpack-hot-middleware로 세팅된 node express서버를 띄운다.
     * webpack-dev-middleware는 기본적인 서버세팅을, hot-middleware는 hot loading을 담당한다.
     */
    require('./build/dev-server')(app, (bundle, template) => {
        renderer = createRenderer(bundle, template);
    });
}

function createRenderer (bundle, template) {
    /*
        @참고자료: https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    */
    return require('vue-server-renderer').createBundleRenderer(bundle, {
        template,
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    });
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
});


app.use('/dist', serve('./dist', true));
app.use(favicon(path.resolve(__dirname, 'src/favicon.ico')));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

app.get('*', (req, res) => {
    if (!renderer) {
        return res.end('<pre>waiting for compilation... refresh in a moment.</pre>');
    }
    res.setHeader("Content-Type", "text/html");

    const s = Date.now();
    const errorHandler = err => {
        if (err && err.status) {
            err.code = err.status;
        }

        if (err && err.code === 404) {
            res.status(404).redirect('/error/404');
        }
        else if (err && err.code === 419) {
            res.status(200);
        }
        else {
            // !!Fatal Error!! Render Error Page or Redirect
            const errorTemplate = fs.readFileSync(resolve('./src/error.tmpl.html'), 'utf-8');
            res.end(errorTemplate);
            console.error(`[ERR] error during render : ${req.url}`);
            console.log('response err => ', err);
        }
    };

    /*
     * Render Start
     */
    const context = { url: req.url, cookie: req.cookies };
    console.log(context);
    if (!context.url) {
        console.error('[ERR] context url is not exist!!', context);
    }

    renderer.renderToStream(context)
    .once('data', () => {
        const {
            title, link, style, script, noscript, meta
        } = context.meta.inject();
        context.head =`
            ${title.text()}
            ${meta.text()}
            ${link.text()}
            ${style.text()}
            ${script.text()}
            ${noscript.text()}
        `;
    })
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res);
});

let port;
if(isProd) {
    port = 3000;
}
else {
    port = process.env.PORT || 3000;
}

if(isLocal) {
    let host = 'local.pixelstairs.com';
    app.listen(port, host, () => {
        console.log(`server started at ${host}:${port}`);
    });
}
else {
    app.listen(port, () => {
        console.log(`server started at 127.0.0.1:${port}`);
    });
}

process.on('uncaughtException', function (err) {
    console.log(err.stack);
    process.exit();
});
