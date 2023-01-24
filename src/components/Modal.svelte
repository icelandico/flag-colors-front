<script>
    export let modalOpened;
    export let chosenCountry;
    export let countryColorsData;
    export let closeModal;
</script>

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

<style>
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