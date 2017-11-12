class Example {

    init (router, store, permissions) {
        this.router = router;
        this.store = store;
    }

    example () {
        return true;
    }

    set router (router) {
        router.beforeResolve((to, from, next) => {

        });
    }

    get router () {
        return this.router;
    }
}

let instance = new Example();

Example.install = function (Vue, { router, store }) {
    instance.init(router, store);

    Vue.prototype.$example = instance;
};

export default Example;
