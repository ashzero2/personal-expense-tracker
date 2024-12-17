<script lang="ts">
	import {
		Dialog,
		Drawer,
		Input,
		Label,
		Button,
		buttonVariants
	} from '$lib/components/ui/EasyImport';

	import { onMount } from 'svelte';
	import { MediaQuery } from 'runed';
	import { supabase } from '$lib/supabaseClient';
	import CustomSelect from './CustomSelect.svelte';
	import { type Category, type SelectData } from '$lib/types';

	let open = $state(false);
	const isDesktop = new MediaQuery('(min-width: 768px)');

	type PropData = {
		updateExpense: () => void;
	};

	let { updateExpense }: PropData = $props();

	let selectData: SelectData[] = [];
	onMount(async () => {
		const { data } = await supabase.from('categories').select();
		data?.forEach((data: Category) => {
			selectData.push({
				value: data.name,
				label: data.name
			});
		});
	});

	let amount: number = $state(0);
	let description: string = $state("");
	let selectedValue: string = $state("");
	async function addExpense() {
		const { data, error } = await supabase.from('expenses').insert([
			{
				user_id: '3f67f599-cce7-4d2c-8515-08374ead189c',
				category_id: 'ad62f069-8dac-4c22-ac69-ffcf7fcde63e',
				amount: amount,
				description: description,
				date: new Date().toISOString().toLocaleString()
			}
		]);
		updateExpense();
		amount = 0;
		description = '';
		selectedValue = '';
		open = false;
	}
</script>

{#if isDesktop.matches}
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add Expense</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Add Expense</Dialog.Title>
			</Dialog.Header>
			<form class="grid items-start gap-4">
				<div class="grid gap-2">
					<Label for="amount">Amount</Label>
					<Input type="number" id="amount" bind:value={amount} placeholder="420" />
				</div>
				<div class="grid gap-2">
					<Label for="Description">Description</Label>
					<Input id="Description" bind:value={description} placeholder="For biryani" />
				</div>
				<div class="grid gap-2">
					<Label for="amount">Category</Label>
					<CustomSelect {selectData} bind:selectedValue />
				</div>
				<Button type="submit" onclick={addExpense}>Add Expense</Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Add Expense</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Add Expense</Drawer.Title>
			</Drawer.Header>
			<form class="grid items-start gap-4 px-4">
				<div class="grid gap-2">
					<Label for="amount">Amount</Label>
					<Input type="number" id="amount" bind:value={amount} />
				</div>
				<div class="grid gap-2">
					<Label for="Description">Description</Label>
					<Input id="Description" bind:value={description} />
				</div>
				<div class="grid gap-2">
					<Label for="amount">Category</Label>
					<CustomSelect {selectData} bind:selectedValue />
				</div>
				<Button type="submit" onclick={addExpense}>Add Expense</Button>
			</form>
			<Drawer.Footer class="pt-2">
				<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
