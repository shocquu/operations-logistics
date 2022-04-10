<script lang="ts">
    import LeaderLine from 'leader-line';
    import { onDestroy } from 'svelte';
    import { graphStore } from '../stores/graph.store';

    const nodesIds = [];
    let nodes = [];

    const unsubscribe = graphStore.subscribe(() => {
        const adjList = $graphStore.getAdjacentsList;
        nodes = [...$graphStore.getNodes.values()];
        Object.entries(adjList).forEach(([start, adj]: [string, any[]]) => {
            nodesIds.push(start);
            adj.forEach(({ node, weight, name }) => {
                const end = node.id;
                // console.log(start, end, nodesIds[start], nodesIds[end]);
                // new LeaderLine(nodesIds[start], nodesIds[end], {
                //     color: '#0064c8',
                //     endLabel: `${name} (${weight})`,
                //     // dash: true, // for dummy lines
                // });
            });
        });
        // console.log(nodesIds);
        // Object.entries(adjList).forEach(([a, b]: [string, number[]]) => {
        //     const activities = Object.keys($graphStore);
        //     const label = activities[a];
        //     const { duration } = $graphStore[label];
        //     nodeIds.push(a);
        //     b.forEach((end) => {
        //         new LeaderLine(nodeIds[a], nodeIds[end], {
        //             color: '#0064c8',
        //             endLabel: `${label} (${duration})`,
        //             // dash: true, // for dummy lines
        //         });
        //     });
        // });
    });

    onDestroy(unsubscribe);
</script>

<div class="overflow-x-auto shadow-md sm:rounded-lg bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">PERT Chart</h1>
    <div class="flex gap-10 p-4 items-center">
        <div class="flex gap-6 items-center">
            <section
                class="w-16 h-16 grid grid-rows-2 grid-flow-col gap-px border-1 border-white rounded-full bg-black text-center leading-7 rotate-45 font-bold select-none"
            >
                <article class="bg-white">
                    <p class="-rotate-45 -translate-y-px -translate-x-px">ID</p>
                </article>
                <article class="bg-white">
                    <p class="-rotate-45 translate-y-px -translate-x-px">EFT</p>
                </article>
                <article class="bg-white">
                    <p class="-rotate-45 -translate-y-px translate-x-px">LFT</p>
                </article>
                <article class="bg-white">
                    <p class="-rotate-45 translate-y-px translate-x-px">ST</p>
                </article>
            </section>
            <div class="flex flex-col">
                <span><b>ID</b> - Node ID</span>
                <span><b>EFT</b> - Early Finish Time</span>
                <span><b>LFT</b> - Late Finish Time</span>
                <span><b>ST</b> - Spare time</span>
            </div>
        </div>
        {#each nodes as { id, eft, lft, spare }}
            <div bind:this={nodesIds[id]}>
                <section
                    data-id={id}
                    class="w-16 h-16 grid grid-rows-2 grid-flow-col gap-px border-2 border-blue-600 rounded-full overflow-hidden bg-black text-center leading-7 rotate-45 font-bold select-none"
                >
                    <article class="bg-gray-100">
                        <p class="-rotate-45 translate-y-1 translate-x-1">
                            {id + 1}
                        </p>
                    </article>
                    <article class="bg-gray-100">
                        <p class="-rotate-45 -translate-y-1 translate-x-1">
                            {eft}
                        </p>
                    </article>
                    <article class="bg-gray-100">
                        <p class="-rotate-45 translate-y-1 -translate-x-1">
                            {lft}
                        </p>
                    </article>
                    <article class="bg-gray-100">
                        <p class="-rotate-45 -translate-y-1 -translate-x-1">
                            {spare}
                        </p>
                    </article>
                </section>
            </div>
        {/each}
    </div>
</div>
