<template>
  <form
    @submit.prevent="onSubmit"
    class="w-full max-w-[1000px] mx-auto p-6 bg-white space-y-4"
  >
    <h2
      class="text-xl font-semibold mb-4 text-center border-t-2 border-solid border-black pt-2 pb-1 border-b-1"
    >
      회원가입
    </h2>
    <div>
      <input v-model="userId" placeholder="아이디" class="input" />
      <span v-if="errors.userId" class="text-red-500 text-sm">
        {{ errors.userId }}</span
      >
    </div>

    <div>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="input"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{
        errors.password
      }}</span>
    </div>

    <div>
      <input v-model="name" placeholder="이름" class="input" />
      <span v-if="errors.name" class="text-red-500 text-sm">{{
        errors.name
      }}</span>
    </div>

    <div>
      <input v-model="email" placeholder="이메일" class="input" />
      <span v-if="errors.email" class="text-red-500 text-sm">{{
        errors.email
      }}</span>
    </div>

    <div>
      <button
        type="submit"
        class="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer"
      >
        회원가입
      </button>
    </div>

    <div v-if="errorMessage" class="text-red-600 text-center text-sm">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const signupSchema = z.object({
  userId: z
    .string({ required_error: "아이디를 입력하세요" })
    .min(1, "아이디를 입력하세요"),
  password: z
    .string({ required_error: "비밀번호를 입력하세요" })
    .min(1, "비밀번호를 입력하세요"),
  name: z
    .string({ required_error: "이름을 입력하세요" })
    .min(1, "이름을 입력하세요"),
  email: z
    .string({ required_error: "이메일을 입력하세요" })
    .email("올바른 이메일 형식이 아닙니다"),
});

const router = useRouter();
const errorMessage = ref("");

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(signupSchema),
});

const { value: userId } = useField("userId");
const { value: password } = useField("password");
const { value: name } = useField("name");
const { value: email } = useField("email");

const onSubmit = handleSubmit(async (values) => {
  try {
    await axios.post("http://localhost:8000/auth/signup", values);
    await router.push("/");
  } catch (err: any) {
    const status = err.response?.status;

    console.log("회원가입 오류 err", err);

    if (status === 404) {
      errorMessage.value = "페이지를 찾을 수 없습니다. (404)";
    } else if (status === 500) {
      errorMessage.value = "서버 오류가 발생했습니다. (500)";
    } else if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = "회원가입에 실패했습니다";
    }
  }
});
</script>

<style scoped>
@reference "tailwindcss";
.input {
  @apply w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black;
}
</style>
