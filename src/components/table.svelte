<script lang="ts">
    import { graph } from '../stores/graph.store';
</script>

<div class="table w-full border px-4">
    <div class="table-header-group">
        <div class="table-row">
            <div class="table-cell text-center">Activity</div>
            <div class="table-cell text-center">Duration</div>
            <div class="table-cell text-center">Immediate Predecessor(s)</div>
        </div>
    </div>
    <div class="table-row-group">
        {#each Object.entries($graph) as [activity, { duration, predecessors }]}
            <div class="table-row">
                <div class="table-cell">
                    {activity}
                </div>
                <div class="table-cell">{duration}</div>
                <div class="table-cell">
                    {predecessors.length > 0 ? predecessors.join(', ') : '-'}
                </div>
            </div>
        {/each}
    </div>
</div>
