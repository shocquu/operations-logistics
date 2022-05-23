<script lang="ts">
    import { Link } from 'svelte-navigator';
</script>

<ul
    class="flex flex-wrap justify-center border-b border-gray-200 dark:border-gray-700 max-w-xl mx-auto my-5"
>
    <li class="mr-2">
        <Link
            to="cpm"
            aria-current="page"
            class="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >Critical Path Method
        </Link>
    </li>
    <li class="mr-2">
        <Link
            to="tp"
            class="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >Transportation Problem
        </Link>
    </li>
</ul>
