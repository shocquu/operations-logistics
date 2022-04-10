<script>
    import { onMount } from 'svelte';
    import moment from 'moment';
    import {
        SvelteGantt,
        SvelteGanttDependencies,
        SvelteGanttTable,
        SvelteGanttExternal,
        MomentSvelteGanttDateAdapter,
    } from 'svelte-gantt';
    import { graphStore } from '../stores/graph.store';

    const time = (input) => moment(input, 'HH');

    const currentStart = time('1');
    const currentEnd = time('10');

    const data = {
        rows: [
            {
                id: 1,
                label: 'A',
            },
            {
                id: 2,
                label: 'B',
            },
            {
                id: 3,
                label: 'C',
            },
            {
                id: 4,
                label: 'D',
            },
            {
                id: 5,
                label: 'E',
            },
            {
                id: 6,
                label: 'F',
            },
            {
                id: 7,
                label: 'G',
            },
            {
                id: 8,
                label: 'H',
            },
            {
                id: 9,
                label: 'I',
            },
        ],
        tasks: [
            {
                id: 1,
                resourceId: 1,
                label: ' ',
                from: time('0'),
                to: time('3'),
                // classes: 'orange',
            },
            {
                id: 2,
                resourceId: 2,
                label: ' ',
                from: time('0'),
                to: time('7'),
                // classes: 'orange',
            },
            {
                id: 3,
                resourceId: 3,
                label: ' ',
                from: time('3'),
                to: time('7'),
                // classes: 'green',
            },
            {
                id: 4,
                resourceId: 4,
                label: ' ',
                from: time('3'),
                to: time('5'),
                // classes: 'blue',
            },
            {
                id: 5,
                resourceId: 5,
                label: ' ',
                from: time('7'),
                to: time('10'),
                // classes: 'blue',
            },
            {
                id: 6,
                resourceId: 6,
                label: ' ',
                from: time('10'),
                to: time('14'),
                classes: 'blue',
            },
            {
                id: 7,
                resourceId: 7,
                label: ' ',
                from: time('7'),
                to: time('8'),
                // classes: 'green',
            },
            {
                id: 8,
                resourceId: 8,
                label: ' ',
                from: time('7'),
                to: time('12'),
                // classes: 'orange',
            },
            {
                id: 9,
                resourceId: 9,
                label: ' ',
                from: time('14'),
                to: time('17'),
                // classes: 'orange',
            },
        ],
        dependencies: [
            // {
            //     id: 1,
            //     fromId: 1,
            //     toId: 3,
            // },
            // {
            //     id: 2,
            //     fromId: 1,
            //     toId: 4,
            // },
            // {
            //     id: 3,
            //     fromId: 2,
            //     toId: 5,
            // },
            // {
            //     id: 4,
            //     fromId: 4,
            //     toId: 6,
            // },
            // {
            //     id: 5,
            //     fromId: 5,
            //     toId: 6,
            // },
            // {
            //     id: 6,
            //     fromId: 2,
            //     toId: 7,
            // },
            // {
            //     id: 7,
            //     fromId: 7,
            //     toId: 9,
            // },
            // {
            //     id: 8,
            //     fromId: 8,
            //     toId: 9,
            // },
        ],
    };

    let gantt;
    let ganttChart;
    const options = {
        dateAdapter: new MomentSvelteGanttDateAdapter(moment),
        // rows: data.rows,
        rows: [],
        // tasks: data.tasks,
        tasks: [],
        // dependencies: data.dependencies,
        dependencies: [],
        timeRanges: [],
        columnOffset: 60,
        magnetOffset: 60,
        rowHeight: 42,
        rowPadding: 6,
        headers: [{ unit: 'hour', format: 'H' }],
        fitWidth: true,
        minWidth: 400,
        from: currentStart,
        to: currentEnd,
        tableHeaders: [
            { title: 'Activity', property: 'label', width: 60, type: 'tree' },
        ],
        tableWidth: 60,
        ganttTableModules: [SvelteGanttTable],
        ganttBodyModules: [SvelteGanttDependencies],
    };

    const addRows = () => {
        const rows = [];
        const iid = $graphStore.getAdjacentsList.length - 1;

        $graphStore.getAdjacentsList.forEach((adj) => {
            adj.forEach(({ node, name }, i) => {
                if (name) {
                    rows.push({
                        id: node.id,
                        label: name,
                    });
                }
            });
        });

        options.rows = rows;
        if (gantt) {
            gantt.$set(options);
        }
    };

    const addTasks = () => {
        const tasks = [];
        const iid = $graphStore.getAdjacentsList.length - 1;

        $graphStore.getAdjacentsList.forEach((adj) => {
            adj.forEach((a) => {
                tasks.push({
                    id: a.node.id,
                    resourceId: a.node.id,
                    label: ' ',
                    from: time((a.node.predecessors[0].node.id + 1).toString()),
                    to: time(
                        (
                            a.node.predecessors[0].node.id +
                            1 +
                            a.weight
                        ).toString()
                    ),
                    classes: '!bg-blue-600',
                    enableDragging: false,
                });
            });
        });

        options.tasks = tasks;
        if (gantt) {
            gantt.$set(options);
        }
    };

    const updateChart = async () => {
        await addRows();
        await addTasks();
    };

    $: $graphStore && updateChart();

    onMount(() => {
        window.gantt = gantt = new SvelteGantt({
            target: ganttChart,
            props: options,
        });
    });
</script>

<div class="overflow-x-auto shadow-md sm:rounded-lg bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">Gantt Chart</h1>
    <div class="flex flex-1 overflow-auto">
        <div
            class="flex flex-1 overflow-auto m-4 border-1 border-gray-100 border-solid"
            bind:this={ganttChart}
        />
    </div>
</div>
