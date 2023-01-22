<script lang="ts">
    export let country;
    export let toggleModal;

</script>

<article class="country__card" on:click={() => toggleModal(country.cca2, country.name.common)}>
    <p>{country.name.common}</p>
    <img style="outline: 1px solid #e7e7e7" src={country.flags[1]} />
</article>

<style>
    .country__card {
        cursor: pointer;
        transition: bottom 0.25s;
        bottom: 0;
    }

    .country__card:hover {
        position: relative;
        bottom: 5px;
    }
</style>