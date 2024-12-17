<script lang="ts">
	// @ts-nocheck
	import AddExpense from '$lib/components/AddExpense.svelte';
	import TimeLine from '$lib/components/TimeLine.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	import Content from '$lib/components/Content.svelte';
  let timelineData = [
    {
      title: "Svelte 5",
      content: Content,
    },
    {
      title: "Early 2023",
      content: Content,
    },
    {
      title: "Changelog",
      content: Content,
    },
  ];

	let userExpense: number | undefined = $state(0);
	async function updateExpense() {
		const { data } = await supabase.from('expenses').select('amount');
		userExpense = data?.reduce((sum, i) => sum + i.amount, 0);
	}

	onMount(async () => {
		const { data } = await supabase.from('expenses').select('amount');
		userExpense = data?.reduce((sum, i) => sum + i.amount, 0);
	});
</script>

<main>
	<h2>{userExpense}</h2>
	<AddExpense {updateExpense} />
	<TimeLine {timelineData}></TimeLine>
</main>
