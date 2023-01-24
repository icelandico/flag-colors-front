<script lang="ts">
  import '@picocss/pico'
  import {onMount} from 'svelte';
  import {COUNTRIES_API} from './constants/api';
  import Header from "./components/Header.svelte";
  import Searchbar from "./components/Searchbar.svelte";
  import type {Country, CountryColors} from "./types/api";
  import CountryCard from "./components/CountryCard.svelte";
  import {COUNTRY_COLORS} from "./constants/country_colors";
  let countries: Country[];
  let modalOpened = false;
  let countryColorsData: CountryColors;
  let chosenCountry = '';

  onMount(async () => {
    const countriesRes = await fetch(COUNTRIES_API);
    const countriesData = await countriesRes.json();
    setTimeout(() => {
      countries = countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common)), 3000
    });
  });

  function toggleModal(countryCode: string, countryName) {
    countryColorsData = getCountryColors(countryCode);
    modalOpened = true;
    chosenCountry = countryName
  }

  function closeModal() {
    countryColorsData = null;
    modalOpened = false;
    chosenCountry = ''
  }

  function getCountryColors(countryCode: string) {
    return COUNTRY_COLORS.find(el => el.country === countryCode.toLowerCase());
  }

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
        <CountryCard country={country} toggleModal={toggleModal} />
      {/each}
    {/if}
  </div>
  <dialog id="modal-example" open={modalOpened}>
    <article>
      <a href="#close"
         aria-label="Close"
         class="close"
         data-target="modal-example"
         on:click={closeModal}>
      </a>
      <h3>Flag colors of: {chosenCountry}</h3>
      <div>
        {#if countryColorsData}
        {#each countryColorsData.flag_colors as color}
          <div class="color__item">
            <div class="color__sample" style={`background-color: rgb${color.colorCode}`}></div>
            <div class="color__percent">{color.percent} %</div>
          </div>
        {/each}
        {/if}
      </div>
      <footer>
        <a href="#cancel"
           role="button"
           class="secondary"
           data-target="modal-example"
           on:click={closeModal}>
          Close
        </a>
      </footer>
    </article>
  </dialog>
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

.color__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.color__sample {
  width: 30px;
  height: 30px;
  margin-right: 15px;
  border-radius: 50%;
  outline: 1px solid #e7e7e7;
}

</style>