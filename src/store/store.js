import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // apiBase: "https://api.openweathermap.org/data/2.5/",
    apiBase: "https://philippines-weather-backend.onrender.com/api/",
    // apiKey: "YOUR_API_KEY",   // Create Api Key from https://openweathermap.org
    defaultSearch: "Biñan",
    search: "Biñan",
    isError: false,
    weatherData: {},
    philippines_cities: [],
  },
  getters: {
    getWeatherMain(state) {
      const { city, temp, feelsLike, description, icon, info } = state.weatherData;
      return {
        city,
        temp,
        feelsLike,
        description,
        info,
        icon,
      };
    },
    getPhilippineCities(state) {
      return state.philippines_cities;
    },
    getWeatherInfo(state) {
      const { wind, clouds, humidity } = state.weatherData;
      return {
        wind,
        clouds,
        humidity,
      };
    },
    getWeatherCountry(state) {
      return state.weatherData.country;
    },
    isSearched(state) {
      return state.search !== "";
    },
    getError(state) {
      return state.isError;
    },
  },
  mutations: {
    ["SET_SEARCH"](state, search) {
      state.search = search;
    },
    ["SET_WEATHER_DATA"](state, data) {
      state.weatherData = data;
    },
    ["SET_ERROR"](state, value) {
      state.isError = value;
    },
    ["SET_PHILIPPINE_CITIES"](state, cities) {
      state.philippines_cities = cities;
    },
  },
  actions: {
    async fetchWeatherData({ commit, state }, search) {
      try {
        // commit("SET_WEATHER_DATA", state);

        commit("SET_SEARCH", search);
        const response = await axios.get(
          `${state.apiBase}weather/city/${search}`
        );

        const newWeatherData = {
          city: response.data.data.city,
          temp: response.data.data.temperature,
          // tempMin: response.data.main.temp_min,
          // tempMax: response.data.main.temp_max,
          feelsLike: response.data.data.feels_like,
          description: response.data.data.description,
          icon: response.data.data.icon,
          // info: response.data.weather[0].main,
          wind: response.data.data.wind_speed,
          humidity: response.data.data.humidity,
          clouds: response.data.data.cloud_cover,
          // country: response.data.sys.country,
        };
        commit("SET_WEATHER_DATA", newWeatherData);
        commit("SET_ERROR", false);
      } catch (error) {
        console.log(error);
        commit("SET_ERROR", true);
        commit("SET_WEATHER_DATA", {});
      }
    },

    async fetchPhilippineCities({ commit, state }) {
      try {
        const response = await axios.get(`${state.apiBase}philippines/cities`);
        commit("SET_PHILIPPINE_CITIES", response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default store;
