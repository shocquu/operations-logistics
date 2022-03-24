<script lang="ts">
    export let path;
</script>

<h1 class="text-2xl font-black">Critical Path</h1>
<div class="flex border px-4" aria-label="Critical Path">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li>
            <div class="flex items-center">
                <span
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >START</span
                >
            </div>
        </li>
        {#each path as { name }}
            <li>
                <div class="flex items-cente">
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
                    <span
                        class="ml-1 text-sm font-medium text-blue-600 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                        >{name}</span
                    >
                </div>
            </li>
        {/each}
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
                <span
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >END</span
                >
            </div>
        </li>
    </ol>
</div>
