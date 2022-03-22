import Node from './node';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class Graph {
    duration;
    dependsOn = [];
    predecessors = [];
    successors = [];
    map: {};

    static _letter: any;

    constructor(map) {
        this.map = map;
    }

    goForward() {
        //
    }

    addEdge(duration, predecessors) {
        const activity = Graph.counter;
        this.map[activity] = {};
    }

    addNode() {
        //
    }

    static get counter() {
        Graph._letter = alphabet[(Graph._letter || 0) + 1];
        return Graph._letter;
    }
}

export default Graph;
