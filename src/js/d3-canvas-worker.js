importScripts("./d3-force-reuse.js")
importScripts("https://d3js.org/d3.v5.min.js")

onmessage = e => {
    let nodes = e.data.nodes,
        links = e.data.links

    let simulation = d3.forceSimulation(nodes)
        .force("manyBody", d3.forceManyBodyReuse())
        .force("link", d3.forceLink(links).id(d => d.name))
        .force("center", d3.forceCenter(5000 / 2, 5000 / 2))
        .alphaMin(0.0228)
        .alphaDecay(0.01)
        .stop()


    while (simulation.alpha() > simulation.alphaMin()) {
        simulation.tick();
        let start = new Date();
        postMessage({
            type: 1, nodes: nodes, links: links,start:start
        })
    }

    if (simulation.alpha() < simulation.alphaMin()) {
        //结束了通知主线程，已结束
        postMessage({
            type: 0, nodes: nodes, links: links
        });

    }

}


