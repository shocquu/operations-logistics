import { writable } from 'svelte/store';

export const graph = writable({
    A: {
        name: 'A',
        duration: 3,
        dependsOn: [0, 1],
        predecessors: [],
        successors: ['C', 'D'],
    },
    B: {
        name: 'B',
        duration: 7,
        dependsOn: [0, 2],
        predecessors: [],
        successors: ['E', 'G'],
    },
    C: {
        name: 'C',
        duration: 4,
        dependsOn: [1, 3],
        predecessors: ['A'],
        successors: ['H'],
    },
    D: {
        name: 'D',
        duration: 2,
        dependsOn: [1, 4],
        predecessors: ['A'],
        successors: ['F'],
    },
    E: {
        name: 'E',
        duration: 3,
        dependsOn: [2, 4],
        predecessors: ['B'],
        successors: ['F'],
    },
    F: {
        name: 'F',
        duration: 4,
        dependsOn: [4, 5],
        predecessors: ['D', 'E'],
        successors: ['I'],
    },
    G: {
        name: 'G',
        duration: 1,
        dependsOn: [2, 5],
        predecessors: ['B'],
        successors: ['I'],
    },
    H: {
        name: 'I',
        duration: 5,
        dependsOn: [3, 6],
        predecessors: ['C'],
        successors: [],
    },
    I: {
        name: 'I',
        duration: 3,
        dependsOn: [5, 6],
        predecessors: ['F', 'G'],
        successors: [],
    },
    // Dummy: {
    //     name: 'Dummy',
    //     duration: -1,
    //     dependsOn: [3, 5],
    //     predecessors: ['C'],
    //     successors: ['I'],
    // },
});
