<script lang="ts">
    import { supply, demand, totalProfit, solutionTable } from '../stores/transport.store';

    const { _customers, _suppliers, _supply, _demand, initialSupply, initialDemand } = $$props;
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
    <div class="flex justify-between mr-4 items-center">
        <h1 class="px-4 pt-2 text-2xl font-black">Solution</h1>
        <p class="font-semibold">Total profit: <span class="font-normal">{$totalProfit}</span></p>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50">
            <tr class="flex">
                <th scope="col" class="px-6 py-3">Supply\Demand</th>
                {#each _customers as customer, i}
                    <th scope="col" class="px-6 py-3 flex"
                        >{customer} (
                        <strike class="w-6 text-center">{$demand[i] ? $demand[i] : _demand[i]}</strike>
                        )
                        <span class="text-blue-600">&nbsp;{_demand[i] ? _demand[i] : '0'}</span>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each _suppliers as supplier, i}
                <tr class="bg-white border-b hover:bg-gray-50 flex">
                    <th scope="row" class="px-6 py-4 text-sm text-gray-700 bg-gray-50  whitespace-nowrap flex">
                        {supplier}
                        {#if _supply[i] !== $supply[i]}
                            (<strike class="w-6 text-center">{$supply[i] ? $supply[i] : _supply[i]}</strike>)
                            <span class="text-blue-600">&nbsp;{_supply[i] ? _supply[i] : '0'}</span>
                        {:else}
                            (
                            <p class="w-6 text-center">{$supply[i] ? $supply[i] : _supply[i]}</p>
                            )
                        {/if}
                    </th>
                    {#each _customers as _, j}
                        <td class="px-3 py-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <p class="grid col-span-2">
                                    {$solutionTable.length ? $solutionTable[i][j].val : 0}
                                </p>
                                <p class="col-start-2">
                                    {$solutionTable.length ? $solutionTable[i][j].rest : '0'}
                                </p>
                            </div></td
                        >
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
