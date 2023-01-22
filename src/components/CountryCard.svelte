<script lang="ts">
    export let country;
    export let toggleModal;

</script>

<article class="country__card" on:click={() => toggleModal(country.cca2, country.name.common)}>
    <div class="country__card-img">
        <img style="outline: 1px solid #e7e7e7; height: 100%; width: 100%" src={country.flags[1]} />
    </div>
    <h6 class="country__card-title">{country.name.common}</h6>
</article>

<style>
    .country__card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        transition: bottom 0.25s;
        bottom: 0;
        padding: 20px;
    }

    .country__card-title {
        margin: 0;
    }

    .country__card-img {
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .country__card {
            padding: 20px 10px;
            margin-top: 0;
            margin-bottom: 10px;
        }
        .country__card-title {
            font-size: 14px;
            margin: 0;
        }
    }

    .country__card:hover {
        position: relative;
        bottom: 5px;
    }
</style>