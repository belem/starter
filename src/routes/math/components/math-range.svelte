<script lang="ts">
  import { tick } from "svelte";
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { cn } from "$lib/utils.js";
  import * as m from '$lib/paraglide/messages.js';
  
  // Type definition for math range
  interface MathRange {
    id: number;
    value: string;
    label: string;
  }
  
  // Centralize range generation
  const generateMathRanges = (): MathRange[] => [
    {
      id: 10,
      value: "range_10",
      label: m.math_bf_sb_o4_10()
    },
    {
      id: 20,
      value: "range_20",
      label: m.math_bf_sb_o4_20()
    },
    {
      id: 50,
      value: "range_50",
      label: m.math_bf_sb_o4_50()
    },
    {
      id: 100,
      value: "range_100",
      label: m.math_bf_sb_o4_100()
    },
    {
      id: 1000,
      value: "range_1000",
      label: m.math_bf_sb_o4_1000()
    },
    {
      id: 10000,
      value: "range_10000",
      label: m.math_bf_sb_o4_10000()
    },
    {
      id: 100000,
      value: "range_100000",
      label: m.math_bf_sb_o4_100000()
    }
  ];
  
  // Default configuration
  const DEFAULT_RANGE_ID = 20;
  const DEFAULT_RANGE_VALUE = "range_20";
  
  // State management
  let open = $state(false);
  let value = $state(DEFAULT_RANGE_VALUE);
  
  // Memoized ranges to avoid repeated computation
  const mathRanges = $state.raw(generateMathRanges());
  
  // Derived states with improved error handling
  const selectedValue = $derived.by(() => 
    mathRanges.find((f) => f.value === value)?.label ?? 
    m.math_bf_sb_o4_20()
  );
  
  const selectedId = $derived.by(() => 
    mathRanges.find((f) => f.value === value)?.id ?? 
    DEFAULT_RANGE_ID
  );
  
  // Expose selected range to parent components
  export function getSelectedRange(): number {
    return selectedId;
  }
  
  // Improved focus management with better type safety
  function closeAndFocusTrigger(triggerId: string): void {
    open = false;
    
    // Use optional chaining and nullish coalescing for safer access
    void tick().then(() => {
      const triggerElement = document.getElementById(triggerId);
      triggerElement?.focus();
    });
  }
  </script>
  
  <Popover.Root bind:open let:ids>
    <Popover.Trigger asChild let:builder>
      <Label for="number">{m.math_bf_sb_o4_title()}</Label>
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
          {#each mathRanges as mathRange (mathRange.value)}
            <Command.Item
              value={mathRange.value}
              onSelect={(currentValue) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <Check
                class={cn(
                  "mr-2 h-4 w-4",
                  value !== mathRange.value && "text-transparent"
                )}
              />
              {mathRange.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>