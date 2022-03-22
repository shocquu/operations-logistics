class Node {
    id;
    eft: 0; // early finish time
    lft: 0; // late finish time
    spare: 0;
    adjList: number[];

    constructor(id, eft, lft, spare) {
        this.id = id;
        this.eft = eft;
        this.lft = lft;
        this.spare = spare;
        this.adjList = [];
    }
}

export default Node;
