<script lang="ts">
  import '@picocss/pico';
  import { onMount } from 'svelte';
  import { COUNTRIES_API } from './constants/api';
  import Header from './components/Header.svelte';
  import Searchbar from './components/Searchbar.svelte';
  import type { Country, CountryColors } from './types/api';
  import CountryCard from './components/CountryCard.svelte';
  import { COUNTRY_COLORS } from './constants/country_colors';
  import AuthorTab from './components/AuthorTab.svelte';
  import Modal from './components/Modal.svelte';
  import NoResults from './components/NoResults.svelte';

  let countries: Country[] = [];
  let filteredCountries = [];
  let modalOpened = false;
  let countryColorsData: CountryColors;
  let chosenCountry = '';
  let searchTerm = '';

  const getCountriesArray = (collection) => {
    const countriesKeys = Object.keys(collection);
    return countriesKeys.map((key) => {
      const countryObject = collection[key];
      return {
        code: key,
        name: countryObject.country,
        region: countryObject.region,
      };
    });
  };

  onMount(async () => {
  try {
    const PROXY_URL = 'https://corsproxy.io/?';
    const countriesRes = await fetch(PROXY_URL + encodeURIComponent(COUNTRIES_API));
    const countriesCollection = await countriesRes.json();
    countries = getCountriesArray(countriesCollection.data);
    filteredCountries = getCountriesArray(countriesCollection.data);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    });
  }
});

  function searchCountry() {
    filteredCountries = countries.filter((country) => {
      const countryName = country.name;
      return countryName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  function toggleModal(countryCode: string, countryName) {
    countryColorsData = getCountryColors(countryCode);
    modalOpened = true;
    chosenCountry = countryName;
  }

  function closeModal() {
    countryColorsData = null;
    modalOpened = false;
    chosenCountry = '';
  }

  function getCountryColors(countryCode: string) {
    return COUNTRY_COLORS.find(
      (el) => el.country === countryCode.toLowerCase()
    );
  }
</script>

<main class="main-container">
  <Header />
  <Searchbar bind:searchTerm on:input={searchCountry} />
  {#if !countries}
    <article aria-busy="true"></article>
  {/if}
  {#if searchTerm && filteredCountries.length === 0}
    <NoResults />
  {/if}
  <div>Results: {filteredCountries.length}</div>
  <div class="countries__container">
    {#if filteredCountries.length > 0}
      {#each filteredCountries as country (country.name)}
        <CountryCard {country} {toggleModal} />
      {/each}
    {/if}
  </div>
  <AuthorTab />
  <Modal
    bind:modalOpened
    bind:chosenCountry
    bind:countryColorsData
    {closeModal}
  />
</main>

<style>
  .main-container {
    width: 100%;
  }

  .countries__container {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-column-gap: 15px;
    grid-template-rows: repeat(auto-fit, 1fr);
  }

  @media (min-width: 768px) {
    .countries__container {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-column-gap: 15px;
      grid-row-gap: 10px;
    }
  }
</style>
