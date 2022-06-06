<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { supply, demand, transportCosts } from '../stores/transport.store';

    export let customers;
    export let suppliers;

    let gridColsNum = customers.length + 1;
    const dispatch = createEventDispatcher();

    $: customers && setColumnsCount();

    const setColumnsCount = () => {
        gridColsNum = customers.length + 1;
    };

    const submit = () => dispatch('submit');
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white pb-px">
    <h1 class="px-4 pt-2 text-2xl font-black">Unit transport costs</h1>
    <div class={`w-full text-sm text-left text-gray-700 grid grid-cols-${gridColsNum}`}>
        <div class="font-bold px-6 py-3 border-b border-r">Supply\Demand</div>
        {#each customers as customer, i}
            <div class="px-6 py-3 flex font-bold border-b border-r">
                {customer} (
                <p class="w-8 text-center" contenteditable="true" bind:innerHTML={$demand[i]}>0</p>
                )
            </div>
        {/each}
        {#each suppliers as supplier, i}
            <div class="px-6 py-4 text-sm whitespace-nowrap font-bold flex border-b border-r">
                {supplier} (
                <p class="w-8 text-center" contenteditable="true" bind:innerHTML={$supply[i]}>0</p>
                )
            </div>
            {#each customers as _, j}
                <input
                    class="px-3 py-2 h-full text-center border-b border-r border-t-0 border-l-0"
                    type="number"
                    contenteditable="true"
                    bind:value={$transportCosts[i][j]}
                />
            {/each}
        {/each}
    </div>
    <button
        class="flex gap-1 items-center justify-end m-4 focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        on:click={submit}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
        </svg><span>Calculate</span></button
    >
</div>
