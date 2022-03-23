import Node from './node';

class Graph {
    nodes;
    adjList;

    constructor() {
        this.nodes = new Map();
        this.adjList = [];
    }

    goForward() {
        this.nodes.forEach((node) => {
            node.predecessors.forEach((pre) => {
                node.eft = pre.node.eft + pre.weight;

                if (node.predecessors.length > 1) {
                    const max = node.predecessors.reduce((prev, current) => {
                        // t(j)^0 = max{t(i)^0 + t(i-j), i < j}
                        return prev.node.eft + prev.weight >
                            current.node.eft + current.weight
                            ? prev
                            : current;
                    });

                    node.eft = max.node.eft + max.weight;
                }
            });
        });
    }

    goBackward() {
        this.adjList.forEach((adj, i) => {
            //
        });
    }

    addEdge(src, dst, weight, name) {
        const sourceNode = this.addVertex(src);
        const destinationNode = this.addVertex(dst);
        sourceNode.addAdjacent(destinationNode);

        this.adjList[src].push({ node: destinationNode, weight, name });
        this.nodes.get(dst).addPredecessor({ node: sourceNode, weight });

        return [sourceNode, destinationNode];
    }

    removeEdge(src, dst) {
        const sourceNode = this.nodes.get(src);
        const destinationNode = this.nodes.get(dst);

        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);
        }

        return [sourceNode, destinationNode];
    }

    addVertex(id) {
        if (this.nodes.has(id)) {
            return this.nodes.get(id);
        } else {
            const vertex = new Node(id);
            this.nodes.set(id, vertex);
            this.adjList[id] = [];
            return vertex;
        }
    }

    removeVertex(id) {
        const current = this.nodes.get(id);
        if (current) {
            for (const node of this.nodes.values()) {
                node.removeAdjacent(current);
            }
        }
        return this.nodes.delete(id);
    }

    addNode() {
        //
    }
}

export default Graph;
