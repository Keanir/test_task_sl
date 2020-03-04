<template>
  <!-- Footer сайта с подключенным компонентом бесконечного скролла. -->
  <footer class="footer">
    <!-- Если идет загрузка, то отображается анимация из трех кружков. -->
    <div v-if="loading" class="loader">
      <div class="item-1"></div>
      <div class="item-2"></div>
      <div class="item-3"></div>
    </div>
    <!-- Стрелка вверх для перехода к началу страницы. -->
    <a href="#" class="arrow"></a>
    <Scroll @trigger="loadMoreDogs" />
  </footer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Scroll from "@/components/Scroll";

export default {
  name: "App",
  components: {
    Scroll
  },
  computed: {
    ...mapGetters(["loading", "getCurrentDog"])
  },
  methods: {
    ...mapActions(["loadDogByBreed", "loadRandomDogs"]),
    // Загрузка дополнительных изображений в соответствии с выбранной
    // породой или в случайном порядке с флагом false, чтобы изображения
    // добавлялись к текущим.
    loadMoreDogs() {
      if (this.getCurrentDog) {
        this.loadDogByBreed({
          new: false,
          url: this.getCurrentDog
        });
      } else {
        this.loadRandomDogs({ new: false });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  max-width: 1161px;
  height: 180px;
  position: relative;
  margin: 6.7rem auto 0 auto;
  display: flex;
  flex-direction: row;
}

.loader {
  display: flex;
  position: absolute;
  top: 5%;
  left: 50%;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
  height: 1.6rem;
  width: 7rem;
}

@for $i from 1 through 3 {
  .item-#{$i} {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid $white;
    border-radius: 50%;
    animation: scale 2s infinite;
    animation-delay: 200ms * $i;
    transition-timing-function: linear;
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  25% {
    scale: (1.11);
  }
  75% {
    scale: (1.22);
  }
  100% {
    transform: scale(1.33);
  }
}

.arrow {
  display: block;
  margin-left: auto;
  background: make-icon($arrow) no-repeat center;
  width: 5.5rem;
  height: 5.5rem;
  border: 1px solid $white;
  border-radius: 50%;
  &:hover {
    border-color: $active;
    background: make-icon($arrow, $active) no-repeat center;
  }
}
</style>
