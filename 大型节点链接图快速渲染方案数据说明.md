# 大型节点链接图快速渲染方案代码说明

### 大型实验平台

![image-20220803155805976](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202208031558044.png)

- 见timeTest.html

### Canvas

- 直接把d3默认用svg渲染改为用canvas渲染
  - d3-canvas.html
- 测试canvas中，对所有节点坐标取整与不取整对提升布局效率有没有帮助【布局一次渲染一次】
  - canvas 持续迭代-不取整.html
  - canvas 持续迭代-取整.html
- 测试canvas中，对所有节点坐标取整与不取整对提升布局效率有没有帮助【布局结束后渲染一次】
  - canvas renderonce-不取整.html
  - canvas renderonce-取整.html
- 测试Web worker对canvas渲染的效率提升
  - canvasWorker_测时间.html
  - d3-canvas-worker.html
- 改进Webworker，使用**transfer**的方式
  - d3-canvas-worker-transfer.html
- 在transfer基础上，使用离屏渲染方式
  - d3-canvas-worker-offscreen.html
- 在transfer基础上，使用tween.js做补间动画【效果一般】
  - d3-canvas-worker-tween

### SVG

- 测试svg中，对所有节点坐标取整与不取整对提升布局效率有没有帮助【布局一次渲染一次】
  - svgWorker-迭代一次渲染一次.html
- 测试Web worker对svg渲染的效率提升
  - svgWorker.html
- 布局全部结束后，渲染一次
  - svg-renderonce.html
- 取整测试
  - svgLayout-取整测试