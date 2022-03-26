<script lang="ts">
    import { graphStore } from '../stores/graph.store';

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    $: letter = alphabet[Object.keys($graphStore).length];
    $: error = false;
    let duration, predecessors;

    const addRow = () => {
        if (
            !Number.isInteger(parseInt(duration)) ||
            typeof predecessors !== 'string'
        ) {
            error = true;
            return;
        }

        predecessors = predecessors
            .split(/[, ]+/)
            .map((letter) => letter.toLocaleUpperCase());

        $graphStore[letter] = {
            duration,
            predecessors,
        };

        duration = predecessors = null;
    };
</script>

<div class="table w-full border p-4">
    <div class="table-header-group">
        <div class="table-row">
            <div class="table-cell text-center">Activity</div>
            <div class="table-cell text-center">Duration</div>
            <div class="table-cell text-center">Immediate Predecessor(s)</div>
        </div>
    </div>
    <div class="table-row-group">
        {#each Object.entries($graphStore) as [activity, { duration, predecessors }]}
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
        <div class="flex">
            <input type="text" bind:value={letter} disabled /><input
                type="text"
                bind:value={duration}
            /><input type="text" bind:value={predecessors} />
        </div>
    </div>
    {#if error}
        <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
            <strong class="font-bold">ERROR</strong>
            <span class="block sm:inline">Inserted data is not valid</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                    class="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    on:click={() => {
                        error = false;
                    }}
                    ><title>Close</title><path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                    /></svg
                >
            </span>
        </div>
    {/if}
    <button
        on:click={addRow}
        class="bg-blue-600 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded inline-flex items-center"
    >
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            /></svg
        >
        <span>Add</span>
    </button>
</div>
