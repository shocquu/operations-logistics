<script lang="ts">
    import {
        CrudTable,
        CriticalPath,
        GanttChart,
        PertChart,
    } from '../components';
</script>

<main
    class="container mx-auto grid gap-5 h-[calc(100%-8rem)] grid-rows-[minmax(50px,_auto)_1fr_minmax(180px,_auto)]"
>
    <CriticalPath />
    <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-5">
        <CrudTable />
        <GanttChart />
    </div>
    <PertChart />
</main>
