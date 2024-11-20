<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import type { PageData } from "../../.svelte-kit/types/src/routes/$types";

  let { data }: { data: PageData } = $props();

  console.log(data);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="p-8">
  <Alert>
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
</div>

<ul>
  {#each data.roles ?? [] as role}
    <li>{role.id}: {role.name}</li>
  {/each}
</ul>
