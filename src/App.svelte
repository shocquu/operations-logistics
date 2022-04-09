<script lang="ts">
    import { Nav, CrudTable, CriticalPath, PertChart } from './components';
</script>

<Nav />
<main class="container mx-auto grid gap-4">
    <CrudTable />
    <CriticalPath />
    <PertChart />
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
        background-color: #f9fafb;
    }
</style>
