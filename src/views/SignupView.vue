<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2 class="auth-title">회원가입</h2>
      <form class="auth-form" @submit.prevent="handleSignup">
        <div class="auth-field">
          <label for="username">사용자명</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="사용자명을 입력하세요"
            required
          />
        </div>
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
        <div class="auth-field">
          <label for="passwordConfirm">비밀번호 확인</label>
          <input
            id="passwordConfirm"
            v-model="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </div>
        <div class="auth-actions auth-actions-row">
          <span class="signup-link" @click="goLogin">로그인</span>
          <button type="submit" class="primary-btn">회원가입</button>
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
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const handleSignup = async () => {
  if (password.value !== passwordConfirm.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    await authAPI.register({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    alert("회원가입이 완료되었습니다.");
    router.push("/login");
  } catch (error) {
    alert("회원가입에 실패했습니다.");
  }
};

const goLogin = () => {
  router.push("/login");
};
</script>
