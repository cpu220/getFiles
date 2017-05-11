### 说明
利用promise简单实现了异步获取指定目录下，指定文件的功能

``` javascript

const getFile = require('./app/getFile');

const A = new getFile('demo','js');

A.getResult({
    callback: function(arr){
      console.log(arr)
    }
});

```
