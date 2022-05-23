<script lang="ts">
    import { Router, Route, Link } from 'svelte-navigator';
    import { Nav } from './components';
    import CriticalPAthMethod from './routes/cpm.svelte';
    import TransportationProblem from './routes/tp.svelte';
</script>

<Router>
    <Nav />
    <Route path="tp">
        <CriticalPAthMethod />
    </Route>
    <Route path="cpm">
        <CriticalPAthMethod />
    </Route>
    <Route path="/">
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
