importScripts("./d3-force-reuse.js")
importScripts("https://d3js.org/d3.v5.min.js")

onmessage = e => {
    let nodes = e.data.nodes,
        links = e.data.links,
        setting = e.data.setting

    let width = setting.width,
        height = setting.height;

    let simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBodyReuse().strength(-80))
        .force("collide", d3.forceCollide().radius(function (d, i) {
            //碰撞避免，相当于把节点当作有半径的圆，设置碰撞半径，度大的点碰撞半径大
            if (d["core"] == 1)
                return 10;
            else {
                return 8;
            }
        }).strength(1))
        //设定forceX与forceY使得它们更加聚拢在中间位置
        .force("x", d3.forceX().strength(0.15))
        .force("y", d3.forceY().strength(0.15))
        .force("link", d3.forceLink(links).id(function (d) { return d.name; }).distance(50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .stop()


    let count = 0
    // 直接300次
    while (count<100) {
        simulation.tick();
        count += 1
        postMessage({
            type: "tick", nodes: nodes, links: links
        })

    }


    // //先算100次
    // while (simulation.alpha() > simulation.alphaMin() * 80) {
    //     simulation.tick();
    // }

    // while (simulation.alpha() > simulation.alphaMin()) {
    //     simulation.tick();
    //         count += 1
    //         if (count % 2== 0) {
    //             postMessage({
    //                 type: "tick", nodes: nodes, links: links
    //             })
    //         }
    // }


    // //结束了通知主线程，已结束
    // postMessage({
    //     type: "end", nodes: nodes, links: links
    // });

    //边布局边渲染100次
    while (simulation.alpha() > simulation.alphaMin() * 80) {
        simulation.tick();
        postMessage({
            type: "tick", nodes: nodes, links: links
        })
    }
    postMessage({
        type: "end", nodes: nodes, links: links
    });
}


