<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';

    export let size = 'w-32';
    export let value = {};
    export let getOptions;

    let menu: HTMLDivElement | null = null;
    let open: boolean = false;
    let options;
    let checkedValues: { [key: string]: boolean } = {};
    const dispatch = createEventDispatcher();

    $: options = getOptions();

    const submit = () => {
        value = checkedValues;
        dispatch('submit');
        // checkedValues = {};
    };

    onMount(() => {
        // https://codechips.me/tailwind-ui-react-vs-svelte/
        const handleOutsideClick = (event) => {
            if (open && !menu.contains(event.target)) {
                open = false;
                submit();
            }
        };
        const handleEscape = (event) => {
            if (open && event.key === 'Escape') {
                open = false;
                submit();
            }
        };
        // add events when element is added to the DOM
        document.addEventListener('click', handleOutsideClick, false);
        document.addEventListener('keyup', handleEscape, false);
        // remove events when element is removed from the DOM
        return () => {
            document.removeEventListener('click', handleOutsideClick, false);
            document.removeEventListener('keyup', handleEscape, false);
        };
    });
</script>

<div class="relative inline-block text-left" bind:this={menu}>
    <button
        type="button"
        class={`${size} h-full inline-flex flex-auto items-center bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        on:click={() => (open = !open)}
    >
        <!-- {Object.keys(checkedValues).length
            ? Object.keys(checkedValues)
                  .filter((key) => checkedValues[key] === true)
                  .sort()
            : 'Predecessors'} -->
        <span>Predecessors</span>
        <!-- Heroicon name: solid/chevron-down -->
        <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
            />
        </svg>
    </button>
    {#if open}
        <div
            class="origin-top-right absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <div class="py-2" role="none">
                <p class="pl-3 pb-2 font-medium text-gray-800">
                    Immediate predecessors
                </p>
                {#each options as option}
                    <div
                        class="form-check flex gap-2 px-3 items-center hover:bg-gray-100"
                    >
                        <input
                            class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                            type="checkbox"
                            id={`option-${option}`}
                            bind:checked={checkedValues[option]}
                            on:click={submit}
                        />
                        <label
                            class="form-check-label inline-block text-gray-800 flex-1"
                            for={`option-${option}`}
                        >
                            {option}
                        </label>
                    </div>
                {:else}
                    <div class="flex gap-2 px-3 items-center">
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            /></svg
                        >
                        <span>Empty</span>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
