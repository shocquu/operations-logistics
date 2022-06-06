<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { sellingPrices, purchasePrices, supply, demand } from '../stores/transport.store';

    export let customers;
    export let suppliers;

    const dispatch = createEventDispatcher();

    const addColumn = () => {
        if ($demand.length <= 5) {
            $demand = [...$demand, '0'];
            $sellingPrices = [...$sellingPrices, '0'];
            dispatch('addColumn');
        }
    };

    const addRow = () => {
        if ($supply.length <= 5) {
            if ($supply.length < 5) {
                $supply = [...$supply, '0'];
                $purchasePrices = [...$purchasePrices, '0'];
                dispatch('addRow');
            }
        }
    };
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">Prices</h1>
    <table class="w-full text-sm text-left text-gray-500">
        <tbody>
            <tr class="border-b hover:bg-gray-50 flex items-center">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex-1">
                    Selling Price
                </th>
                {#each customers as customer, i}
                    <input
                        class="px-3 py-2 m-2"
                        contenteditable="true"
                        type="number"
                        min="0"
                        bind:innerHTML={$sellingPrices[i]}
                        value={$sellingPrices[i]}
                    />
                {/each}
                <button
                    class="flex mr-4 gap-1 items-center justify-end focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1"
                    on:click={addColumn}
                    ><svg
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
                    ></button
                >
            </tr>
            <tr class="border-b hover:bg-gray-50 flex items-center">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex-1">
                    Purchase Price
                </th>
                {#each suppliers as supplier, i}
                    <input
                        class="px-3 py-2 m-2"
                        contenteditable="true"
                        type="number"
                        bind:innerHTML={$purchasePrices[i]}
                        value={$purchasePrices[i]}
                    />
                {/each}
                <button
                    class="flex mr-4 gap-1 items-center justify-end focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1"
                    on:click={addRow}
                    ><svg
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
                    ></button
                >
            </tr>
        </tbody>
    </table>
</div>
