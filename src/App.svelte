<script lang="ts">
    import { Nav, Table, PertChart } from './components';
    import { graph } from './stores/graph.store';

    const graph3 = {
        A: {
            name: 'A',
            duration: 3,
            dependsOn: [0, 1],
            predecessors: [],
            successors: ['C', 'D'],
        },
        B: {
            name: 'B',
            duration: 7,
            dependsOn: [0, 2],
            predecessors: [],
            successors: ['E', 'G'],
        },
        C: {
            name: 'C',
            duration: 4,
            dependsOn: [1, 3],
            predecessors: ['A'],
            successors: ['H'],
        },
        D: {
            name: 'D',
            duration: 2,
            dependsOn: [1, 4],
            predecessors: ['A'],
            successors: ['F'],
        },
        E: {
            name: 'E',
            duration: 3,
            dependsOn: [2, 4],
            predecessors: ['B'],
            successors: ['F'],
        },
        F: {
            name: 'F',
            duration: 4,
            dependsOn: [4, 5],
            predecessors: ['D', 'E'],
            successors: ['I'],
        },
        G: {
            name: 'G',
            duration: 1,
            dependsOn: [2, 5],
            predecessors: ['B'],
            successors: ['I'],
        },
        H: {
            name: 'I',
            duration: 5,
            dependsOn: [3, 6],
            predecessors: ['C'],
            successors: [],
        },
        I: {
            name: 'I',
            duration: 3,
            dependsOn: [5, 6],
            predecessors: ['F', 'G'],
            successors: [],
        },
        // Dummy: {
        //     name: 'Dummy',
        //     duration: -1,
        //     dependsOn: [3, 5],
        //     predecessors: ['C'],
        //     successors: ['I'],
        // },
    };

    const graph2 = {
        A: {
            duration: 3,
            dependsOn: [0, 1],
            predecessors: [],
            successors: ['B', 'C'],
        },
        B: {
            duration: 4,
            dependsOn: [1, 2],
            predecessors: ['A'],
            successors: ['D'],
        },
        C: {
            duration: 6,
            dependsOn: [1, 3],
            predecessors: ['A'],
            successors: ['G', 'F'],
        },
        D: {
            duration: 7,
            dependsOn: [2, 4],
            predecessors: ['B'],
            successors: ['E'],
        },
        E: {
            duration: 1,
            dependsOn: [4, 6],
            predecessors: ['D'],
            successors: ['I'],
        },
        F: {
            duration: 2,
            dependsOn: [3, 6],
            predecessors: ['C'],
            successors: ['I'],
        },
        G: {
            duration: 3,
            dependsOn: [3, 5],
            predecessors: ['C'],
            successors: ['H'],
        },
        H: {
            duration: 4,
            dependsOn: [5, 6],
            predecessors: ['G'],
            successors: ['I'],
        },
        I: {
            duration: 1,
            dependsOn: [6, 7],
            predecessors: ['E', 'F', 'H'],
            successors: ['J'],
        },
        J: {
            duration: 2,
            dependsOn: [7, 8],
            predecessors: ['I'],
            successors: [],
        },
    };

    const nodeDependencies: number[] = [];
    const values = Object.values($graph);
    values.forEach((val) =>
        val.dependsOn.forEach((v) => nodeDependencies.push(v))
    );
    const max = Math.max(...nodeDependencies);

    const adjList = {};
    values.forEach((val) => {
        const a = val.dependsOn[0];
        adjList[a] = [];
    });
    values.forEach((val) => {
        const [a, b] = val.dependsOn;
        adjList[a].push(b);
    });

    interface Node {
        id: number;
        eft: number;
        lft: number;
        spare: number;
    }

    let nodes: Node[];
    nodes = Array.from(Array(max + 1), (_, id) => ({
        id,
        eft: 0, // early finish time
        lft: 0, // late finish time
        spare: 0,
    }));

    const criticalPath = [];

    const goForward = (graph) => {
        const paths = Object.keys(graph);

        paths.forEach((path) => {
            const { duration, dependsOn, predecessors } = graph[path];
            const [from, to] = dependsOn;

            if (predecessors.length > 1) {
                const pre = predecessors.map((pre) => graph[pre]);
                const max = pre.reduce((prev, current) => {
                    const nodeA = nodes[prev.dependsOn[0]];
                    const nodeB = nodes[current.dependsOn[0]];

                    // t(j)^0 = max{t(i)^0 + t(i-j), i < j}
                    return nodeA.eft + prev.duration >
                        nodeB.eft + current.duration
                        ? prev
                        : current;
                });

                const [start, end] = max.dependsOn;
                nodes[end].eft = nodes[start].eft + max.duration;
            }

            nodes[to].eft = nodes[from].eft + duration;

            // console.log(
            //     `${nodes[from].id}/${nodes[from].eft} ==${path}(${duration})==> ${nodes[to].id}/${nodes[to].eft}`
            // );
        });
    };

    const goBackward = (graph) => {
        const paths = Object.keys(graph);
        const lastItem = graph[paths[paths.length - 1]];
        const lastNode = nodes[lastItem.dependsOn[1]];
        lastNode.lft = lastNode.eft;

        paths
            .slice()
            .reverse()
            .forEach((path, i) => {
                const { duration, dependsOn, successors } = graph[path];
                const [from, to] = dependsOn;

                nodes[from].lft = nodes[to].lft - duration;
                nodes[from].spare = nodes[from].lft - nodes[from].eft;
                nodes[to].spare = nodes[to].lft - nodes[to].eft;

                if (successors.length > 1) {
                    const next = successors.map((next) => graph[next]);
                    const min = next.reduce((prev, current) => {
                        const nodeA = nodes[prev.dependsOn[0]];
                        const nodeB = nodes[current.dependsOn[0]];

                        // t(j)^1 = min{t(j)^1 - t(i-j), j < i}
                        return nodeA.spare > nodeB.spare ? current : prev;
                    });

                    const [start, end] = min.dependsOn;
                    nodes[start].lft = nodes[end].lft - min.duration;
                }

                // console.log(
                //     `${nodes[to].id}/${nodes[to].eft}/${nodes[to].lft}/${nodes[to].spare} ==${path}(${duration})==> ${nodes[from].id}/${nodes[from].eft}/${nodes[from].lft}/${nodes[from].spare}`
                // );
            });
    };

    const getWeightMap = () => {
        const map = [
            { 0: [{ to: 1, weight: 2 }] },
            { 1: [{ to: 1, weight: 2 }] },
        ];
    };

    const getCriticalPath = () => {
        const entry = Object.keys(graph)[0];
        const { successors } = graph[entry];
        const criticalPath = [];

        if (successors.length > 0) {
            const durations = successors.map((next) => graph[next].duration);
            const nextActivities = successors.map(
                (next) => graph[next].successors
            );

            const maxIndex = durations.indexOf(Math.max(...durations));
            const n = successors[maxIndex];
            console.log(successors, maxIndex, n);

            // return Object.keys(graph).find((key) => graph[key] === max);
        }
    };

    const paths = [[{}]];

    const getCrit = () => {
        const activities = Object.keys($graph);

        Object.entries(adjList).forEach(([a, b]: [string, number[]]) => {
            let id = '';
            let max = 0;

            b.forEach((e, i) => {
                const graphKey = activities[e];
                const { duration } = $graph[graphKey];

                if (duration > max) {
                    max = duration;
                    id = graphKey;
                }

                // console.log(paths[i]);
                // paths[i].push({ [graphKey]: duration });

                // console.log(`${a} => ${e}`);
            });
            // console.log(id, max);
        });

        // console.log(paths);
        // console.log(adjList);
    };

    function* dfs(first) {
        const visited = new Map();
        const visitList = [];

        visitList.push(first);

        while (visitList.length > 0) {
            // const node = visitList.shift();
            const node = visitList.slice(1);

            console.log(visited);

            if (node && !visited.has(node)) {
                yield node;
                visited.set(node, true);
                //node.getAdjacents().forEach((adj) => visitList.add(adj));
            }
        }
    }

    goForward($graph);
    goBackward($graph);
    getCrit();

    const result = dfs(nodes[0]);
    console.log(result.next().value);
    console.log(result.next().value);

    // getCriticalPath();

    // console.log(criticalPath);
</script>

<Nav />
<main class="container mx-auto">
    <PertChart {nodes} {adjList} />
    <Table />
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
