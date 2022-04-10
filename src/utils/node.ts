class Node {
    id;
    eft; // early finish time
    lft; // late finish time
    spare;
    adjList;
    predecessors;

    constructor(id) {
        this.id = id;
        this.eft = 0;
        this.lft = 0;
        this.spare = 0;
        this.adjList = [];
        this.predecessors = [];
    }

    get getAdjacents() {
        return this.adjList;
    }

    get getPredecessors() {
        return this.predecessors;
    }

    addPredecessor(node) {
        this.predecessors.push(node);
    }

    addAdjacent(node) {
        this.adjList.push(node);
    }

    removeAdjacent(node) {
        const nodes = this.adjList.map((adj) => adj.node);
        const index = nodes.indexOf(node);

        if (index > -1) {
            this.adjList.splice(index, 1);
            console.log(this.adjList);
            return node;
        }
    }

    isAdjacent(node) {
        return this.adjList.indexOf(node) > -1;
    }
}

export default Node;
