import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import config from 'sapper/config/rollup.js';
import pkg from '../package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

export default {
	input: config.server.input(),
	output: config.server.output(),
	plugins: [
		resolve(),
		replace({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
		commonjs(),
		svelte({
			generate: 'ssr',
			dev,
			hydratable: true
		})
	],
	external: Object.keys(pkg.dependencies).concat(
		require('module').builtinModules
	),
	experimentalCodeSplitting: true
};