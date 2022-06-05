<script lang="ts">
    import {
        supply,
        demand,
        supplySolution,
        demandSolution,
        totalProfit,
        sellingPrices,
        purchasePrices,
        transportCosts,
    } from '../stores/transport.store';

    interface ItemCell {
        val: number;
        rest: number | 'x';
    }

    interface ValueCell {
        item: ItemCell;
        i: number;
        j: number;
    }

    const { _customers, _suppliers } = $$props;
    const M: number = _suppliers.length;
    const N: number = _customers.length;

    let _supply = $supplySolution;
    let _demand = $demandSolution;

    const table = new Array(M).fill({ val: 0, rest: 0 }).map(() => new Array(N).fill({ val: 0, rest: 0 }));

    $: {
        $transportCosts;
        fillTable();
    }

    $: {
        $demand || $supply;
        console.log($demand, $supply);
        setFictionalOperators();
    }

    const fillTable = () => {
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                const val = parseInt($sellingPrices[j]) - (parseInt($purchasePrices[i]) + $transportCosts[i][j]);
                table[i][j] = { val, rest: 0 };
            }
        }
    };

    const setFictionalOperators = () => {
        let supplySum = 0;
        let demandSum = 0;

        for (let i = 0; i < M; i++) {
            supplySum += parseInt(_supply[i]);
        }

        for (let i = 0; i < N; i++) {
            demandSum += parseInt(_demand[i]);
        }

        if (supplySum !== demandSum) {
            _customers[N] = 'OF';
            _supply[M] = demandSum.toString();

            _suppliers[M] = 'DF';
            _demand[N] = supplySum.toString();

            const row = [
                { val: 0, rest: 0 },
                { val: 0, rest: 0 },
                { val: 0, rest: 0 },
                { val: 0, rest: 0 },
            ];
            table.push(row);
            table.map((row) => {
                row[N] = { val: 0, rest: 0 };
            });

            setOptimalValues();
            $totalProfit = calculateProfit();
        }
    };

    const setOptimalValues = () => {
        const values: ValueCell[] = [];

        for (let i = 0; i < M + 1; i++) {
            for (let j = 0; j < N + 1; j++) {
                values.push({ item: table[i][j], i, j });
            }
        }

        values.sort((a, b) => b.item.val - a.item.val);
        values.forEach((val) => {
            let { item, i, j } = val;
            let min = _supply[i] < _demand[j] ? parseInt(_supply[i]) : parseInt(_demand[j]);

            item.rest = min === 0 ? 'x' : min;
            _supply[i] = (parseInt(_supply[i]) - min).toString();
            _demand[j] = (parseInt(_demand[j]) - min).toString();
        });
    };

    const calculateProfit = () => {
        let profit = 0;

        table.forEach((row) => {
            row.forEach(({ val, rest }) => {
                if (Number.isInteger(rest)) {
                    profit += val * rest;
                }
            });
        });

        return profit;
    };

    const setAlfaBeta = () => {
        _customers[M + 1] = 'A<sup>i</sup>';
        _suppliers[N + 1] = 'B<sup>i</sup>';
    };
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
                        <p class="w-8 text-center">{$demand[i] ? $demand[i] : _demand[i]}</p>
                        )
                        {#if _demand[i] !== $demand[i]}
                            <span>{_demand[i]}</span>
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each _suppliers as supplier, i}
                <tr class="bg-white border-b hover:bg-gray-50 flex">
                    <th scope="row" class="px-6 py-4 text-sm text-gray-700 bg-gray-50  whitespace-nowrap flex">
                        {supplier} (
                        <p class="w-8 text-center">{$supply[i] ? $supply[i] : _supply[i]}</p>
                        )
                        {#if _supply[i] !== $supply[i]}
                            <span>{_supply[i]}</span>
                        {/if}
                    </th>
                    {#each _customers as _, j}
                        <td class="px-3 py-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <p class="grid col-span-2">{table[i][j].val ? table[i][j].val : 0}</p>
                                <p class="col-start-2">{table[i][j].rest}</p>
                            </div></td
                        >
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
