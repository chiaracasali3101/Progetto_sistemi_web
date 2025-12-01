<script lang="ts">
import { defineComponent } from "vue"
import { Articolo } from "../types"
import { Autore } from "../types";
import axios from "axios"

export default defineComponent({
    data() {
        return {
            autore: null as Autore | null,
            articoli: [] as Articolo[]
        }
    },
    methods: {
        getArticoliFromAutore() {
            axios.get("/api/articoli/autore/" + this.$route.params.idAutore)
                .then(response => this.articoli = response.data)
        },
        getAutore() {
            axios.get("/api/autore/" + this.$route.params.idAutore)
                .then(response => this.autore = response.data[0])
        }
    },
    mounted() {
        this.getArticoliFromAutore()
        this.getAutore()
    }
})
</script>


<template>
    <template v-if="autore">
        <h2>{{ autore.nome }} - {{ autore.username }}</h2>
        <p> {{ autore.argomenti }}</p>
        <article v-for="articolo in articoli">
            <img :src="'/img/' + articolo.imgarticolo" alt="" />
            <h3>{{ articolo.titoloarticolo }}</h3>
            <p>{{ articolo.nome }} - {{ articolo.dataarticolo.slice(0, 10) }}</p>
            <p>{{ articolo.anteprimaarticolo }}</p>
            <RouterLink :to="'/articolo/' + articolo.idarticolo">Leggi tutto</RouterLink>
        </article>
    </template>
</template>

<style scoped>
h2+p {
    text-align: center;
}
</style>
