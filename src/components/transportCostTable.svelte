<script lang="ts">
    import { supply, demand, transportCosts } from '../stores/transport.store';

    export let customers;
    export let suppliers;

    // $: {
    //     console.table($transportCosts);
    // }
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
</div>
