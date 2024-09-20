import { persisted } from 'svelte-persisted-store';

// Worksheet - Fact
// 0 add
// 1 Sub 
// 2 Mul
// 3 Div
// 4 AddSub
// 5 AddMul
// 6 MulDiv
// 7 All

// Worksheet - Type
// 0 horizontal
// 1 blank
// 2 vertical

export const mathWorksheetStore = persisted('mathWorksheetStore', {});