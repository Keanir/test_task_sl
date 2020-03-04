<template>
  <!-- Фильтр для выбора конкретной породы. -->
  <div v-if="!loading" class="filter">
    <div class="toggles">
      <!-- Переключатель для отображения списка. -->
      <div class="dropdown-menu">
        <input type="checkbox" id="dropdown" @click="toggle = !toggle" />
        <label class="dropdown" for="dropdown">Породы</label>
      </div>
      <div>
        <!-- Текущая выбранная порода. -->
        <button
          class="breed selected"
          v-if="getCurrentDog"
          @click="cancel"
        >{{ change(getCurrentDog) }}</button>
      </div>
      <!-- Чекбокс для сортировки по алфавиту, скрыт при выбранной породе из списка. -->
      <div class="abc-sort" v-show="!getCurrentDog && $route.path !== '/favourites'">
        <label class="toggle-label" for="toggle">Сортировка по алфавиту</label>
        <input class="toggle" id="toggle" type="checkbox" v-model="sort" @change="setSortType" />
      </div>
    </div>

    <router-link :to="'/'" class="breed all-dogs-btn" v-show="toggle">
      <div @click="cancel">Все пёсели</div>
    </router-link>
    <!-- Список пород для выбора. -->
    <div class="breeds-list" v-show="toggle">
      <div class="breeds-section" v-for="item in getMenu" :key="item.id">
        <span class="letter">{{ item[0] }}</span>
        <router-link class="breed" v-for="breed in item[1]" :key="breed.id" :to="'/' + breed">
          <div @click="setBreed(breed)">{{ change(breed) }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { changeName } from "@/common.js";

export default {
  name: "FilterBreeds",
  data() {
    return {
      toggle: false,
      sort: false
    };
  },
  computed: {
    ...mapGetters(["loading", "getMenu", "getCurrentDog"])
  },
  methods: {
    ...mapActions(["sortDogs", "setCurrentDog", "loadDogByBreed"]),
    // Метод для изменения названия породы.
    change(el) {
      return changeName(el);
    },
    // Изменение состояния флага чекбокса в сторе.
    setSortType() {
      this.sortDogs(this.sort);
    },
    // Устанавливаем выбранную породу в стор и вызываем действие
    // для загрузки изображений выбранной породы.
    setBreed(el) {
      this.toggle = false;
      this.setCurrentDog(el);
      this.loadDogByBreed({ new: true, url: el });
    },
    // Отмена выбора
    cancel() {
      this.toggle = false;
      this.setCurrentDog(null);
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  max-width: 1161px;
  margin: 4.4rem auto 5rem auto;
}
.toggles {
  display: flex;
  margin-bottom: 3rem;
  width: 100%;
  .dropdown {
    position: relative;
    display: inline-block;
    margin-right: 2rem;
    width: 81px;
    border-bottom: 0.5px dashed $white;
    cursor: pointer;
    font-size: 1.6rem;
    line-height: 2.2rem;
    letter-spacing: 0.01em;
    color: $white;
    &::after {
      content: "";
      position: relative;
      display: inline-block;
      left: 1rem;
      bottom: 0.3rem;
      color: $white;
      width: 0.6rem;
      height: 0.6rem;
      border-width: 0.1rem 0.1rem 0 0;
      border-style: solid;
      transform: rotate(135deg);
    }
  }
  #dropdown {
    ~ .dropdown::after {
      transition: transform 0.3s ease-out;
    }
    display: none;
    &:checked ~ .dropdown::after {
      bottom: 0;
      transform: rotate(315deg);
    }
  }
  .abc-sort {
    display: inline;
    margin-left: auto;
    .toggle-label {
      position: relative;
      display: inline-block;
      margin-right: 1.5rem;
      font-size: 1.6rem;
      line-height: 2.8rem;
      text-align: right;
      letter-spacing: 0.01em;
      color: $inactive;
    }
    .toggle {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      appearance: none;
      cursor: pointer;
      width: 2.9rem;
      height: 1.45rem;
      border-radius: 0.9rem;
      border: 1px solid $inactive;
      overflow: hidden;
      outline: none;
      &:checked {
        border-color: $active;
      }
      &::before {
        content: "";
        display: block;
        position: absolute;
        z-index: 2;
        width: 0.9rem;
        height: 0.9rem;
        left: 0.3rem;
        top: 0.175rem;
        border-radius: 50%;
        border: 1px solid $inactive;
        background-color: $inactive;
        transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
      }
      &:checked:before {
        left: 1.5rem;
        border-color: $active;
        background-color: $active;
      }
    }
  }
}
.breeds-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 1149px;
}
.breeds-section {
  display: contents;
  height: 2.8rem;
  .letter {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    line-height: 2.8rem;
    color: $inactive;
    text-transform: uppercase;
  }
}
.breed {
  background: transparent;
  cursor: pointer;
  height: 2.4rem;
  margin-right: 1.4rem;
  margin-top: 0.3rem;
  font-size: 1.2rem;
  line-height: 1.6rem;
  outline: none;
  text-decoration: none;
  color: $inactive;
  border: 1px solid $inactive;
  border-radius: 2rem;
  &:hover {
    border-color: $active;
    color: $active;
  }
  &:last-child {
    margin-right: 4rem;
  }
  &.selected {
    padding: 0 1.2rem;
    color: $active;
    border-color: $active;
    &::after {
      content: make-icon($close);
      margin-left: 0.8rem;
    }
  }
  &.all-dogs-btn {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 1.7rem;
    color: $active;
    border-color: $active;
  }
  div {
    display: inline;
    vertical-align: middle;
    padding: 0 1.15rem;
  }
}
</style>