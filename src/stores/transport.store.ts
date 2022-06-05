import { get, writable } from 'svelte/store';

// export const totalProfit = writable(0);
export const supply = writable(['20', '30']);
export const demand = writable(['10', '28', '27']);
export const sellingPrices = writable(['30', '25', '30']);
export const purchasePrices = writable(['10', '12']);
export const transportCosts = writable([
    [8, 14, 17],
    [12, 9, 19],
]);

export const totalProfit = writable<number>(0);
// export const supply = writable<string[]>(['0', '0']);
// export const demand = writable<string[]>(['0', '0', '0']);
export const supplySolution = writable<string[]>(get(supply));
export const demandSolution = writable<string[]>(get(demand));
// export const sellingPrices = writable<string[]>([]);
// export const purchasePrices = writable<string[]>([]);
// export const transportCosts = writable([
//     [0, 0, 0],
//     [0, 0, 0],
// ]);
