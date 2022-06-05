<script lang="ts">
    import { supply, demand, sellingPrices, purchasePrices, transportCosts } from '../stores/transport.store';
    import { get } from 'svelte/store';
    import { rowStore } from 'svelte-gantt/types/core/store';

    const { _customers, _suppliers } = $$props;
    const M: number = _suppliers.length;
    const N: number = _customers.length;

    let _supply = $supply;
    let _demand = $demand;

    const table = new Array(M).fill({ val: 0, rest: 0 }).map(() => new Array(N).fill({ val: 0, rest: 0 }));

    $: {
        $transportCosts;
        loop();
    }

    $: {
        $demand || $supply;
        set();
    }

    const loop = () => {
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                const val = parseInt($sellingPrices[j]) - (parseInt($purchasePrices[i]) + $transportCosts[i][j]);
                table[i][j] = { val, rest: 0 };
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
            _customers[N] = 'OF';
            _demand[N] = supplySum.toString();

            _suppliers[M] = 'DF';
            _supply[M] = demandSum.toString();

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

            performStep1();
            // setAlfaBeta();
        }
    };

    interface TableCell {
        val: number;
        rest: number;
    }

    const performStep1 = () => {
        const values = [];

        for (let i = 0; i < M + 1; i++) {
            for (let j = 0; j < N + 1; j++) {
                values.push({ item: table[i][j], i, j });
            }
        }

        values.sort((a, b) => b.item.val - a.item.val);

        // Push fictional dataset
        // for (let i = 0; i < M + 1; i++) {
        //     // for (let j = N; j < N + 1; j++) {
        //     //     console.log(i, j);
        //     // }
        //     values.push({ item: table[M][i], i: M, j: i });
        //     values.push({ item: table[i][N], i, j: N });
        // }

        // values.push([0, 0, 0, 0, 0, 0]);
        console.log(values);

        values.forEach((val) => {
            let { item, i, j } = val;
            let min = _supply[i] < _demand[j] ? parseInt(_supply[i]) : parseInt(_demand[j]);
            // if (min > parseInt(_supply[i])) {
            //     const remaining = min - parseInt(_supply[i]);
            //     _supply[i + 1] = (parseInt(_supply[i + 1]) - remaining).toString();

            //     item.rest = _supply[i];
            //     table[i + 1][j].rest = remaining;
            //     table[i + 1][j + 1].rest = parseInt(_supply[i + 1]);

            //     _supply[i + 1] = (parseInt(_supply[i + 1]) - parseInt(_supply[i + 1])).toString();

            //     let min2 = _supply[i + 1] < _demand[j + 1] ? parseInt(_supply[i + 1]) : parseInt(_demand[j + 1]);
            //     console.log(min2);
            //     return;
            // }

            // if (min > parseInt(_demand[j])) {
            //     const remaining = min - parseInt(_demand[j]);
            //     item.rest = _demand[j];
            //     _demand[j + 1] = (parseInt(_demand[j + 1]) - remaining).toString();
            //     return;
            // }

            if (j === N && i === M - 1) {
                // const temp = i;
                // i = j;
                // j = temp;
                // // min === 0 ? 'x' : min;
                // table[i][j - 1].rest = table[i][j - 1].rest + min;
                // table[2][2].rest = min;
                // console.log(min, i, j);
            } else {
            }
            item.rest = min === 0 ? 'x' : min;

            _supply[i] = (parseInt(_supply[i]) - min).toString();
            _demand[j] = (parseInt(_demand[j]) - min).toString();
        });

        // const allValues = [];
        // const sortedRows = table.map((row, i) => {
        //     return { item: row.sort((a, b) => b.val - a.val), i };
        // });

        // sortedRows.forEach((row, j) => {
        //     allValues.push({ item: row.item, i: row.i, j });
        // });

        // allValues.sort((a, b) => b.val - a.val);
    };

    const setAlfaBeta = () => {
        _customers[M + 1] = 'A<sup>i</sup>';
        _suppliers[N + 1] = 'B<sup>i</sup>';
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
                        <td class="px-3 py-2">
                            <div class="grid grid-rows-2 grid-cols-2">
                                <p class="grid col-span-2">{table[i][j].val}</p>
                                <p class="col-start-2">{table[i][j].rest}</p>
                            </div></td
                        >
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
