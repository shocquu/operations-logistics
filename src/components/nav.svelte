<script lang="ts">
    // const nodes = [
    //     { id: 1, ect: 0, lct: 0, spare: 0 },
    //     { id: 2, ect: 0, lct: 0, spare: 0 },
    // ];

    const graph = {
        A: { duration: 3, ids: [1, 2], predecessors: [] },
        B: { duration: 4, ids: [2, 3], predecessors: ['A'] },
        C: { duration: 6, ids: [2, 4], predecessors: ['A'] },
        D: { duration: 7, ids: [3, 5], predecessors: ['B'] },
        E: { duration: 1, ids: [5, 7], predecessors: ['D'] },
        F: { duration: 2, ids: [4, 7], predecessors: ['C'] },
        G: { duration: 3, ids: [4, 6], predecessors: ['C'] },
        H: { duration: 1, ids: [6, 7], predecessors: ['G'] },
        I: { duration: 1, ids: [7, 8], predecessors: ['E', 'F', 'H'] },
        J: { duration: 2, ids: [8, 9], predecessors: ['I'] },
    };

    const values = Object.values(graph);
    const nodeIds = [];
    values.forEach((val) =>
        val.ids.forEach((v) => {
            nodeIds.push(v);
        })
    );
    const max = Math.max(...nodeIds);

    // index 0 is dummy
    const nodes = Array.from(Array(max + 1), (_, i) => ({
        id: i,
        ect: 0,
        lct: 0,
        spare: 0,
    }));

    const paths = Object.keys(graph);

    paths.forEach((path) => {
        const { duration, ids, predecessors } = graph[path];
        const [a, b] = ids;

        // const durations = predecessors.map((pre) => graph[pre].duration);
        // const max = Math.max(...durations);
        // const index = predecessors.indexOf(max);

        // const res = Math.max.apply(
        //     Math,
        //     predecessors.map(function (o) {
        //         return graph[o].duration;
        //     })
        // );

        if (predecessors.length > 1) {
            const pre = predecessors.map((pre) => graph[pre]);
            const max = pre.reduce((prev, current) =>
                prev.duration > current.duration ? prev : current
            );
            const [start, end] = max.ids;
            nodes[end].ect = nodes[start].ect + max.duration;
            console.log(start, end);
        } else {
            const [start, end] = ids;
            nodes[end].ect = nodes[start].ect + duration;
            // console.log(ids);
        }
        // const maxi = pre.reduce((prev, current) =>
        //     prev.duration > current.duration ? prev : current
        // );
        // const maxi = durations.reduce((prev, current) =>
        //     prev.y > current.y ? prev : current
        // );

        // console.log(maxi);

        // console.log(
        //     `${nodes[a].id}/${nodes[a].ect} ==${path}(${duration})==> ${nodes[b].id}/${nodes[b].ect}`
        // );
    });

    const activities = [
        {
            activity: 'A',
            duration: 3,
            predecessors: [],
            from: 1,
            to: 2,
        },
        {
            activity: 'B',
            duration: 4,
            predecessors: ['A'],
            from: 2,
            to: 3,
        },
        {
            activity: 'C',
            duration: 6,
            predecessors: ['A'],
            from: 2,
            to: 4,
        },
        {
            activity: 'D',
            duration: 7,
            predecessors: ['B'],
            from: 3,
            to: 5,
        },
        {
            activity: 'E',
            duration: 1,
            predecessors: ['D'],
            from: 5,
            to: 6,
        },
        {
            activity: 'F',
            duration: 2,
            predecessors: ['C'],
            from: 4,
            to: 6,
        },
        {
            activity: 'G',
            duration: 3,
            predecessors: ['C'],
            from: 4,
            to: 7,
        },
        {
            activity: 'H',
            duration: 3,
            predecessors: ['G'],
            from: 7,
            to: 6,
        },
        {
            activity: 'I',
            duration: 1,
            predecessors: ['E', 'F', 'H'],
            from: 6,
            to: 8,
        },
        {
            activity: 'J',
            duration: 2,
            predecessors: ['I'],
            from: 8,
            to: 9,
        },
    ];

    activities.map(({ activity, duration, predecessors, from, to }) => {
        // nodes[to].ect = nodes[from].ect + duration;
        // console.log(
        //     `${from}/${nodes[from].ect} ==${activity}(${duration})==> ${to}/${nodes[to].ect}`
        // );
    });
</script>

<ul
    class="flex flex-wrap justify-center border-b border-gray-200 dark:border-gray-700 max-w-xl mx-auto my-5"
>
    <li class="mr-2">
        <a
            href="/cpm"
            aria-current="page"
            class="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >Critical Path Method</a
        >
    </li>
    <li class="mr-2">
        <a
            href="/tp"
            class="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >Transportation Problem</a
        >
    </li>
</ul>
