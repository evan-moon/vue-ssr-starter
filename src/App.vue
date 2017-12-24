<template>
<div id="app">
    <router-view id="app-header" name="header" />
    <div id="app-body">
        <transition name="fade">
            <router-view name="content" />
        </transition>
    </div>
    <router-view id="app-footer" name="footer" />
</div>
</template>

<style lang="scss">
@import './app.scss';
</style>

<script>
import config from 'src/app.config.json';
const { app, copyrights, og, ld } = config;

export default {
    name: 'App',
    metaInfo: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - ${app.name}` : `${app.name} :: ${app.description}`;
        },
        noscript: [{
            innerHTML: 'This website requires JavaScript.',
        }],
        meta: [{
            charset: 'utf-8',
        }, {
            'http-equiv': 'Content-Type',
            content: 'text/html',
            charset: 'utf-8',
        }, {
            'http-equiv': 'Pragma',
            content: 'no-cache',
        }, {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
        }, {
            'http-equiv': 'imagetoolbar',
            content: 'no',
        }, {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, shrink-to-fit=no, viewport-fit=cover',
        }, {
            name: 'fragment',
            content: '!',
        }, {
            name: 'mobile-web-app-capable',
            content: 'yes',
        }, {
            vmid: 'title',
            name: 'title',
            content: `${app.name} :: ${app.description}`,
        }, {
            vmid: 'description',
            name: 'description',
            content: app.description,
        }, {
            name: 'author',
            content: app.author,
        }, {
            name: 'subject',
            content: app.subject,
        }, {
            name: 'publisher',
            content: app.publisher,
        }, {
            name: 'robots',
            content: 'index,follow',
        }, {
            name: 'copyright',
            content: `copyrights ${copyrights.year} ${copyrights.owner}`,
        }, {
            name: 'keywords',
            content: app.keywords,
        }, {
            vmid: 'og:type',
            property: 'og:type',
            content: 'website',
        }, {
            vmid: 'og:title',
            property: 'og:title',
            content: `${og.title} :: ${og.description}`,
        }, {
            vmid: 'og:description',
            property: 'og:description',
            content: og.description,
        }, {
            vmid: 'og:image',
            property: 'og:image',
            content: og.image,
        }, {
            vmid: 'og:url',
            property: 'og:url',
            content: og.url,
        }],
        script: [{
            innerHTML: `{
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": ${app.name},
                "url": "https://${ld.host}.com",
                "sameAs": [
                    "https://www.${ld.host}.com"
                ],
                "brand": "${ld.owner}",
                "description": "${app.description}",
                "logo": "${ld.logo}",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "${ld.tel}",
                    "email": "${ld.email}",
                    "contactType": "Customer service"
                }
            }`,
            type: 'application/ld+json',
        }],
    },
};
</script>
