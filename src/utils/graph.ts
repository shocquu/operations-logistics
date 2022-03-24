import Node from './node';

class Graph {
    nodes;
    adjList;

    constructor() {
        this.nodes = new Map();
        this.adjList = [];
    }

    get getNodes() {
        return this.nodes;
    }

    get getAdjacentsList() {
        return this.adjList;
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
        const lastNode = this.nodes.get(this.nodes.size - 1);
        lastNode.lft = lastNode.eft;

        for (let i = this.nodes.size - 1; i >= 0; i--) {
            const node = this.nodes.get(i);
            const nodeAdjacents = node.getAdjacents;

            if (nodeAdjacents.length > 1) {
                const min = nodeAdjacents.reduce((prev, current) => {
                    // t(j)^1 = min{t(j)^1 - t(i-j), j < i}
                    return prev.node.lft - prev.weight <
                        current.node.lft - current.weight
                        ? prev
                        : current;
                });

                node.lft = min.node.lft - min.weight;
            }

            node.predecessors.forEach((pre) => {
                pre.node.lft = node.lft - pre.weight;
                node.spare = node.lft - node.eft;
            });
        }
    }

    *findCriticalPath() {
        const visited = new Map();
        const criticalPath = [];
        const firstList = this.adjList[0];

        const firstNode = firstList.reduce((prev, current) => {
            return prev.node.lft - prev.weight <
                current.node.lft - current.weight
                ? prev
                : current;
        });

        criticalPath.push(firstNode);

        while (criticalPath.length > 0) {
            const nextNode = criticalPath.pop();

            if (nextNode && !visited.has(nextNode)) {
                yield nextNode;
                visited.set(nextNode, true);

                const proceed = nextNode.node.getAdjacents.length > 0;
                const next =
                    proceed &&
                    nextNode.node.getAdjacents.reduce((prev, current) => {
                        return prev.node.lft - prev.weight <
                            current.node.lft - current.weight
                            ? prev
                            : current;
                    });

                criticalPath.push(next);
            }
        }
    }

    addEdge(src: number, dst: number, weight: number, name: string) {
        const sourceNode = this.addVertex(src);
        const destinationNode = this.addVertex(dst);

        sourceNode.addAdjacent({ node: destinationNode, weight, name });
        destinationNode.addPredecessor({ node: sourceNode, weight, name });

        this.adjList[src].push({ node: destinationNode, weight, name });

        return [sourceNode, destinationNode];
    }

    removeEdge(src: number, dst: number) {
        const sourceNode = this.nodes.get(src);
        const destinationNode = this.nodes.get(dst);

        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);
        }

        return [sourceNode, destinationNode];
    }

    addVertex(id: number) {
        if (this.nodes.has(id)) {
            return this.nodes.get(id);
        } else {
            const vertex = new Node(id);
            this.nodes.set(id, vertex);
            this.adjList[id] = [];
            return vertex;
        }
    }

    removeVertex(id: number) {
        const current = this.nodes.get(id);
        if (current) {
            for (const node of this.nodes.values()) {
                node.removeAdjacent(current);
            }
        }
        return this.nodes.delete(id);
    }
}

export default Graph;
