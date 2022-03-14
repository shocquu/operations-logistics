<script lang="ts">
    interface Data {
        activity: string;
        duration: number;
        predecessors: string[];
    }

    const data: Data[] = [
        {
            activity: 'A',
            duration: 5,
            predecessors: [],
        },
        {
            activity: 'B',
            duration: 3,
            predecessors: ['A'],
        },
        {
            activity: 'C',
            duration: 4,
            predecessors: [],
        },
        {
            activity: 'D',
            duration: 6,
            predecessors: ['A'],
        },
        {
            activity: 'E',
            duration: 4,
            predecessors: ['D'],
        },
        {
            activity: 'F',
            duration: 3,
            predecessors: ['B', 'C', 'D'],
        },
    ];
</script>

<div class="table w-full ...">
    <div class="table-header-group ...">
        <div class="table-row">
            <div class="table-cell text-center ...">Activity</div>
            <div class="table-cell text-center ...">Duration</div>
            <div class="table-cell text-center ...">Predecessor(s)</div>
        </div>
    </div>
    <div class="table-row-group">
        {#each data as { activity, duration, predecessors }}
            <div class="table-row">
                <div class="table-cell ...">
                    {activity}
                </div>
                <div class="table-cell ...">{duration}</div>
                <div class="table-cell ...">{predecessors.join(', ')}</div>
            </div>
        {/each}
    </div>
</div>
