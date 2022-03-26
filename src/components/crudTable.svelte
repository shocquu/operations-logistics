<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';
    import { Dropdown } from '../components';

    let data;
    let error = false;
    let editMode = false;

    const columns = ['Activity', 'Duration', 'Immediate Predecessor(s)'];
    const inputs = [
        {
            placeholder: 'Activity name',
            editable: false,
            size: 'w-11',
            key: 'activity',
        },
        {
            placeholder: 'Duration',
            editable: true,
            size: 'w-24',
            key: 'duration',
        },
    ];

    $: data = [
        { activity: 'A', duration: '3', predecessors: [] },
        { activity: 'B', duration: '7', predecessors: ['A'] },
        { activity: 'C', duration: '7', predecessors: ['A', 'B'] },
    ];
    const inputValues = { activity: '', duration: '', predecessors: [] };
    let checkedValues;

    const addRow = () => {
        const { activity, duration } = inputValues;
        const predecessors = Object.keys(checkedValues)
            .filter((key) => checkedValues[key] === true)
            .sort();

        if (
            !Number.isInteger(parseInt(duration)) ||
            typeof activity !== 'string'
        ) {
            error = true;
            return;
        }

        const maxLenghth = 20;
        const row = {
            activity: activity.slice(0, maxLenghth),
            duration,
            predecessors,
        };
        data = [...data, { ...row }];

        // Reset inputs
        inputValues.activity = inputValues.duration = null;
    };

    const deleteRow = (activity: string) => {
        const newData = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].activity != activity) {
                if (data[i].predecessors.length > 0) {
                    data[i].predecessors = data[i].predecessors.filter(
                        (pre) => pre != activity
                    );
                }

                newData.push(data[i]);
            }
        }

        data = newData;
    };

    const getAvailablePredecessors = (name?: string): string[] => {
        if (!name) {
            return data.map(({ activity }) => activity);
        }

        const available: string[] = [];
        data.forEach(
            ({ activity }) => activity != name && available.push(activity)
        );

        return available;
    };

    const handleSubmit = () => {
        // console.log(checkedValues);
    };
</script>

<div class="relative shadow-md sm:rounded-lg bg-white">
    <h1 class="text-2xl font-black px-4 pt-2 ">Activities</h1>
    <!-- User Input -->
    <div class="flex gap-4 p-4 w-1/2">
        {#each inputs as { placeholder, editable, size, key }, i}
            <input
                type="text"
                bind:value={inputValues[key]}
                {placeholder}
                contenteditable={editable}
                class={`${size} flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
        {/each}
        <Dropdown
            size="w-full"
            getOptions={data && getAvailablePredecessors}
            bind:value={checkedValues}
            on:submit={handleSubmit}
        />
        <button
            on:click={addRow}
            class="flex gap-1 items-center justify-end focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                /></svg
            >
            <span>Add</span>
        </button>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!-- Headers -->
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                {#each columns as column}
                    <th scope="col" class="px-6 py-3">{column}</th>
                {/each}
            </tr>
        </thead>
        <!-- Rows -->
        <tbody>
            {#each data as { activity, duration, predecessors }, id (activity)}
                <tr
                    animate:flip
                    in:fade
                    out:fly={{ x: 100 }}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 group"
                >
                    <th
                        scope="row"
                        class="px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >{activity}</th
                    >
                    <td class="px-3 py-2 ">
                        {#if editMode}
                            <span
                                bind:innerHTML={duration}
                                contenteditable="true"
                                class="border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        {:else}
                            <span
                                contenteditable="false"
                                class="border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >{duration}</span
                            >
                        {/if}
                    </td><td
                        class="px-3 py-2 focus:ring-blue-500 focus:outline-blue-500"
                    >
                        {#if editMode}
                            <Dropdown
                                bind:value={inputValues.predecessors}
                                getOptions={() =>
                                    getAvailablePredecessors(activity)}
                            />
                        {:else}
                            <span
                                class="border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-80 pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >{predecessors.length > 0
                                    ? predecessors.join(', ')
                                    : '-'}</span
                            >
                        {/if}
                    </td><td
                        class="px-6 py-4 flex justify-center align-center gap-2 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                        <button class="border-0">
                            <svg
                                class="w-6 h-6 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                /></svg
                            >
                        </button>
                        <button
                            type="button"
                            class="border-0"
                            on:click={() => deleteRow(activity)}
                        >
                            <svg
                                class="w-6 h-6 mb-px text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                /></svg
                            ></button
                        >
                    </td>
                </tr>
            {:else}
                <p class="text-lg text-center py-5">
                    You haven't set any activities yet. Add new data and they
                    will appear here.
                </p>
            {/each}
        </tbody>
    </table>
</div>
