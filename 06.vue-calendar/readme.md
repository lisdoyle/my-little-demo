# 思路
>例子地址：https://www.tuicool.com/articles/vmaiei2
https://www.jianshu.com/p/d8ce25e9badb


# 其它
## 1. arr.length = 0
>foo = [] 创建一个新的数组，并将对它的引用分配给变量。任何其他引用不受影响，但仍指向原始数组

>foo.length = 0 修改数组本身。如果通过不同的变量访问它，那么仍然可以获得修改后的数组

```js
var foo = [1,2,3];
var bar = [1,2,3];
var foo2 = foo;
var bar2 = bar;
foo = [];
bar.length = 0;
console.log(foo, bar, foo2, bar2); // [], [], [1, 2, 3], []
```