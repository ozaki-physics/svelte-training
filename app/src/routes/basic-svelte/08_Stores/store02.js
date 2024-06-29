import { writable, derived } from 'svelte/store';

// 読み書き可能
export const name = writable('world');

// store に 基づいた store
export const greeting = derived(name, ($name) => `Hello ${$name}!`);
