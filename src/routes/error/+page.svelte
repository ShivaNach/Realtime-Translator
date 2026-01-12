<script lang="ts">
  import { page } from '$app/state';

  let message = new URLSearchParams(page.url.searchParams).get('msg') ?? 'An unexpected error occurred';
</script>

<main class="h-full flex flex-col items-center justify-center text-center p-6 text-white">
  <h1 class="text-4xl font-bold mb-4">Error</h1>
  <p class="text-xl mb-5">{message}</p>
    <a
      href="/"
      role="button"
      class="inline-block px-12 py-6 text-2xl font-bold bg-green-700 hover:bg-green-500 text-white rounded-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-200 transition"
    >
      Go to Home
    </a>
</main>