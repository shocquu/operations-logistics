<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { supply, demand, transportCosts } from '../stores/transport.store';

    export let customers;
    export let suppliers;

    const dispatch = createEventDispatcher();

    const submit = () => dispatch('submit');
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">Unit transport costs</h1>
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50">
            <tr class="flex">
                <th scope="col" class="px-6 py-3">Supply\Demand</th>
                {#each customers as customer, i}
                    <th scope="col" class="px-6 py-3 flex"
                        >{customer} (
                        <p class="w-8 text-center" contenteditable="true" bind:innerHTML={$demand[i]}>0</p>
                        )</th
                    >
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each suppliers as supplier, i}
                <tr class="bg-white border-b hover:bg-gray-50 flex">
                    <th scope="row" class="px-6 py-4 text-sm text-gray-700 bg-gray-50 whitespace-nowrap flex">
                        {supplier} (
                        <p class="w-8 text-center" contenteditable="true" bind:innerHTML={$supply[i]}>0</p>
                        )
                    </th>
                    {#each customers as _, j}
                        <td
                            ><input
                                class="px-3 py-2 h-full text-center"
                                type="number"
                                contenteditable="true"
                                bind:value={$transportCosts[i][j]}
                            /></td
                        >
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    <button
        class="flex gap-1 items-center justify-end focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        on:click={submit}
        ><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            /></svg
        > <span>Calculate</span></button
    >
</div>
