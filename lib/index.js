const fs = require('fs');
const path = require('path');

class getFile {
    constructor(root,suffix) {
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
        const dir = opation.root ||  this.root;

        return this.hasFile(dir).then(stats => {
            if (stats.isDirectory()) {
              // 如果是目录的话，则递归
                const result = this.getDir(dir).then(list =>
                    Promise.all(list.map(item =>
                        this.getResult({
                            root: path.resolve(dir, item)
                        })
                    ))
                );

                return opation.callback ?
                    result.then(()=>opation.callback(this.arr) )
                    : result;

            } else {
                // 如果不是目录
                if (dir.indexOf(`.${this.suffix}`) >= 0) {
                    this.arr.push(dir);
                }
            }
        })
    }
}
module.exports = getFile;
