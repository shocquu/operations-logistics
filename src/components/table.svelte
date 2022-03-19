<script lang="ts">
    interface Data {
        activity: string;
        duration: number;
        predecessors: string[];
    }

    interface Node {
        id: number;
        ect: number; // earliest completion time
        lct: number; // latest completion time
        spare: number;
    }

    const nodes: Node[] = [
        { id: 2, ect: 3, lct: 3, spare: 0 },
        { id: 3, ect: 7, lct: 8, spare: 1 },
        { id: 4, ect: 9, lct: 9, spare: 0 },
        { id: 5, ect: 14, lct: 15, spare: 1 },
        { id: 6, ect: 16, lct: 16, spare: 0 },
        { id: 7, ect: 12, lct: 12, spare: 0 },
        { id: 8, ect: 17, lct: 17, spare: 0 },
        { id: 9, ect: 19, lct: 19, spare: 0 },
    ];

    const node: Node = { id: 0, ect: 0, lct: 0, spare: 0 };

    const data2 = [
        {
            activity: { A: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 3,
            predecessors: [],
        },
        {
            activity: { B: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 4,
            predecessors: ['A'],
        },
        {
            activity: { C: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 6,
            predecessors: ['A'],
        },
        {
            activity: { D: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 7,
            predecessors: ['B'],
        },
        {
            activity: { E: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 1,
            predecessors: ['D', 'C', 'G'],
        },
        {
            activity: { F: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 1,
            predecessors: ['E'],
        },
        {
            activity: { G: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 2,
            predecessors: ['F'],
        },
    ];

    const data1 = [
        {
            activity: 'A',
            duration: 3,
            predecessors: [],
        },
        {
            activity: 'B',
            duration: 4,
            predecessors: ['A'],
        },
        {
            activity: 'C',
            duration: 6,
            predecessors: ['A'],
        },
        {
            activity: 'D',
            duration: 7,
            predecessors: ['B'],
        },
        {
            activity: 'E',
            duration: 1,
            predecessors: ['D', 'C', 'G'],
        },
        {
            activity: 'F',
            duration: 1,
            predecessors: ['E'],
        },
        {
            activity: 'G',
            duration: 2,
            predecessors: ['F'],
        },
    ];

    const data3 = [
        {
            activity: 'A',
            duration: 3,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'B',
            duration: 4,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'C',
            duration: 6,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'D',
            duration: 7,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'E',
            duration: 1,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'F',
            duration: 2,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'A',
            duration: 3,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'A',
            duration: 3,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'A',
            duration: 3,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
        {
            activity: 'A',
            duration: 3,
            nodes: [
                { id: 0, ect: 0, lct: 0, spare: 0 },
                { id: 0, ect: 0, lct: 0, spare: 0 },
            ],
        },
    ];

    data3.map((node) => {
        //
    });

    const data = [
        {
            activity: { A: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 0,
            predecessors: [],
        },
        {
            activity: { B: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 4,
            predecessors: ['A'],
        },
        {
            activity: { C: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 6,
            predecessors: ['A'],
        },
        {
            activity: { D: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 7,
            predecessors: ['B'],
        },
        {
            activity: { E: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 1,
            predecessors: ['D', 'C', 'G'],
        },
        {
            activity: { F: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 1,
            predecessors: ['E'],
        },
        {
            activity: { G: { id: 0, ect: 0, lct: 0, spare: 0 } },
            duration: 2,
            predecessors: ['F'],
        },
    ];

    const hm = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9 };

    const hashMap = {
        A: { id: 1, ect: 0, lct: 0, spare: 0 },
        B: { id: 2, ect: 0, lct: 0, spare: 0 },
        C: { id: 3, ect: 0, lct: 0, spare: 0 },
        D: { id: 4, ect: 0, lct: 0, spare: 0 },
        E: { id: 5, ect: 0, lct: 0, spare: 0 },
        F: { id: 6, ect: 0, lct: 0, spare: 0 },
        G: { id: 7, ect: 0, lct: 0, spare: 0 },
        H: { id: 8, ect: 0, lct: 0, spare: 0 },
    };

    // const result = data2.map((a, i) => {
    //     const duration = a.duration;
    //     const predecessors = a.predecessors;
    //     const key = Object.keys(a.activity)[0];
    //     //const key = a.activity;
    //     let { id, ect, lct, spare } = a.activity[key];

    //     id = i + 2;
    //     //ect = duration;
    //     ect = duration;

    //     if (predecessors.length > 1) {
    //         const ects = predecessors.map((pre) => data[hm[pre]]);
    //         // const max = Math.max(...ects);
    //         // const appendKey = ects.indexOf(max);

    //         console.log(key, ects);

    //         // console.log(
    //         //     ` => ${key}: ${id} ${hashMap[key].ect} ${lct} ${spare}`
    //         // );
    //     } else {
    //         console.log(`- => ${key}: ${id} ${ect} ${lct} ${spare}`);
    //     }
    // });
</script>

<div class="table w-full">
    <div class="table-header-group">
        <div class="table-row">
            <div class="table-cell text-center">Activity</div>
            <div class="table-cell text-center">Duration</div>
            <div class="table-cell text-center">Immediate Predecessor(s)</div>
        </div>
    </div>
    <div class="table-row-group">
        {#each data as { activity, duration, predecessors }}
            <div class="table-row">
                <div class="table-cell">
                    {activity}
                </div>
                <div class="table-cell">{duration}</div>
                <div class="table-cell">
                    {predecessors.length > 0 ? predecessors.join(', ') : '-'}
                </div>
            </div>
        {/each}
    </div>
</div>
