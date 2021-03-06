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

    let suppliers = ['S1', 'S2'];
    let customers = ['C1', 'C2'];
    let _customers = [...customers];
    let _suppliers = [...suppliers];

    $: _supply = $supply.map((supply) => supply);
    $: _demand = $demand.map((demand) => demand);

    let M: number = suppliers.length;
    let N: number = customers.length;

    $: {
        customers || suppliers, fillTable();
    }

    const fillTable = () => {
        M = suppliers.length;
        N = customers.length;

        const newRow = new Array(N).fill(0);
        $transportCosts.map((tc) => {
            tc.push(0);
        });
        $transportCosts = [...$transportCosts, newRow];
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
            _customers[N] = 'FC';
            _supply[M] = demandSum.toString();
            $supply[M] = demandSum.toString();

            _suppliers[M] = 'FS';
            _demand[N] = supplySum.toString();
            $demand[N] = supplySum.toString();

            const newRow = new Array(N).fill({ val: 0, rest: 0 });
            $solutionTable.push(newRow);
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

    const addColumn = () => {
        customers = [...customers, `C${customers.length + 1}`];
        _customers = [..._customers, `C${_customers.length + 1}`];
    };

    const addRow = () => {
        suppliers = [...suppliers, `S${suppliers.length + 1}`];
        _suppliers = [..._suppliers, `S${_suppliers.length + 1}`];
    };

    const calculate = () => {
        fillTable();
        setFictionalOperators();
        setOptimalValues();

        $totalProfit = calculateProfit();
    };
</script>

<main
    class="container mx-auto grid gap-5 2xl:h-[calc(100%-8rem)] md:h-[calc(100%-6rem)] grid-rows-[minmax(50px,_auto)_1fr]"
>
    <UserInput {customers} {suppliers} on:addColumn={addColumn} on:addRow={addRow} />
    <div class="flex gap-5 h-max">
        <TransportCostTable {customers} {suppliers} on:submit={calculate} />
        <SolutionTable {_customers} {_suppliers} {_supply} {_demand} />
    </div>
</main>
