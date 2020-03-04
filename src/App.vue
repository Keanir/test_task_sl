<template>
  <div id="app">
    <header class="header">
      <router-link :to="{ name: 'Home' }">
        <div class="logo" @click="cancel"></div>
      </router-link>
      <router-link class="fav-dogs_text" active-class="fav-active" :to="{ name: 'Favourites' }">
        <span @click="cancel">Избранные пёсели</span>
      </router-link>
    </header>
    <main class="main">
      <filter-breeds />
      <router-view></router-view>
    </main>
    <div v-if="error">
      <h2 class="error">Ooops, sorry! Something wrong :(</h2>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FilterBreeds from "./components/FilterBreeds";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    "filter-breeds": FilterBreeds,
    Footer
  },
  // Загрузка списка всех пород во время инициализации компонента.
  beforeCreate() {
    this.$store.dispatch("loadBreedsList");
  },
  // Слежение за состоянием error, и вывод сообщения, если ошибка произошла.
  computed: {
    ...mapGetters(["loading", "error"])
  },
  // Сброс значения выбора текущей породы.
  methods: {
    ...mapActions(["setCurrentDog"]),
    cancel() {
      this.setCurrentDog(null);
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  ::before,
  ::after {
    box-sizing: border-box;
  }
}

// Размер установлен в 10px для удобства расчета размеров в rem.
html {
  font-size: $basic-font-size;
}

body {
  background: $bg-color;
  font-family: "IBMfont";
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
}

.main {
  max-width: 128rem;
  margin: 0 auto;
}

.header {
  max-width: 128rem;
  margin: 0 auto;
  display: flex;
  background-color: $header-bg-color;
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.7);
}

.logo {
  display: inline-block;
  background: make-icon($logo);
  width: 11.8rem;
  height: 2.7rem;
  margin: 3.5rem 0 3.8rem 6rem;
}

.fav-dogs_text {
  color: $inactive;
  position: relative;
  display: inline-block;
  margin: 3.8rem 6rem 3.4rem auto;
  text-decoration: none;
  span {
    font-size: 1.6rem;
    line-height: 2.8rem;
    letter-spacing: 0.01em;
  }
  &::after {
    content: make-icon($heart, $inactive);
    display: inline-flex;
    vertical-align: middle;
    margin-left: 1rem;
    margin-bottom: 0.2rem;
  }
  &:hover {
    color: $white;
    &::after {
      content: make-icon($heart);
    }
  }
}

.fav-active {
  color: $white;
  &::after {
    content: make-icon($heart);
  }
}

.error {
  text-align: center;
  font-size: 3.6rem;
  color: $white;
}
</style>
