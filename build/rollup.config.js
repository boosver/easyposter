import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { terser } from "rollup-plugin-terser";
import path from 'path'
export default {
    input: 'src/core/index.js',
    output: [
        {
            file: path.join(__dirname, '../dist/easyposter.cjs.js'),
            format: 'cjs',
            exports:'auto'
        },
        {
            file: path.join(__dirname, '../dist/easyposter.esm.js'),
            format: 'esm'
        },
        {
            file: path.join(__dirname, '../dist/easyposter.js'),
            format: 'umd',
            name: 'easyposter'
        },
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            babelHelpers: 'runtime',      // 使plugin-transform-runtime生效
            extensions: [
                ...DEFAULT_EXTENSIONS
            ],
            // 使用预设
            presets: [['@babel/preset-env', {
                "modules": false,
                "useBuiltIns": "usage",
                "corejs": "3.15.2",
                // 目标浏览器
                "targets": {
                    "edge": '17',
                    "firefox": '60',
                    "chrome": '67',
                    "safari": '11.1',
                    'ie': '11',
                },
            }]],
            plugins: [
                //  多次导入的文件，只导入一次
                ['@babel/plugin-transform-runtime']],
        }),
        terser()
    ]
};