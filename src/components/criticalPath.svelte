<script lang="ts">
    import { criticalPath } from '../stores/graph.store';

    $: total = $criticalPath.reduce((a, b) => a + b.weight, 0);
</script>

<div class="flex items-center overflow-x-auto shadow-md sm:rounded-lg bg-white px-4 py-2">
    <h1 class="text-2xl font-black flex-1">Critical Path</h1>
    <ol class="inline-flex items-center justify-center space-x-1 md:space-x-3 flex-2 cursor-default">
        <li>
            <div class="flex items-center">
                <span class="ml-1 text-md font-medium text-gray-700md:ml-2">START</span>
            </div>
        </li>
        {#each $criticalPath as { name }}
            <li>
                <div class="flex items-center">
                    <svg
                        class="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        /></svg
                    >
                    <span class="ml-1 text-md font-medium text-blue-600 hover:text-blue-700 md:ml-2">{name}</span>
                </div>
            </li>
        {/each}
        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
            ><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
            /></svg
        >
        <li>
            <div class="flex items-center">
                <span class="ml-1 text-md font-medium text-gray-700 md:ml-2">END</span>
            </div>
        </li>
    </ol>
    <div class="flex flex-1 justify-end gap-2">
        <span class="ml-1 text-md font-medium text-gray-700md:ml-2">TOTAL: </span>
        <span class="ml-1 text-md text-gray-700md:ml-2">{total}</span>
    </div>
</div>
