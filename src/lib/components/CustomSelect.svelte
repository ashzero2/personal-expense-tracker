<script lang="ts">
	import { Popover, Button, Command } from '$lib/components/ui/EasyImport';

	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import type { SelectData } from '$lib/types';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';

	interface PropData {
		selectData: SelectData[];
		selectedValue: string;
	}

	let { selectData, selectedValue = $bindable() }: PropData = $props();

	let open = $state(false);
	let value = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{selectedValue || 'Food...'}
				<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="p-0">
		<Command.Root>
			<Command.Input placeholder="Search Categories..." />
			<Command.List>
				<Command.Empty>No Category found.</Command.Empty>
				<Command.Group>
					{#each selectData as data}
						<Command.Item
							value={data.value}
							onSelect={() => {
								selectedValue = data.value;
								closeAndFocusTrigger();
							}}
						>
							<Check class={cn('mr-2 size-4', value !== data.value && 'text-transparent')} />
							{data.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
