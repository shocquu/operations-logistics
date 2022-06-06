<script lang="ts">
    import { supply, demand, totalProfit, solutionTable } from '../stores/transport.store';

    const { _supply, _demand, initialSupply, initialDemand } = $$props;
    export let _customers;
    export let _suppliers;

    let gridColsNum = _customers.length + 1;

    $: _customers && setColumnsCount();

    const setColumnsCount = () => {
        gridColsNum = _customers.length + 1;
    };
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">Solution</h1>
    <div class={`w-full text-sm text-left text-gray-700 grid grid-cols-${gridColsNum}`}>
        <div class="font-bold px-6 py-3 border-b border-r">Supply\Demand</div>
        {#each _customers as customer, i}
            <div class="px-6 py-3 flex font-bold border-b border-r">
                {customer}
                {#if _demand[i] !== $demand[i]}
                    (<strike class="w-6 text-center">{$demand[i] ? $demand[i] : _demand[i]}</strike>)
                    <span class="text-blue-600">&nbsp;{_demand[i] ? _demand[i] : '0'}</span>
                {:else}
                    (
                    <p class="w-6 text-center">{$demand[i] ? $demand[i] : _demand[i]}</p>
                    )
                {/if}
            </div>
        {/each}
        {#each _suppliers as supplier, i}
            <div class="px-6 py-4 text-sm whitespace-nowrap flex font-bold border-b border-r">
                {supplier}
                {#if _supply[i] !== $supply[i]}
                    (<strike class="w-6 text-center">{$supply[i] ? $supply[i] : _supply[i]}</strike>)
                    <span class="text-blue-600">&nbsp;{_supply[i] ? _supply[i] : '0'}</span>
                {:else}
                    (
                    <p class="w-6 text-center">{$supply[i] ? $supply[i] : _supply[i]}</p>
                    )
                {/if}
            </div>
            {#each _customers as _, j}
                <div class="grid grid-rows-2 grid-cols-2 border-b border-r">
                    <p class="flex col-start-1 items-center justify-center w-full h-full">
                        {$solutionTable.length ? $solutionTable[i][j].val : 0}
                    </p>
                    <span />
                    <p class="flex col-start-2 items-center justify-center w-full h-full border-t border-l">
                        {$solutionTable.length ? $solutionTable[i][j].rest : '0'}
                    </p>
                </div>
            {/each}
        {/each}
    </div>
    <p class="text-xl font-black my-6 ml-4">Total profit: <span class="font-normal">{$totalProfit}</span></p>
</div>
