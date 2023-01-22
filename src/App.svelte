<script lang="ts">
  import {onMount} from 'svelte';
  import {COUNTRIES_API} from './constants/api';

  onMount(async () => {
    const countriesRes = await fetch(COUNTRIES_API);
    const countriesData = await countriesRes.json();
    console.log("Data", countriesData);
  });
</script>

<main>
  <h1>Flag Colors</h1>
</main>

<style>

</style>