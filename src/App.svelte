<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import { Nav } from './components';
    import CriticalPathMethod from './routes/cpm.svelte';
    import TransportationProblem from './routes/tp.svelte';
</script>

<Router basepath="/operations-logistics">
    <Nav />
    <Route path="/">
        <TransportationProblem />
    </Route>
    <Route path="/cpm">
        <CriticalPathMethod />
    </Route>
    <Route path="/tp">
        <TransportationProblem />
    </Route>
</Router>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
        background-color: #f9fafb;
    }
</style>
