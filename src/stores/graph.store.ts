import { writable } from 'svelte/store';
import Graph from '../utils/graph';

export const graphStore = writable(new Graph());
export const criticalPath = writable([]);
