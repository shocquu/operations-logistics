<script lang="ts">
    import { sellingPrices, purchasePrices } from '../stores/transport.store';
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">Prices</h1>
    <table class="w-full text-sm text-left text-gray-500">
        <tbody>
            <tr class="border-b hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> Selling Price </th>
                <input
                    class="px-3 py-2 m-2"
                    contenteditable="true"
                    type="number"
                    min="0"
                    bind:innerHTML={$sellingPrices[0]}
                    value={$sellingPrices[0]}
                />
                <input
                    class="px-3 py-2 m-2"
                    contenteditable="true"
                    type="number"
                    min="0"
                    bind:innerHTML={$sellingPrices[1]}
                    value={$sellingPrices[1]}
                />
                <input
                    class="px-3 py-2 m-2"
                    contenteditable="true"
                    type="number"
                    min="0"
                    bind:innerHTML={$sellingPrices[2]}
                    value={$sellingPrices[2]}
                />
            </tr>
            <tr class="border-b hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> Purchase Price </th>
                <input
                    class="px-3 py-2 m-2"
                    contenteditable="true"
                    type="number"
                    bind:innerHTML={$purchasePrices[0]}
                    value={$purchasePrices[0]}
                />
                <input
                    class="px-3 py-2 m-2"
                    contenteditable="true"
                    type="number"
                    min="0"
                    bind:innerHTML={$purchasePrices[1]}
                    value={$purchasePrices[1]}
                />
                <input
                    class="px-3 py-2 m-2"
                    contenteditable="true"
                    type="number"
                    min="0"
                    bind:innerHTML={$purchasePrices[2]}
                    value={$purchasePrices[2]}
                />
            </tr>
        </tbody>
    </table>
</div>
