<script lang="ts">
    import LeaderLine from 'leader-line';
    import { onMount } from 'svelte';

    export let nodes, adjList;

    let nodeIds = [];

    onMount(() => {
        Object.entries(adjList).forEach(([a, b]: [string, number[]]) => {
            nodeIds.push(a);
            b.forEach(
                (end) =>
                    new LeaderLine(nodeIds[a], nodeIds[end], {
                        color: '#0064c8',
                        // dash: true, // for dummy lines
                        // endLabel: 'A',
                    })
            );
        });
    });
</script>

<h1 class="text-2xl font-black">PERT Chart</h1>
<div class="flex gap-10 border px-4">
    {#each nodes as { id, eft, lft, spare }}
        <div bind:this={nodeIds[id]}>
            <section
                data-id={id}
                class="w-16 h-16 grid grid-rows-2 grid-flow-col gap-px border-2 border-blue-600 rounded-full overflow-hidden bg-black text-center leading-7 rotate-45 font-bold select-none"
            >
                <article class="bg-gray-100">
                    <p class="-rotate-45 translate-y-1 translate-x-1">{id}</p>
                </article>
                <article class="bg-gray-100">
                    <p class="-rotate-45 -translate-y-1 translate-x-1">{eft}</p>
                </article>
                <article class="bg-gray-100">
                    <p class="-rotate-45 translate-y-1 -translate-x-1">{lft}</p>
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
