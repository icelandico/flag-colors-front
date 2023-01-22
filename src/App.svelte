<script lang="ts">
  import '@picocss/pico'
  import {onMount} from 'svelte';
  import {COUNTRIES_API} from './constants/api';
  import Header from "./components/Header.svelte";
  import Searchbar from "./components/Searchbar.svelte";
  import type {Country} from "./types/api";
  let countries: Country[];

  onMount(async () => {
    const countriesRes = await fetch(COUNTRIES_API);
    const countriesData = await countriesRes.json();
    setTimeout(() => {
      countries = countriesData, 3000
    });
  });

</script>

<main class="main-container">
  <Header />
  <Searchbar />
  {#if !countries}
    <article aria-busy="true"></article>
  {/if}
  <div class="countries__container">
    {#if countries}
      {#each countries as country (country.cca3)}
        <article class="country__card">
          <p>{country.name.common}</p>
          <img style="outline: 1px solid #e7e7e7" src={country.flags[1]} />
        </article>
      {/each}
    {/if}
  </div>
</main>

<style>
.main-container {
  width: 100%;
}

.countries__container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 10px;
}

.country__card {
  cursor: pointer;
  transition: bottom 0.25s;
  bottom: 0;
}

.country__card:hover {
  position: relative;
  bottom: 8px;
}
</style>