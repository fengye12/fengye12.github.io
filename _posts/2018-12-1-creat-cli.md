---
layout: post
title:  如何制作类似vue-cli的cli工具？
tags: cli
categories: 框架
excerpt_separator:  '[^_^]:more'
---


### 前言
CLI，全称是command-line interface，也就是命令行交互接口。无论是在前端还是后端，都可以用于在构建时通过命令快速生成项目或模板等。例如前端的vue-cli（Vue前端开发脚手架），后端的dva-cli（Ant Design后端开发脚手架）等

```
vue init webpack [project-name]
```
在执行这段代码之后，系统会自动下载模板包，随后会询问我们一些问题，比如模板名称，作者，是否需要使用eslint，使用npm或者yarn进行构建等等，当所有问题我们回答之后，就开始生成脚手架项目。



### 为什么要开发一个 CLI
假设你现在要建立一个新项目 ，这个项目配置和之前的项目配置是一样的。在你没有 CLI 的时候，你只能通过复制、粘贴来进行。然而，当你有了 CLI，你就可以通过命令来完成这些步骤。当然，你可以说就新建一个项目，完全没必要再开发一个 CLI 工具。那如果你要新建 n 个项目呢？这个时候，有 CLI 和没有 CLI 的区别就体现出来了

[^_^]:more

### 怎么开发一个 CLI
开发一个 CLI，需要用到以下工具：
- commander(node.js命令行界面的完整解决方案)
- shelljs(Node.js API之上的shell命令的实现)
- download-git-repo(clone git repo)
- chalk
- inquirer(常用交互式命令行用户界面的集合)
- ora(主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等)

新建一个文件夹，名称起做 demo-cli，并在文件夹内 `npm init -f`。
在 demo-cli 文件夹内，新建 bin 文件夹，并在该文件夹内新建 index.js 文件。紧接着，打开 demo-cli 文件夹内的 package.json 文件，在里面新增如下命令。



```
{
    "bin": {
        "demo": "./bin/index.js"
    }
}
```

这句代码的意思是指，在你使用 demo 命令的时候，会去执行 bin 文件夹下的 index.js 文件。


>bin 目录本身并没有什么特殊的含义, 不过由于一些约定俗成的原因, 我们一般都将可执行文件放到 bin 目录中.
>除了 bin 目录用于存放可执行文件外, 我们还使用 lib 用于存放库文件, include 用于存放头文件, 这些也仅仅是一些约定而已, 为了方便管理, 也并不是说必须要这么做.


这时候，我们在 index.js 文件，写入以下代码。

```
#!/usr/bin/env node
console.log('hello CLI');
```

在 demo-cli 目录下依次运行 npm link、demo，这个时候，你会发现控制台输出了 hello CLI。


>备注：

> #!/usr/bin/env node 告诉操作系统用 Node 来运行此文件
> npm link 作用主要是，在开发 npm 模块的时候，我们会希望边开发边调试。这个时候，npm link 就派上用场了。

> npm link命令可以将一个任意位置的npm包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包

> 简要地讲，这个命令主要做了两件事：

> 为npm包目录创建软链接
> 为可执行文件(bin)创建软链接


### 逐步深入
1.在 index.js 文件内，写入以下代码。

```
#!/usr/bin/env node
const program = require('commander');
program
    .version('1.0.0', '-v, --version')
    .command('init <dir>', 'generate a new project')
    .parse(process.argv);
```
`commander` 提供了一种使用 node.js 来开发命令行的可能性。我们可以通过 commander 的 option 方法，来定义 commander 的选项，当然，这些定义的选项也会被作为该命令的帮助文档。

- `version`：用来定义版本号。commander 默认帮我们添加 -V, --version 选项。当然，我们也可以重设它。
- `command`：<> 代表必填，[] 代表选填。当 .command() 带有描述参数时，不能采用 .action(callback) 来处理子命令，否则会出错。这告诉 commander，你将采用单独的可执行文件作为子命令
- `parse`：解析 process.argv，解析完成后的数据会存放到 new Command().args 数组中。process.argv 里面存储内容如下：

2.在 bin 文件下创建 demo-init.js 文件，部分代码如下：


```
#!/usr/bin/env node

const shell = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const chalk=require('chalk');
const spinner = ora();

program.parse(process.argv);
let pwd=process.cwd();
// let dir = process.argv[1].split("/bin/mycli-init.js")[0];
// let dirs = process.argv[0]+"/mycli";

const questions = [{
    type: 'list',
    name: 'template',
    message: 'which template do you want to init?',
    choices: [ "Choice A", new inquirer.Separator(), "choice B" ]
},{
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: 'demo-static',
    
    validate: (name)=>{
        if(/^[a-z]+/.test(name)){
            return true;
        }else{
            return '项目名称必须以小写字母开头';
        }
    }
},{
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: '',
    validate: (name)=>{
        if(!name){
            return '项目描述为必填项';   
        }else{
            return true;
        }
       
    }  
}]

inquirer.prompt(questions).then((answers)=>{
    // 初始化模板文件
    downloadTemplate(answers);
})

function downloadTemplate(params){
    spinner.start('loading');
    // let isHasDir = fs.existsSync(path.resolve(dir));
    // if(isHasDir){
    //     spinner.fail('当前目录已存在!');
    //     return false;
    // }
    // 开始下载模板文件
    console.log( process.cwd())
    // download('github:fengye12/vue2.0-shopping', pwd,{clone:true},function(err){
        let url=""
        if(params.template=="Choice A" || "Choice B"){
            url='github:fengye12/vue2.0-shopping'
        }else{
            console.log(chalk.red('没有可执行的下载文件'));
            return false;
        }
        download(url,pwd,function(err){
        if(err){
            spinner.fail(err);
            spinner.stop('loading');
            console.log(chalk.red('下载失败'))   
           
        }else{
            spinner.stop('loading');
            console.log(chalk.green('下载成功'))   
            updateTemplateFile(params);
        };
       
        
    })
}

function updateTemplateFile(params){
    let { name, description } = params;
    fs.readFile(`${path.resolve(pwd)}/package.json`, (err, buffer)=>{
        if(err) {
            console.log(chalk.red(err));
            return false;
        }
        shell.rm('-f', `${path.resolve(pwd)}/.git`);
        // shell.rm('-f', `${path.resolve(dir)}/public/CHANGELOG.md`);
        let packageJson = JSON.parse(buffer);
        Object.assign(packageJson, params);
        fs.writeFileSync(`${path.resolve(pwd)}/package.json`, JSON.stringify(packageJson, null, 2));
        fs.writeFileSync(`${path.resolve(pwd)}/README.md`, `# ${name}\n> ${description}`);
        spinner.succeed('创建完毕');
    });
}
```
- `inquirer` 主要提供交互式命令的功能。validate 返回 true 代表输入值验证合法，如果返回任意字符串，则会替代默认的错误消息返回。
- 通过 Node 中 fs 模块来判断文件夹是否已存在
- `path.resolve` 方法用于将相对路径转为绝对路径。它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠。

### 开发完成，上传npm

`npm publish`


### 全局安装

```
cnpm i -g xxxx
```

```
找个文件夹执行
xxxx init 项目文件夹名称
```





.bin二进制文件,其用途依系统或应用而定。一种文件格式binary的缩写。一个后缀名为".bin"的文件,只是表明它是binary格式。

```
#!/usr/bin/env node

const program = require('commander');

program
    .version('1.0.0', '-v, --version')
    .command('init <dir>', 'generate a new project')
    .parse(process.argv);
```


