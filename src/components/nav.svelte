<script lang="ts">
    import { Link, useLocation } from 'svelte-navigator';

    const location = useLocation();

    const active = 'active text-blue-600 bg-gray-100';
    const nonActive = 'text-gray-500 hover:text-gray-600 hover:bg-gray-50';
</script>

<ul class="flex flex-wrap justify-center border-b border-gray-200 max-w-xl mx-auto my-5">
    <li class="mr-2">
        <Link
            to="cpm"
            aria-current="page"
            class={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg ${
                $location.pathname === '/cpm' ? active : nonActive
            }`}
            >Critical Path Method
        </Link>
    </li>
    <li class="mr-2">
        <Link
            to="tp"
            aria-current="page"
            class={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg ${
                $location.pathname === '/tp' ? active : nonActive
            }`}
            >Transportation Problem
        </Link>
    </li>
</ul>
