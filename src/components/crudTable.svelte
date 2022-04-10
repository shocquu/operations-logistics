<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';
    import { graphStore, criticalPath } from '../stores/graph.store';
    import Graph from '../utils/graph';
    import Dropdown from './dropdown.svelte';
    import Error from './error.svelte';

    type Error = {
        isValid: boolean;
        message: string;
    };

    let data = [];
    let editMode = false;
    let useNodeValues = true;

    const graph = new Graph();
    const columns = ['Activity', 'Duration', 'Immediate Predecessor(s)'];
    let errors: Error[] = [];
    let errorTimeout;

    const inputValues = {
        activity: '',
        duration: '',
        nodes: '',
        predecessors: [],
    };
    let firstInput;
    let checkedValues;

    const addRow = () => {
        if (!validateInput()) return;

        const { activity, duration, nodes } = inputValues;
        const predecessors = useNodeValues
            ? nodes.split(/[, ]+/).map((n) => parseInt(n, 10))
            : Object.keys(checkedValues)
                  .filter((key) => checkedValues[key] === true)
                  .sort();

        const [nodeA, nodeB] = predecessors as number[];
        graph.addEdge(nodeA - 1, nodeB - 1, parseInt(duration), activity);

        let dependencies = [nodeA - 1, nodeB - 1]; // for activity based predecessors
        const maxTextLength = 20;
        const row = {
            dependsOn: dependencies,
            activity: activity.slice(0, maxTextLength),
            duration,
            predecessors,
        };
        data = [...data, { ...row }];

        // Reset inputs
        inputValues.activity = inputValues.duration = inputValues.nodes = null;

        // Update store
        $graphStore = graph;
        $criticalPath = Array.from(graph.findCriticalPath());

        // Focus on first input when submitted
        firstInput.focus();
    };

    const deleteRow = (activity: string) => {
        const newData = [];

        // for (let i = 0; i < data.length; i++) {
        //     if (data[i].activity !== activity) {
        //         if (data[i].predecessors.length > 0) {
        //             // @TODO remove from predecessors ids from dependencies (activity based)
        //             data[i].predecessors = data[i].predecessors.filter(
        //                 (pre) => {
        //                     return pre !== activity;
        //                 }
        //             );
        //         }

        //         newData.push(data[i]);
        //     }
        //     // console.log(data[i]);
        // }

        // data = newData;

        for (let i = 0; i < data.length; i++) {
            if (data[i].dependsOn === activity) {
                const [a, b] = data[i].dependsOn;
                $graphStore.removeEdge(a, b);
            }

            if (data[i].dependsOn !== activity) {
                if (data[i].predecessors.length > 0) {
                    data[i].predecessors = data[i].predecessors.filter(
                        (pre) => {
                            return pre !== activity;
                        }
                    );
                }

                newData.push(data[i]);
            }
        }

        data = newData;
        $graphStore = graph;
    };

    const validateInput = () => {
        const { activity, duration, nodes } = inputValues;
        errors = [];

        clearTimeout(errorTimeout);

        if (!Number.isInteger(parseInt(duration))) {
            const newError = {
                isValid: false,
                message: 'Duration must be a number.',
            };
            errors.push(newError);
        } else {
            errors = [];
        }

        if (!activity || !isNaN(parseInt(activity))) {
            const newError = {
                isValid: false,
                message: 'Incorrect activity',
            };
            errors.push(newError);
        }

        const nodesArray =
            nodes && nodes.split(/[, ]+/).map((n) => parseInt(n, 10));

        if (!nodes || !nodesArray || nodesArray.length === 0) {
            const newError = {
                isValid: false,
                message: 'Select corresponding nodes.',
            };
            errors.push(newError);
        }

        if (nodesArray?.length === 1 || nodesArray?.length > 2) {
            const newError = {
                isValid: false,
                message: 'Incorrect amount of nodes.',
            };
            errors.push(newError);
        }

        if (errors.find((err) => err.isValid === false)) {
            errorTimeout = setTimeout(() => {
                errors = [];
            }, 5000);
            return false;
        }

        errors = [];
        return true;
    };

    const clearError = (e: CustomEvent) => {
        errors = errors.filter((err) => err.message !== e.detail.message);
    };

    const getAvailablePredecessors = (name?: string): string[] => {
        if (!name) {
            return useNodeValues
                ? data.map(({ activity }) => activity)
                : data.map(({ activity }) => activity);
        }

        const available: string[] = [];
        data.forEach(
            ({ activity }) => activity != name && available.push(activity)
        );

        return available;
    };
</script>

<div class="relative shadow-md sm:rounded-lg bg-white">
    <div class="flex gap-1 items-center justify-between pt-2 px-4">
        <h1 class="text-2xl font-black">Activities</h1>
        <label for="predecessorType" class="pt-1"
            ><input
                class="form-check-input h-4 w-4 mr-1 mt-1 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                type="checkbox"
                id="predecessorType"
                bind:checked={useNodeValues}
                on:click={() => (useNodeValues = !useNodeValues)}
            />Use node values</label
        >
    </div>
    <!-- User Input -->
    <form class="flex gap-4 p-4" on:submit|preventDefault={addRow}>
        <input
            type="text"
            bind:this={firstInput}
            bind:value={inputValues.activity}
            contenteditable={true}
            placeholder="Activity name"
            class="w-full flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
            min="0"
            type="number"
            bind:value={inputValues.duration}
            contenteditable={true}
            placeholder="Duration"
            class="w-full flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {#if useNodeValues}
            <input
                type="text"
                bind:value={inputValues.nodes}
                contenteditable={true}
                placeholder="Connected nodes [e.q 1, 2]"
                class="w-full flex-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        {:else}
            <Dropdown
                size="w-full"
                getOptions={data && getAvailablePredecessors}
                bind:value={checkedValues}
            />
        {/if}
        <button
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
    </form>
    <div class="flex flex-col gap-2 p-4 pt-0">
        {#each errors as { message }, id (message)}
            <Error {message} on:clear={clearError} />
        {/each}
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
            {#each data as { activity, duration, predecessors, dependsOn }, id (dependsOn)}
                <tr
                    animate:flip
                    in:fade
                    out:fly={{ x: 100 }}
                    class="relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 group"
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
                                class="border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        {:else}
                            <span
                                contenteditable="false"
                                class="border-none bg-inherit text-gray-900 text-sm rounded-lg focus:bg-white focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    </td>

                    <!-- Icons -->
                    <div
                        class="absolute right-0 px-6 py-4 flex justify-center align-center gap-2 transition-opacity opacity-0 group-hover:opacity-100"
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
                            on:click={() => deleteRow(dependsOn)}
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
                    </div>
                </tr>
            {:else}
                <tr>
                    <td
                        colspan={columns.length}
                        class="md:text-2xl sm:text-sm font-medium text-center px-5 py-10"
                    >
                        You haven't added any activities yet. Use the form above
                        to add new records.
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
