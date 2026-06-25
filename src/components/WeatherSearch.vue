<template>

  <!-- <div class="weather-search">
    <input
      type="text"
      placeholder="Search City"
      class="search-control"
      v-model.trim="search"
      @keydown.enter="getData"
      />
    <span class="country" v-if="isSearched">({{getWeatherCountry}})</span>
    <div class="error" v-if="getError">No results found! fix it try again.</div>
  </div> -->

<div class="weather-search">
  <v-select
    v-model="search"
    :options="this.getPhilippineCities"
    placeholder="Search City"
    />
    <!-- class="search-control" -->

  <!-- <span class="country" v-if="isSearched">
    ({{ getWeatherCountry }})
  </span> -->

  <!-- <div class="error" v-if="getError">
    No results found! Fix it and try again.
  </div> -->
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'


export default {
  components: {
    vSelect
  },

  data() {
    return {
      search: this.$store.state.search,
    };
  },
  computed: {
    ...mapGetters(["isSearched", "getWeatherCountry", "getError", "getPhilippineCities"]),
  },
  watch: {
  search(city) {
    if (city) {
      this.getData(city);
    }
  }
},
  methods: {
    ...mapActions(["fetchWeatherData"]),
    getData() {
      this.fetchWeatherData(this.search);
    }
  }
};
</script>

<style lang="less" scoped>
.weather-search {
  position: relative;

  .v-select {
    width: 100%;
  }

  /* MAIN INPUT BOX */
  .vs__dropdown-toggle {
    height: 50px;
    border: 2px solid fade(black, 10);
    border-radius: 100px;
    background: transparent;
    padding: 0 20px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: none;
  }

  /* FOCUS STATE */
  .vs__dropdown-toggle:focus-within {
    background: #fff;
    border-color: fade(black, 5);
    box-shadow: 0 8px 16px fade(black, 20);
  }

  /* TEXT INPUT (fix cursor + spacing issue) */
  .vs__search {
    flex: 1;
    margin: 0 !important;
    padding: 0 !important;
    min-width: 0 !important;
    font-size: 16px;
  }

  .vs__search::placeholder {
    color: fade(black, 60);
  }

  /* SELECTED VALUE */
  .vs__selected {
    margin: 0;
    padding: 0;
    line-height: 50px;
  }

  .vs__selected-options {
    flex-wrap: nowrap;
    padding: 0;
    margin: 0;
  }

  /* DROPDOWN MENU */
  .vs__dropdown-menu {
    border-radius: 12px;
    margin-top: 8px;
    border: 1px solid fade(black, 10);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  /* OPTIONS */
  .vs__dropdown-option {
    padding: 10px 15px;
    font-size: 15px;
  }

  .vs__dropdown-option--highlight {
    background: #f2f2f2;
    color: #000;
  }

  /* CLEAR + ARROW ICONS */
  .vs__actions {
    padding-right: 10px;
  }

  /* REMOVE DEFAULT OUTLINE */
  .vs__dropdown-toggle,
  .vs__search {
    outline: none;
    box-shadow: none;
  }
}
</style>