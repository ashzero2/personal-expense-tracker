<script lang="ts">
	import { setContext } from 'svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { data, children } = $props()
  let { session, supabase } = $derived(data)

	setContext('supabase', supabase);
</script>

<ModeWatcher />
{@render children()}
