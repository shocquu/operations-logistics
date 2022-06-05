import { writable } from 'svelte/store';

export const supply = writable(['20', '30']);
export const demand = writable(['10', '28', '27']);
export const sellingPrices = writable(['30', '25', '30']);
export const purchasePrices = writable(['10', '12']);
export const transportCosts = writable([
    [8, 14, 17],
    [12, 9, 19],
]);
