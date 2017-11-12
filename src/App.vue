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
export default {
    name: 'App',
    metaInfo: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - {{SiteName}}` : '{{SiteName}} :: {{SiteDescription}}';
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
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, shrink-to-fit=no',
        }, {
            name: 'fragment',
            content: '!',
        }, {
            vmid: 'title',
            name: 'title',
            content: '{{SiteName}} :: {{SiteDescription}}',
        }, {
            vmid: 'description',
            name: 'description',
            content: '{{SiteDescription}}',
        }, {
            name: 'author',
            content: '{{Author}}',
        }, {
            name: 'subject',
            content: '{{Subject}}',
        }, {
            name: 'publisher',
            content: '{{Published by}}',
        }, {
            name: 'developed',
            content: '{{Author}}',
        }, {
            name: 'designed',
            content: '{{Designer}}',
        }, {
            name: 'robots',
            content: 'index,follow',
        }, {
            name: 'copyright',
            content: 'copyrights {{Year}} {{OwnerName}}',
        }, {
            name: 'keywords',
            content: '{{Keywords with comma like (a,b,c)}}',
        }, {
            name: 'mobile-web-app-capable',
            content: 'yes',
        }, {
            name: 'theme-color',
            content: '{{ThemeColor, it will be changed addressbar in Android}}',
        }, {
            vmid: 'og:type',
            property: 'og:type',
            content: 'website',
        }, {
            vmid: 'og:title',
            property: 'og:title',
            content: '{{SiteName}} :: {[SiteDescription]}',
        }, {
            vmid: 'og:description',
            property: 'og:description',
            content: '{{SiteDescription}}',
        }, {
            vmid: 'og:image',
            property: 'og:image',
            content: '{{ogImageSrc}}',
        }, {
            vmid: 'og:url',
            property: 'og:url',
            content: '{{ogUrl}}',
        }],
        script: [{
            innerHTML: `{
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "{{SiteName}}",
                "url": "https://{{host}}.com",
                "sameAs": [
                    "https://www.{{host}}.com"
                ],
                "brand": "{{Owner}}",
                "description": "{{SiteDescription}}",
                "logo": "{{Logo}}",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "{{tel}}",
                    "email": "{{email}}",
                    "contactType": "Customer service"
                }
            }`,
            type: 'application/ld+json',
        }],
    },
};
</script>
