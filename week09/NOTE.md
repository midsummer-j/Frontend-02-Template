### TicTacToe 代码实现 TicTacToe.html
### async 代码实现红绿灯 async.html
### 寻路 代码实现 pathfinding.html

```
console.log(async function (){return 4}()) //Promise {<resolved>: 4}

console.log(function () {
	return new Promise((resolve, reject) => {
		resolve(4)
	});
}());//Promise {<resolved>: 4}
```

### async/await
* async function 是 Promise 的语法糖封装
* 异步编程的终极方案 – 以同步的方式写异步
  * await 关键字可以“暂停”async function的执行
  * await 关键字可以以同步的写法获取 Promise 的执行结果
  * try-catch 可以获取 await 所得到的错误
* 一个穿越事件循环存在的 function

```
(async function () {
	try {
		await interview(1);
		await interview(2);
		await interview(3);
		//并行异步任务
		// await Promise.all([interview(1), interview(2), interview(3)])
	} catch (error) {
		return console.log('第', error.round, '轮面试失败！！');;
	}
	console.log('面试成功');
})()

function interview(round) {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			if (Math.random() < 0.2) {//面试失败
				var error = new Error('no')
				error.round = round;
				reject(error)
			} else {
				resolve(round)
			}
		}, 500);
	});;
}
```

### 启发式搜索算法
启发式算法（heuristic algorithm)是相对于最优化算法提出的。一个问题的最优算法求得该问题每个实例的最优解。启发式算法可以这样定义：一个基于直观或经验构造的算法，在可接受的花费（指计算时间和空间）下给出待解决组合优化问题每一个实例的一个可行解，该可行解与最优解的偏离程度一般不能被预计。现阶段，启发式算法以仿自然体算法为主，主要有蚁群算法、模拟退火法、神经网络等。

### [二叉堆](https://www.cnblogs.com/kubidemanong/p/9711705.html "二叉堆")
https://www.cnblogs.com/kubidemanong/p/9711705.html

### 问题描述：判断一个整数 n 是否为 2 的幂次方

```
function isPow(n){
	return (n&(n-1)) === 0
}
```