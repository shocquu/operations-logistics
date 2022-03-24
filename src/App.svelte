<script lang="ts">
    import { Nav, Table, Path, PertChart } from './components';
    // import { graphStore } from './stores/graph.store';
    import Graph from './utils/graph';

    const graph = new Graph();
    const [first] = graph.addEdge(0, 1, 3, 'A');
    graph.addEdge(0, 2, 7, 'B');
    graph.addEdge(1, 3, 4, 'C');
    graph.addEdge(1, 4, 2, 'D');
    graph.addEdge(2, 4, 3, 'E');
    graph.addEdge(2, 5, 1, 'G');
    graph.addEdge(3, 5, 0, 'Dummy');
    graph.addEdge(3, 6, 5, 'H');
    graph.addEdge(4, 5, 4, 'F');
    graph.addEdge(5, 6, 3, 'I');

    graph.goForward();
    graph.goBackward();

    const criticalPath = Array.from(graph.findCriticalPath());
</script>

<Nav />
<main class="container mx-auto">
    <Table />
    <Path path={criticalPath} />
    <PertChart {graph} />
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
