import Node from './node';

class Graph {
    nodes;
    graph;

    constructor(duration, predecessors) {
        //
    }
}

Graph.UNDIRECTED = Symbol('directed graph'); // two-ways edges
Graph.DIRECTED = Symbol('undirected graph'); // one-way edges

export default Graph;
