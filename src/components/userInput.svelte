<script lang="ts">
    import { sellingPrices, purchasePrices } from '../stores/transport.store';
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 class="px-4 pt-2 text-2xl font-black">Prices</h1>
    <table class="w-full text-sm text-left text-gray-500">
        <tbody>
            <tr class="bg-white border-b hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> Selling Price </th>
                <td class="px-6 py-4" contenteditable="true" bind:innerHTML={$sellingPrices[0]}>0</td>
                <td class="px-6 py-4" contenteditable="true" bind:innerHTML={$sellingPrices[1]}>0</td>
                <td class="px-6 py-4" contenteditable="true" bind:innerHTML={$sellingPrices[2]}>0</td>
            </tr>
            <tr class="bg-white border-b hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> Purchase Price </th>
                <td class="px-6 py-4" contenteditable="true" bind:innerHTML={$purchasePrices[0]}>0</td>
                <td class="px-6 py-4" contenteditable="true" bind:innerHTML={$purchasePrices[1]}>0</td>
                <td class="px-6 py-4" contenteditable="true" bind:innerHTML={$purchasePrices[2]}>0</td>
            </tr>
        </tbody>
    </table>
</div>
