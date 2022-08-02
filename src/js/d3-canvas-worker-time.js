importScripts("./d3-force-reuse.js")
importScripts("./d3.min.js")



onmessage = e => {

    let nodes = [];
    for (let i = 0; i < e.data.nodesCount; i++) {
        nodes.push({
            id: i, //这里的id = nodeInfoMap中的index = linkbuffer中的值。
            //所以这里绑定的时候link对应的起始点和终止点不会出错
        })
    }

    let links = [];
    let buffer = new Int32Array(e.data.linksBuffer)

    for (let i = 0; i < buffer.length / 2; i++) {
        links.push({
            source: buffer[i * 2],
            target: buffer[i * 2 + 1]
        })
    }

    let simulation = d3.forceSimulation(nodes)
        .force("manyBody", d3.forceManyBodyReuse())
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("center", d3.forceCenter(5000 / 2, 5000 / 2))
        .alphaMin(0.0228)
        .alphaDecay(0.01)
        .stop()

    let bufferNode = [];
    let time = [];
    while (simulation.alpha() > simulation.alphaMin()) {
        let a = new Date();
        bufferNode = [];
        nodes.forEach(e => {
            bufferNode.push(e.x, e.y)
        })
        simulation.tick();
        let b = new Date();
        time.push(b - a);
        postMessage({
            nodes: new Float32Array(bufferNode),
        }, [new Float32Array(bufferNode).buffer]);

    }

    if (simulation.alpha() <= simulation.alphaMin()) {
        //结束了通知主线程，已结束
        postMessage({
            nodes: new Float32Array(bufferNode),
            time: time
        }, [new Float32Array(bufferNode).buffer]);
    }

}