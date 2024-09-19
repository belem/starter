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
// 1 Blank
// 3 Vertical

export const mathWorksheetStore = persisted('mathWorksheetStore', {
  config: {
    fact: 0,
    number: 20,
    range: 10,
    type: 0,
    carrying: false,
    borrowing: false
  },
  worksheet: {}
});