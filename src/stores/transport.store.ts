import { writable } from 'svelte/store';

export const supply = writable(['0', '0', '0']);
export const demand = writable(['0', '0', '0']);
export const sellingPrices = writable(['0', '0', '0']);
export const purchasePrices = writable(['0', '0', '0']);
export const transportCosts = writable([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]);
