import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import UploadView from "../views/UploadView.vue";
import ResultsView from "../views/ResultsView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/upload",
    name: "Upload",
    component: UploadView,
    meta: { requiresAuth: true },
  },
  {
    path: "/results",
    name: "Results",
    component: ResultsView,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 가드
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken");

  // 인증이 필요한 페이지인데 토큰이 없으면 로그인 페이지로
  if (to.meta.requiresAuth && !token) {
    next("/login");
  }
  // 로그인/회원가입 페이지인데 이미 토큰이 있으면 업로드 페이지로
  else if ((to.path === "/login" || to.path === "/signup") && token) {
    next("/upload");
  } else {
    next();
  }
});
