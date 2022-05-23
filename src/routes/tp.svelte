<script lang="ts">
    import { UserInput, TransportCostTable, SolutionTable } from '../components';

    let suppliers = ['D1', 'D2'];
    let customers = ['O1', 'O2', 'O3'];
</script>

<main class="container mx-auto grid gap-5 h-[calc(100%-8rem)] grid-rows-[minmax(50px,_auto)_1fr]">
    <UserInput />
    <div class="flex gap-5">
        <TransportCostTable {customers} {suppliers} />
        <SolutionTable {customers} {suppliers} />
    </div>
</main>
