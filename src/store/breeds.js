// Store для пёселей

import Axios from "axios"
import { extractBreed, extractSubBreed, changeName } from "@/common.js"

// Класс для собаки, с ссылкой на изображение и полным названием породы
class Dog {
  constructor(url, fullBreed) {
    this.url = url
    this.fullBreed = fullBreed
  }
}

export default {
  state: {
    dogs: [],
    choosenDog: [],
    currentDog: null,
    breedsList: null,
    menu: null,
    sort: false
  },
  // Геттеры
  getters: {
    // Общий список собак из рандома API
    getDogs(state) {
      return state.dogs
    },
    // Список для выбранной породы из меню
    getChoosenDog(state) {
      return state.choosenDog
    },
    // Название текущей выбранной породы
    getCurrentDog(state) {
      return state.currentDog
    },
    // Полный список пород с разновидностями
    getBreedsList(state) {
      return state.breedsList
    },
    // Список для меню с заглавными буквами
    getMenu(state) {
      return state.menu
    },
    // Флаг для чекбокса сортировки
    getSort(state) {
      return state.sort
    },
    // Отсортированный список по алфавиту на основе полного названия породы
    // Сортировка не изменяет массива, что позволяет при переключении чекбокса
    // обратно вернуть рандомное расположение
    getSortedList(state) {
      return [...state.dogs].sort((a, b) =>
        a.fullBreed === b.fullBreed ? 0 : a.fullBreed > b.fullBreed ? 1 : -1
      )
    }
  },
  // Мутации
  mutations: {
    SET_DOGS(state, payload) {
      state.dogs.push(payload)
    },
    SET_CHOOSEN_DOG(state, payload) {
      state.choosenDog.push(payload)
    },
    SET_CURRENT_DOG(state, payload) {
      state.currentDog = payload
    },
    SET_BREEDS_LIST(state, payload) {
      state.breedsList = payload
    },
    // Массив для выпадающего меню из общего списка всех пород.
    // В начале используется объект для создания пар с ключом (первая буква) и значением.
    // Проверяется каждая первая буква у названия породы. По результатам проверки
    // порода помещается на свое место по ключу. В конце формируется массив из итогового объекта.
    SET_MENU(state, payload) {
      let letter = ""
      let menu = new Map()
      Object.keys(payload).forEach(key => {
        if (letter !== key.charAt(0)) {
          letter = key.charAt(0)
          menu.set(letter, [key])
        } else {
          menu.get(letter).push(key)
        }
      })
      state.menu = Array.from(menu)
    },
    SET_SORT(state, payload) {
      state.sort = payload
    },
    CLEAR_DOGS(state) {
      state.dogs = []
    },
    CLEAR_CHOOSEN_DOG(state) {
      state.choosenDog = []
    }
  },
  // Действия
  actions: {
    // Загрузка полного списка пород.
    async loadBreedsList({ commit }) {
      // Очистка ошибок
      commit("CLEAR_ERROR")
      // Loading = true, для отображения индикатора загрузки.
      commit("SET_LOADING", true)
      try {
        // Получение списка и вызов мутаций для списка и меню.
        let data = await Axios.get("https://dog.ceo/api/breeds/list/all")
        commit("SET_BREEDS_LIST", data.data.message)
        commit("SET_MENU", data.data.message)
        commit("SET_LOADING", false)
      } catch (error) {
        // Обработка ошибки, если загрузка не удалась.
        commit("SET_ERROR", error.message)
        commit("SET_LOADING", false)
        throw error
      }
    },
    // Загрузка рандомных изображений всех собак
    async loadRandomDogs({ state, commit }, payload) {
      commit("CLEAR_ERROR")
      commit("SET_LOADING", true)
      // Если получен ключ new, то вызывается мутация для очистки массива dogs.
      if (payload.new) commit("CLEAR_DOGS")
      try {
        const data = await Axios.get(
          "https://dog.ceo/api/breeds/image/random/20"
        )
        // Переменные для списка ссылок на изображения и полного списка собак.
        const urls = data.data.message
        const breeds = state.breedsList
        // Из каждой ссылки получаем название породы, список её разновидностей,
        // далее из ссылки получаем название конкретной разновидности.
        Object.keys(urls).forEach(key => {
          const breed = extractBreed(urls[key])
          const subBreedList = breeds[breed] ? breeds[breed] : []
          const subBreed = subBreedList.find(
            el => el === extractSubBreed(urls[key])
          )
          // Создается полное название и вызывается мутация для добавления
          // текущего пёселя в массив.
          const fullBreed = changeName(breed, subBreed)
          commit("SET_DOGS", new Dog(urls[key], fullBreed))
        })
        commit("SET_LOADING", false)
      } catch (error) {
        commit("SET_ERROR", error.message)
        commit("SET_LOADING", false)
        throw error
      }
    },
    // Загрузка изображений для выбранной породы.
    async loadDogByBreed({ state, commit }, payload) {
      commit("CLEAR_ERROR")
      commit("SET_LOADING", true)
      // Очистка массива выбранной породы, если передан флаг new.
      if (payload.new) commit("CLEAR_CHOOSEN_DOG")
      try {
        const data = await Axios.get(
          // В .url содержится нужное название дял подстановки в ссылку.
          "https://dog.ceo/api/breed/" + payload.url + "/images/random/20"
        )
        const urls = data.data.message
        const breeds = state.breedsList
        Object.keys(urls).forEach(key => {
          const breed = extractBreed(urls[key])
          const subBreedList = breeds[breed] ? breeds[breed] : []
          const subBreed = subBreedList.find(
            el => el === extractSubBreed(urls[key])
          )
          const fullBreed = changeName(breed, subBreed)
          commit("SET_CHOOSEN_DOG", new Dog(urls[key], fullBreed))
        })
        commit("SET_LOADING", false)
      } catch (error) {
        commit("SET_ERROR", error.message)
        commit("SET_LOADING", false)
        throw error
      }
    },
    // Действия для выозова мутаций по установке текущей породы и состояния
    // чекбокса сортировки.
    sortDogs({ commit }, payload) {
      commit("SET_SORT", payload)
    },
    setCurrentDog({ commit }, payload) {
      commit("SET_CURRENT_DOG", payload)
    }
  }
}
