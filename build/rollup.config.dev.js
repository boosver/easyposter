const path = require('path');
import { babel } from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload'
import html from '@rollup/plugin-html'
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
// 返回文件的绝对路径
const resolveFile = function (filename) {
  return path.join(__dirname, '..', filename);
}
/**
 * html 文件解析属性
 * @param {*} attributes 
 * @returns 
 */
const makeHtmlAttributes = (attributes) => {
  if (!attributes) {
    return '';
  }
  const keys = Object.keys(attributes);
  // eslint-disable-next-line no-param-reassign
  return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
};

export default {

  input: './src/core/index.js',
  output: {
      file: resolveFile('test/index.js'),
      format: 'esm',
      sourcemap: true,
      exports:'auto'
    },
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
    // terser(),
    // 启动开发服务器
    serve({
      port: 5000,
      host: 'localhost',
      // 当遇到错误后重定向到哪个文件
      historyApiFallback: resolveFile('test/index.html'),
      // 静态资源
      contentBase: [resolveFile('test')],
      // 在开发服务中添加一些输出的一些信息
      onListening: function (server) {
        console.log('\x1B[33m%s\x1b[0m:', 'The rollup dev Serve is start!!!')
        const address = server.address()
        const host = address.address === '::' ? 'localhost' : address.address
        // by using a bound function, we can access options as `this`
        const protocol = this.https ? 'https' : 'http';
        console.log('\x1B[36m%s\x1B[0m', `Serve is listening in ${address.port}`);
        console.log('\x1B[35m%s\x1B[39m', `You can click   ${protocol}://${host}:${address.port}/   go to Browser`);
        console.log('\x1B[34m%s\x1B[39m', `You can click   ${protocol}://localhost:${address.port}/  go to Browser`);
      }
    }),
    // copy默认的html文件,不想手动导入index.js
    html({
      fileName: 'index.html',
      title: '测试rollup开发环境',
      template: async ({ attributes, files, meta, publicPath, title }) => {
        // 解析script
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script ${attrs}>
                    import easycanvas from './index.js'
                        const ec = new easycanvas()
                        console.log(ec);
                    </script>`;
          })
          .join('\n');
        // 解析css
        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join('\n');
        //  解析mata data
        const metas = meta
          .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join('\n');
        return `
                <!doctype html>
                <html${makeHtmlAttributes(attributes.html)}>
                  <head>
                    ${metas}
                    <title>${title}</title>
                    ${links}
                  </head>
                  <body>
                  <div id='app'>APP 页面</div>
                    ${scripts}
                  </body>
                </html>`;
      }
    }),
    // 开启热更新
    livereload(),
  ]
}