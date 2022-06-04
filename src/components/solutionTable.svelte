<script lang="ts">
    import { supply, demand, sellingPrices, purchasePrices, transportCosts } from '../stores/transport.store';

    export let customers;
    export let suppliers;

    const N = suppliers.length;
    const M = customers.length;

    $: _customers = customers;
    $: _suppliers = suppliers;
    $: _supply = $supply;
    $: _demand = $demand;

    const table = new Array(N).fill(0).map(() => new Array(M).fill(0));

    $: {
        $transportCosts;
        loop();
    }

    $: {
        $demand || $supply;
        set();
    }

    const loop = () => {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                table[i][j] = parseInt($sellingPrices[j]) - (parseInt($purchasePrices[i]) + $transportCosts[i][j]);
            }
        }
    };

    const set = () => {
        // const supplySum: any = _supply.reduce((prev, curr, i, arr) => parseInt(prev) + parseInt(curr));
        // const demandSum: any = _demand.reduce((prev, curr, i, arr) => parseInt(prev) + curr);

        let supplySum = 0;
        let demandSum = 0;

        for (const s of _supply) {
            supplySum += parseInt(s);
        }

        for (const d of _demand) {
            demandSum += parseInt(d);
        }

        if (supplySum !== demandSum) {
            _customers.push('OF');
            _supply.push(demandSum.toString());

            _suppliers.push('DF');
            _demand.push(supplySum.toString());

            console.log(supplySum, demandSum);

            const row = [0, 0, 0, 0];
            table.push(row);
        }
    };
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
    <h1 class="px-4 pt-2 text-2xl font-black">Solution</h1>
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50">
            <tr class="flex">
                <th scope="col" class="px-6 py-3">Supply\Demand</th>
                {#each _customers as customer, i}
                    <th scope="col" class="px-6 py-3 flex"
                        >{customer} (
                        <p class="w-8 text-center">{_demand[i]}</p>
                        )</th
                    >
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each _suppliers as supplier, i}
                <tr class="bg-white border-b hover:bg-gray-50 flex">
                    <th scope="row" class="px-6 py-4 text-sm text-gray-700 bg-gray-50  whitespace-nowrap flex">
                        {supplier} (
                        <p class="w-8 text-center">{_supply[i]}</p>
                        )
                    </th>
                    {#each _customers as _, j}
                        <td class="px-3 py-2">{table[i][j]}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
