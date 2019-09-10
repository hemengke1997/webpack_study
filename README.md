# 从零搭建一个webpack项目(官网项目)

+ 本项目是打算实现官网，为了良好的SEO，选择express服务端渲染
+ 首先从零搭一遍webpack环境

## 安装webpack

+ 先在项目中 `npm init` ，生成`package.json`

```shell
$ npm i webpack webpack-cli -D
```

+ `-D` 是 `--save-dev` 的缩写。安装模块到`package.json ` 的 `devDependencies` 里面，主要是开发环境中的依赖包

这时候 `webpack` 已经安装好了。`webpack4` 是0配置的



## 0配置是什么

当我们安装完 `webapck` 之后，发现文件目录根本没有变，啥配置也没给咱们加啊。 这就是所谓的**0配置**  `webpack4` 支持0配置打包，在使用webpack打包的时候，默认情况下会将src目录下的入口文件 `index.js` 进行打包

```shell
node v5.2之后都会有一个npx
如果你的npx不能用 可以选择升级 node.js 或者 $ npm install -g npx

$ npx webpack        // 不设置mode的情况下， 打包出来的文件自动压缩
$ npx webpack --mode development // 设置mode为development，打包后的文件不压缩
```

<img src="C:\Users\SNQU\AppData\Roaming\Typora\typora-user-images\1568096153147.png" alt="1568096153147" style="zoom:50%;" />

<img src="C:\Users\SNQU\AppData\Roaming\Typora\typora-user-images\1568096107705.png" alt="1568096107705" style="zoom:50%;" />

+ 可以看到 执行了 `npx webpack` 命令之后webpack会自动查找src下的 index.js 文件。然后在dist目录中生成一个打包好的 main.js 文件
+ 以上就是 **0配置** 的操作。所有的东西都是定好的，不能改变



## webpack是基于nodeJS的

在项目下创建一个webpack.config.js（默认，可以修改）文件来配置webpack

```javascript
module.exports = {
  entry: '',  // 入口文件
  output: {}, // 出口文件
  module: {}, // 模块
  plugins: [],// 插件
  devServer: {},// 开发服务器配置
  mode: '' // 模式配置
};
```

+ 入口文件 entry
  + 单个入口语法

    + 用法：`entry: string | Array<string>`

      ```javascript
      const config = {
        entry: './path/to/my/entry/file.js'
      };
      
      module.exports = config;
      ```

      

  + 对象语法

    + 用法：`entry: {[entryChunkName: string]: string|Array<string>}`

      ``` javascript
      // 应用场景
      // 分离应用程序（app）和第三方库（vendor）入口
      const config = {
        entry: {
          app: './src/app.js',
          vendors: './src/vendors.js'
        }
      };
      ```

+ 输出 output

  + 配置 `output` 选项可以控制webpack如何向硬盘写入编译文件。注意，即使有多个入口，但是只指定一个出口

  + ```javascript
    // 最低配置 filename和path
    output: {
    	filename: 'bundle.js',
    	path: '/home/proj/public/assets'
    }
    ```

  + 如果配置了多个入口，使用**占位符**来确保每个输出文件的唯一性

    ```javascript
    {
      entry: {
        app: './src/app.js',
        search: './src/search.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/dist'
      }
    }
    
    // 写入到硬盘：./dist/app.js, ./dist/search.js
    ```

+ plugins 插件

  ```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这是npm安装的插件
  
  module.exports = {
    entry: {
      index: './src/index.js',
      test: './src/login.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname,'dist')  // 出口路径必须是绝对路径
    }, // 出口文件
  
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        hash: true  // 打包之后的文件名加上hash串 避免缓存
      })
    ]
  };
  ```



以上是webpack的通用配置模块

:exclamation: ​启动devServer需要安装webpack-dev-server

```shell
$ npm i webpack-dev-server -D
```

按照项目结构，我们现在从零开始写一下配置吧

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',  // 入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')  // 出口路径必须是绝对路径
  }, // 出口文件
};
```



## 配置执行文件

之前说了，**0配置** 情况下， 可以直接 `npx webpack`打包。 我们现在写了些配置文件了，也需要配置执行打包命令的文件。在 `package.json` 中配置。

```json
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  }
```

**`npm run build`** 就是打包之后的文件，在生产环境下，上线需要的文件，可以在dist目录中看到

**`npm run dev`** 是开发环境下打包，由于 `devServer` 帮我们把文件放在了内存中，所以不会输出到dist目录中



## 多入口文件打包

多个入口有两种方式实现打包

+ 没有关系的但是打包到一起，这时候可以写成数组形式
+ 每个文件单独打包，这时候要写成对象形式

先看看数组形式的

```javascript
const path = require('path');

module.exports = {
  entry: ['./src/index.js','./src/login.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')  // 出口路径必须是绝对路径
  }, // 出口文件
};
```

+ 这是把多个js文件打包成了一个bundle.js压缩文件

再来看看对象形式的

```javascript
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    test: './src/login.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')  // 出口路径必须是绝对路径
  }, // 出口文件
};

```

![1568101943800](C:\Users\SNQU\AppData\Roaming\Typora\typora-user-images\1568101943800.png)

如图所示，对象形式把文件打包成了多个文件，且打包之后的文件命名 [name] 占位符 就是入口中对象的键



## 配置Html文件

文件打包好了。但是我们如何在html中使用打包之后的js文件呢？ 通过script标签引用它？ 这明显不合理。

我们需要实现html的打包功能， 可以通过一个模板实现打包出引用好路径的html

需要安装一个常用插件， **html-webapck-plugin**

```shell
$ npm i html-webpack-plugin -D
```

因为这个是安装的插件，需要在webpack.config.js中引入

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    test: './src/login.js'
  },
  output: {
    filename: '[name].[hash:4].js',   // 添加hash防止文件缓存
    path: path.resolve(__dirname,'dist')  // 出口路径必须是绝对路径
  }, // 出口文件

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true  // 打包之后的文件名加上hash串 避免缓存
    })
  ]
};
```

打包之后

![1568103901073](C:\Users\SNQU\AppData\Roaming\Typora\typora-user-images\1568103901073.png)



### 多页面开发怎么配置

如果开发的时候不只一个页面，我们需要配置多页面，怎么搞？

