type TTimerCallback = (...arg: any[]) => void;
/**
 * 1. 动态补偿时间差（系统时间比对法）
 * 通过记录开始时间，每次执行时获取当前时间（建议使用 performance.now()），
 * 计算出实际已经过去的时间，然后动态调整下一次的延迟时间。
 * 这可以防止误差累积。
 */

function createAccurateTimer(callback: TTimerCallback, interval: number) {
  let expected = performance.now() + interval;
  let timeoutId: number | null = null;

  function step() {
    const now = performance.now();
    // 计算当前的误差
    const drift = now - expected;

    // 执行回调
    callback();

    // 重新计算下一次的目标时间，并减去误差
    expected += interval;
    const nextInterval = Math.max(0, interval - drift);

    timeoutId = setTimeout(step, nextInterval);
  }

  timeoutId = setTimeout(step, interval);

  return function stop() {
    typeof timeoutId === 'number' && clearTimeout(timeoutId);
  };
}

// 使用示例：每 1000ms 打印一次
const stopTimer = createAccurateTimer(() => {
  console.log("Tick:", new Date().toISOString());
}, 1000);

// 
/**1. 停止计时器：stopTimer()
 * 2. 使用 Web Worker (解决后台节流和主线程阻塞)
 * 将计时器放入 Web Worker 中执行。Web Worker 运行在独立的线程中，不会受到主线程 UI 渲染或复杂计算的阻塞，并且在大多数浏览器中，后台标签页的 Worker 不会被严重节流。
 */

// worker.js:
// Worker 内部的代码
let timerId: number | null = null;

self.onmessage = function (e) {
  if (e.data === 'start') {
    timerId = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if (e.data === 'stop') {
    typeof timerId === 'number' && clearInterval(timerId);
    timerId = null;
  }
};
// 主线程调用:
const worker = new Worker('worker.js');

worker.onmessage = function (e) {
  if (e.data === 'tick') {
    console.log('准确的滴答:', new Date().toISOString());
    // 在这里执行你需要精确定时的逻辑
  }
};

// 启动计时
worker.postMessage('start');

// 停止计时
// worker.postMessage('stop');
/**
 * 注：如果你不能创建额外的文件，也可以使用 Blob 动态创建一个内联的 Web Worker。
 */

/**1
 * 3. 使用 requestAnimationFrame (主要用于动画和UI渲染)
如果你的计时器是为了驱动动画或者更新 UI，使用 requestAnimationFrame 是最好的选择。它会在浏览器下一次重绘之前执行，并且频率与显示器的刷新率同步（通常是 60Hz，即大约 16.67ms 一次）。
 */

function startRafTimer(callback: TTimerCallback, interval: number) {
  let startTime = performance.now();
  let rafId: number | null = null;

  function loop(currentTime: number) {
    if (currentTime - startTime >= interval) {
      callback();
      // 补偿：只加上 interval，避免误差累积
      startTime += interval;
    }
    rafId = requestAnimationFrame(loop);
  }

  rafId = requestAnimationFrame(loop);

  return function stop() {
    typeof rafId === 'number' && cancelAnimationFrame(rafId);
  };
}

/**
 * 总结建议：
  普通倒计时 / 秒表： 使用动态补偿时间差（方法 1）。
  需要在后台标签页保持精确运行（如倒计时必须严格走秒）： 结合 Web Worker（方法 2） 或在页面切回前台时根据本地时间重新计算进度。
  游戏循环或 UI 动画： 使用 requestAnimationFrame（方法 3）。
 * 
 */
