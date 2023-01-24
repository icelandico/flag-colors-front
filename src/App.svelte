<script lang="ts">
    import '@picocss/pico'
    import {onMount} from 'svelte';
    import {COUNTRIES_API} from './constants/api';
    import Header from "./components/Header.svelte";
    import Searchbar from "./components/Searchbar.svelte";
    import type {Country, CountryColors} from "./types/api";
    import CountryCard from "./components/CountryCard.svelte";
    import {COUNTRY_COLORS} from "./constants/country_colors";
    import AuthorTab from "./components/AuthorTab.svelte";
    import Modal from "./components/Modal.svelte";

    let countries: Country[];
    let filteredCountries = [];
    let modalOpened = false;
    let countryColorsData: CountryColors;
    let chosenCountry = '';
    let searchTerm = '';

    onMount(async () => {
        const countriesRes = await fetch(COUNTRIES_API);
        const countriesData = await countriesRes.json();
        countries = countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common))
        filteredCountries = countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common));
    });

    function searchCountry() {
        filteredCountries = countries.filter(country => {
            const countryName = country.name.common;
            return countryName.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }

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
    <Searchbar bind:searchTerm on:input={searchCountry}/>
    {#if !countries}
        <article aria-busy="true"></article>
    {/if}
    <div class="countries__container">
        {#if filteredCountries.length > 0}
            {#each filteredCountries as country (country.cca3)}
                <CountryCard country={country} toggleModal={toggleModal} />
            {/each}
        {/if}
    </div>
    <AuthorTab />
    <Modal bind:modalOpened bind:chosenCountry bind:countryColorsData closeModal={closeModal} />
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