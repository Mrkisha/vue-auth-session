import buble from 'rollup-plugin-buble'

export default {
    input: 'src/index.js',
    output: {
        name: 'vue-auth-session',
        exports: 'named',
    },
    plugins: [
        buble(),
    ],
};
