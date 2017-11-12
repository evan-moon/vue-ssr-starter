export default {
    name: 'ErrorView',
    props: {
        code: {
            type: String,
            default: '500',
        },
    },
    computed: {
        message () {
            let output = 'Oops... it may be our fault';
            switch (this.code) {
            case '400':
                output = 'Oops... sorry, we can\'t do that';
                break;
            case '401':
                output = 'Unauthorized';
                break;
            case '403':
                output = 'well... we hope you don\'t try that way again';
                break;
            case '404':
                output = 'Oops... this page does not exist';
                break;
            case '408':
                output = 'tic tac! sorry, times up';
                break;
            }

            return `${output}`;
        },
    },
    methods: {
        go () {
            this.$router.push({ name: 'home' });
        },
    },
};
