<script lang="ts">
  import { mathWorksheetStore } from '$lib/store/store';
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import Label from "$lib/components/ui/label/label.svelte";
  import { cn } from "$lib/utils.js";
  import * as m from '$lib/paraglide/messages.js';

  let mathWorksheet;
	mathWorksheetStore.subscribe((value) => {
		mathWorksheet = value;
	});

	const updateMathWorksheet = (value) => {
		mathWorksheetStore.update(() => value);
	};
  
  const o1Add = m.math_bf_sb_o1_add();
  const o1Sub = m.math_bf_sb_o1_sub();
  const o1Mul = m.math_bf_sb_o1_mul();
  const o1Div = m.math_bf_sb_o1_div();
  const o1AddSub = m.math_bf_sb_o1_addsub();
  const o1AddMul = m.math_bf_sb_o1_addmul();
  const o1MulDiv = m.math_bf_sb_o1_muldiv();
  const o1All = m.math_bf_sb_o1_all();

  const mathFacts = [
   {
    id: 0,
    value: "add",
    label: o1Add
   },
   {
    id: 1,
    value: "sub",
    label: o1Sub
   },
   {
    id: 2,
    value: "mul",
    label: o1Mul
   },
   {
    id: 3,
    value: "div",
    label: o1Div
   },
   {
    id: 4,
    value: "addsub",
    label: o1AddSub
   },
   {
    id: 5,
    value: "addmul",
    label: o1AddMul
   },
   {
    id: 6,
    value: "muldiv",
    label: o1MulDiv
   },
   {
    id: 7,
    value: "all",
    label: o1All
   }
  ];
  
  let open = $state(false);
  let value = $state("");
  
  let selectedValue = $derived.by(()=> {
    return mathFacts.find((f) => f.value === value)?.label ?? o1Add;
  });

  let selectedId = $derived.by(()=> {
    return mathFacts.find((f) => f.value === value)?.id ?? 0;
  });

  $effect(() => {
		mathWorksheet.config.fact = selectedId;
		updateMathWorksheet(mathWorksheet);
	});

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
   open = false;
   tick().then(() => {
    document.getElementById(triggerId)?.focus();
   });
  }
 </script>
  
 <Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
   <Label for="number">{m.math_bf_sb_o1_title()}</Label>
   <Button
    builders={[builder]}
    variant="outline"
    role="combobox"
    aria-expanded={open}
    class="w-full md:w-[200px] justify-between"
   >
    {selectedValue}
    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
   </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[312px] md:w-[200px] p-0">
   <Command.Root>
    <Command.Group>
     {#each mathFacts as mathFact}
      <Command.Item
       value={mathFact.value}
       onSelect={(currentValue) => {
        value = currentValue;
        closeAndFocusTrigger(ids.trigger);
       }}
      >
       <Check
        class={cn(
         "mr-2 h-4 w-4",
         value !== mathFact.value && "text-transparent"
        )}
       />
       {mathFact.label}
      </Command.Item>
     {/each}
    </Command.Group>
   </Command.Root>
  </Popover.Content>
 </Popover.Root>