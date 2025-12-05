<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2 class="auth-title">로그인</h2>
      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="auth-field">
          <label for="email">이메일</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div class="auth-field">
          <label for="password">비밀번호</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div class="auth-actions auth-actions-row">
          <span class="signup-link" @click="goSignup">회원가입</span>
          <button type="submit" class="primary-btn">로그인</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authAPI } from "../api/api.js";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    console.log("로그인 시도:", { email: email.value });

    const response = await authAPI.login({
      email: email.value,
      password: password.value,
    });

    console.log("로그인 응답:", response);

    // 응답 구조 확인
    if (response.data && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("토큰 저장 완료");
      router.push("/upload");
    } else if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      console.log("토큰 저장 완료");
      router.push("/upload");
    } else {
      console.error("토큰이 응답에 없음:", response);
      alert("로그인 응답 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    console.error("로그인 에러:", error);
    alert("로그인에 실패했습니다: " + (error.message || "알 수 없는 오류"));
  }
};

const goSignup = () => {
  router.push("/signup");
};
</script>
