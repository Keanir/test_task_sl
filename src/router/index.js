import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/components/Home"
import Breed from "@/components/Breed"
import Favourites from "@/components/Favourites"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:breed",
    name: "Breed",
    props: true,
    component: Breed
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: Favourites
  },
  {
    path: "*",
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
