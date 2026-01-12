<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="min-h-screen flex flex-col text-white">
	<main class="w-full flex-1">
		{@render children()}
	</main>

	<footer class="py-3">
		<p class="text-xl text-center">
			Made with ❤️ by ShivaNach
		</p>
	</footer>
</div>



