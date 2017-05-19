### 说明
利用promise简单实现了异步获取指定目录下，指定文件的功能

## 用法1

``` javascript

const getFile = require('getFiles');

const A = new getFile('demo','js');

A.getResult({
    callback: function(arr){
      console.log(arr)
    }
});

```


## 用法2

``` javascript

const getFile = require('getFiles');

const A = new getFile('demo');

A.getResult({
    suffix:['js','css'],
    callback: function(arr){
      console.log(arr)
    }
});

```

## 用法3

``` javascript

const getFile = require('getFiles');

const A = new getFile();

A.getResult({
    root:'demo',
    suffix:['js','css'],
    callback: function(arr){
      console.log(arr)
    }
});

```

简单地说，可以构建实例的时候就确定参数，也可以构建一个实例，在调用的时候在传参。已getResult入参为准
