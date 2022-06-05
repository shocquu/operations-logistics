<script lang="ts">
    import {
        supply,
        demand,
        solutionTable,
        totalProfit,
        sellingPrices,
        purchasePrices,
        transportCosts,
    } from '../stores/transport.store';
    import { UserInput, TransportCostTable, SolutionTable } from '../components';

    interface ItemCell {
        val: number;
        rest: number | 'x';
    }

    interface ValueCell {
        item: ItemCell;
        i: number;
        j: number;
    }

    let suppliers = ['D1', 'D2'];
    let customers = ['O1', 'O2', 'O3'];
    let _suppliers = ['D1', 'D2'];
    let _customers = ['O1', 'O2', 'O3'];
    let initialSupply, initialDemand;

    $: _supply = $supply.map((supply) => supply);
    $: _demand = $demand.map((demand) => demand);

    const M: number = _suppliers.length;
    const N: number = _customers.length;

    const fillTable = () => {
        $solutionTable = new Array(M).fill({ val: 0, rest: 0 }).map(() => new Array(N).fill({ val: 0, rest: 0 }));

        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                const val = parseInt($sellingPrices[j]) - (parseInt($purchasePrices[i]) + $transportCosts[i][j]);
                $solutionTable[i][j] = { val, rest: 0 };
            }
        }
    };

    const setFictionalOperators = () => {
        let supplySum = 0;
        let demandSum = 0;

        for (let i = 0; i < M; i++) {
            supplySum += parseInt($supply[i]);
        }

        for (let i = 0; i < N; i++) {
            demandSum += parseInt($demand[i]);
        }

        if (supplySum !== demandSum) {
            _customers[N] = 'OF';
            _supply[M] = demandSum.toString();
            $supply[M] = demandSum.toString();

            _suppliers[M] = 'DF';
            _demand[N] = supplySum.toString();
            $demand[N] = supplySum.toString();

            const row = [
                { val: 0, rest: 0 },
                { val: 0, rest: 0 },
                { val: 0, rest: 0 },
                { val: 0, rest: 0 },
            ];
            $solutionTable.push(row);
            $solutionTable.map((row) => {
                row[N] = { val: 0, rest: 0 };
            });
        }
    };

    const setOptimalValues = () => {
        const values: ValueCell[] = [];

        for (let i = 0; i < M + 1; i++) {
            for (let j = 0; j < N + 1; j++) {
                values.push({ item: $solutionTable[i][j], i, j });
            }
        }

        values.sort((a, b) => b.item.val - a.item.val);
        values.forEach((val) => {
            let { item, i, j } = val;
            let min = $supply[i] < $demand[j] ? parseInt(_supply[i]) : parseInt(_demand[j]);

            item.rest = min === 0 ? 'x' : min;
            _supply[i] = (parseInt(_supply[i]) - min).toString();
            _demand[j] = (parseInt(_demand[j]) - min).toString();
        });
    };

    const calculateProfit = () => {
        let profit = 0;

        $solutionTable.forEach((row) => {
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

    const calculate = () => {
        fillTable();
        setFictionalOperators();
        setOptimalValues();

        $totalProfit = calculateProfit();
    };
</script>

<main class="container mx-auto grid gap-5 h-[calc(100%-8rem)] grid-rows-[minmax(50px,_auto)_1fr]">
    <UserInput />
    <div class="flex gap-5">
        <TransportCostTable {customers} {suppliers} on:submit={calculate} />
        <SolutionTable {_customers} {_suppliers} {_supply} {_demand} />
    </div>
</main>
