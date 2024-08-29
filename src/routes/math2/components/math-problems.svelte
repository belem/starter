<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import Label from "$lib/components/ui/label/label.svelte";
  import { cn } from "$lib/utils.js";
  
  const mathFacts = [
   {
    value: "add",
    label: "Addition Skills"
   },
   {
    value: "sub",
    label: "Subtraction Skills"
   },
   {
    value: "mul",
    label: "Multiplication Skills"
   },
   {
    value: "div",
    label: "Division Skills"
   },
   {
    value: "addsub",
    label: "Mixed Add & Sub"
   },
   {
    value: "addmul",
    label: "Mixed Add & Mul"
   },
   {
    value: "muldiv",
    label: "Mixed Mul & Div"
   },
   {
    value: "all",
    label: "All Operations"
   }
  ];
  
  let open = false;
  let value = "";
  
  $: selectedValue =
   mathFacts.find((f) => f.value === value)?.label ?? "Addition Skills";
  
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
   <Label for="number">Basic Math Facts</Label>
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