import { writable } from 'svelte/store';

export const totalProfit = writable<number>(0);
export const supply = writable<string[]>(['0', '0']);
export const demand = writable<string[]>(['0', '0']);
export const sellingPrices = writable<string[]>(['30', '25', '30']);
export const purchasePrices = writable<string[]>(['10', '12']);
export const solutionTable = writable([]);
export const transportCosts = writable([
    [0, 0],
    [0, 0],
]);
