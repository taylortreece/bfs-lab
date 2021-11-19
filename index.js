function findNode(nodeName, vertices) {
    return vertices.find((vertex) => {
        return vertex.name == nodeName
    })
}

function findAdjacent(nodeName, vertices, edges){
    return edges.filter((edge) => {
        return edge.includes(nodeName)
    }).map((edge) => {
        return edge.filter((node) => {
            return (node != nodeName)
        })[0]
    }).map((name) => {
        return findNode(name, vertices)
    }).filter((node) => {
        return node.distance == null;
    })
}

function markDistanceAndPredecessor(predecessor, adjacentNodes) {
    adjacentNodes.map((node) => {
        node.distance = predecessor.distance + 1;
        node.predecessor = predecessor
    })
}

function bfs(startingNode, vertices, edges) {
    startingNode.distance = 0;
    let discovered = [startingNode];
    let discoverOrder = [startingNode];
    while(discovered.length != 0) {
        let currentNode = discovered.shift();
        let adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
        discoverOrder = discoverOrder.concat(adjacentNodes)
        markDistanceAndPredecessor(currentNode, adjacentNodes)
        discovered = discovered.concat(adjacentNodes)
    }
    return discoverOrder
}