markdown-reader
===============

This is a simply reader for markdown file

markdown-reader 0.0.1正式release啦！

- 支持拖拽上传markdown文件。
- 支持markdown文件在线编辑,保存和下载。
- 支持夜间阅读模式。

安装前提:

node和npm已经安装。

安装步骤:

- git clone https://github.com/hjzheng/markdown-reader
- cd markdown-reader
- npm install
- npm start
- 访问 http://127.0.0.1:9000

目录结构:

markdown-reader
├── app.js
├── bin
│   └── www
├── markdown ---->(markdown文件存放位置)
├── node_modules
├── package.json 
├── public ----> (静态资源路径)
│   ├── bootstrap
│   ├── codemirror ---->(页面在线编辑markdown所依赖的库)
│   ├── fonts ---->(来自http://iconfont.cn)
│   ├── javascripts 
│   ├── jquery
│   └── stylesheets
├── README.md
├── routes
├── settings.properties ---->(页面的中要用到的配置)
├── upload_tmp --->(上传文件的临时存放目录)
└── views

测试环境:

- OS: Red Hat Enterprise Linux Server release 6.1 (64)
- node: v0.10.30
- npm: 1.4.21

测试浏览器:

- IE10
- Firefox31
- Chrome36

技术总结:

- back-end: nodejs + express 
- front-end: bootstrap + codemirror + jquery + html5