<template>
<nav class="row navbar">
    <ul>
        <li v-for="menu in navMenus">
            <router-link :to="{ name: menu.link }">
                {{ menu.name }}
            </router-link>
        </li>
    </ul>
</nav>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

$footer-margin: 20px;
$menu-margin: $footer-margin / 2;

#app-footer {
    border-top: 1px solid $grey-400;
    margin: 0;
    padding: {
        top: $footer-margin;
        right: $footer-margin;
        left: $footer-margin;
    }
    ul li {
        a {
            color: $bluegrey-700;
            &.router-link-exact-active {
                font-weight: bold;
            }
            @include mq('sm') {
                font-size: 12px;
            }
        }
    }
}

ul {
    li {
        display: inline-block;
        margin-right: $menu-margin;
        padding-right: $menu-margin;
        text-align: center;
        font-size: 14px;
        border-right: 1px solid $grey-400;
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>

<script>
export default {
    name: 'GlobalFooter',
    data () {
        return {
            navMenus: [{
                name: 'Menu1',
                link: 'home',
            }, {
                name: 'Menu2',
                link: 'home',
            }, {
                name: 'Menu3',
                link: 'home',
            }],
            msg: 'This is Global Footer',
        };
    },
};
</script>
