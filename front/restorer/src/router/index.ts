import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import CreateArticleView from "../views/CreateArticleView.vue"
import ProfileView from "../views/ProfileView.vue"
import StatsView from "../views/StatsView.vue"
import ListArticlesView from "../views/ListArticlesView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/create_article",
    name: "createArticle",
    component: CreateArticleView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/stats",
    name: "stats",
    component: StatsView,
  },
  {
    path: "/edit_article",
    name: "editArticle",
    component: ListArticlesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
