import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support

export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'vue-auth-session',
        exports: 'named',
    },
    plugins: [
        buble(), // Transpile to ES5
    ],
};
