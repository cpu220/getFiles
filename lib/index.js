const fs = require('fs');
const path = require('path');

class getFile {
    constructor(root, suffix) {
        this.root = root;
        this.arr = [];
        this.suffix = suffix;
    }
    // 获取指定目录下的文件
    getDir(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, list) => {
                if (err) {
                    reject(err);
                }
                resolve(list);
            });
        });
    }
    // 判断目录下是否有文件
    hasFile(dir) {
        return new Promise((resolve, reject) => {
            fs.stat(dir, (err, stats) => {
                if (err) {
                    reject(err);
                }
                resolve(stats);
            })
        });
    }
    // 获取结果
    getResult(opation) {
        // const _this = this;
        const dir = opation.root || this.root;
        const suffix = opation.suffix || this.suffix;

        return this.hasFile(dir).then(stats => {
            if (stats.isDirectory()) {
                // 如果是目录的话，则递归
                const result = this.getDir(dir).then(list =>
                    Promise.all(list.map(item =>
                        this.getResult({
                            root: dir,
                            suffix: suffix,
                            root: path.resolve(dir, item)
                        })
                    ))
                );

                return opation.callback ?
                    result.then(() => opation.callback(this.arr)) :
                    result;

            } else {
                // 如果不是目录
                // if (dir.split('.').pop() === suffix) {
                //     this.arr.push(dir);
                // }
                if (this.judgeSuffix(dir, suffix)) {
                    this.arr.push(dir);
                }
            }
        })
    }
    judgeSuffix(dir, suffix) {
        if (Object.prototype.toString.call(suffix) === '[object Array]') {
            for (var item of suffix) {
                if (dir.split('.').pop() === item) {
                    return true;
                }
            }
        } else if (Object.prototype.toString.call(suffix) === '[object String]') {
            if (dir.split('.').pop() === suffix) {
                return true;
            }
        }
    }
}

// const A = new getFile('demo','js');
//
// A.getResult({
//     callback: function(arr){
//       console.log(arr)
//     }
// });

module.exports = getFile;
