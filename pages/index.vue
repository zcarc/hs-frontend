<template>
  <!-- 메인 컨테이너 -->
  <div class="main-container">
    <!-- 콘텐츠 -->
    <div class="content">
      <div class="layout-grid">
        <!-- 1) 전자결재 요약 카드 -->
        <Card class="card-approval-summary">
          <CardContent>
            <h2>전자결재 현황</h2>
            <div class="approval-stats">
              <div class="stat" v-for="s in approvalStats" :key="s.label">
                <div class="number">{{ s.number }}</div>
                <div class="label">{{ s.label }}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 2) TO-DO 원형 그래프 -->
        <Card class="card-todo">
          <CardContent class="text-center">
            <h2>TO-DO 그래프</h2>
            <div class="circle-chart">
              <svg>
                <circle class="bg" cx="60" cy="60" r="50" />
                <circle class="progress" cx="60" cy="60" r="50" />
              </svg>
              <div class="percent-text">{{ todoPercent }}%</div>
            </div>
          </CardContent>
        </Card>

        <!-- 3) 알림 -->
        <Card class="card-alerts">
          <CardContent>
            <h2>알림</h2>
            <div class="alert-item" v-for="(a, i) in alerts" :key="i">
              <div class="dot"></div>
              <div class="text">{{ a }}</div>
            </div>
          </CardContent>
        </Card>

        <!-- 4) 근태정보 (디지털 시계) -->
        <!--        <Card class="card-clock">-->
        <!--          <CardContent>-->
        <!--            <h2>근태 정보</h2>-->
        <!--            <div class="clock-display">{{ clock }}</div>-->
        <!--            <div class="small-text">출근 시간: 08:45</div>-->
        <!--            <div class="btn-attendance">-->
        <!--              <Button @click="checkIn">출근 체크</Button>-->
        <!--              <Button @click="checkOut">퇴근 체크</Button>-->
        <!--            </div>-->
        <!--          </CardContent>-->
        <!--        </Card>-->

        <Card class="card-today-schedule">
          <CardContent>
            <h2>오늘 일정</h2>
            <ul class="schedule-list">
              <li v-for="event in todayEvents" :key="event.id">
                <span class="time">{{ event.time }}</span>
                <span class="title">{{ event.title }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <!-- 5) 뉴스피드 -->
        <Card class="card-newsfeed">
          <CardContent>
            <h2>뉴스피드</h2>
            <div class="news-tabs">
              <div
                v-for="cat in categories"
                :key="cat"
                class="tab-item"
                :class="{ active: selectedCategory === cat }"
                @click="selectedCategory = cat"
              >
                {{ cat }}
              </div>
            </div>
            <div class="news-list">
              <div v-for="(n, i) in filteredNews" :key="i" class="news-item">
                <div class="title">{{ n.title }}</div>
                <div class="meta">
                  <span class="icon">📢</span>
                  <span>{{ n.reporter }}</span>
                  <span>{{ n.date }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 6) 날씨 -->
        <Card class="card-weather">
          <CardContent class="text-center">
            <h2>날씨</h2>
            <div class="weather-info">{{ weather.temp }}</div>
            <div class="weather-sub">
              {{ weather.desc }}, {{ weather.location }}
            </div>
          </CardContent>
        </Card>

        <!-- 7) 게시판 -->
        <Card class="card-board">
          <CardContent>
            <h2>게시판</h2>
            <div class="board-list">
              <div v-for="(b, i) in boards" :key="i" class="board-item">
                <div class="title">{{ b.title }}</div>
                <div class="date">{{ b.date }}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 8) 친구 -->
        <Card class="card-friends">
          <CardContent>
            <h2>친구</h2>
            <div class="friends-list">
              <div v-for="(f, i) in friends" :key="i" class="friend">
                <img :src="f.avatar" alt="avatar" />
                <div>{{ f.name }}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 9) 캘린더 -->
        <Card class="card-calendar">
          <CardContent>
            <h2>캘린더</h2>
            <table class="calendar">
              <thead>
                <tr>
                  <th>일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th>토</th>
                </tr>
              </thead>
              <tbody>
                <!-- (예시 고정) -->
                <tr>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>14</td>
                  <td>15</td>
                  <td>16</td>
                  <td>17</td>
                  <td class="today">18</td>
                  <td>19</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>21</td>
                  <td>22</td>
                  <td>23</td>
                  <td>24</td>
                  <td>25</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>27</td>
                  <td>28</td>
                  <td>29</td>
                  <td>30</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 전자결재 통계
const approvalStats = [
  { label: "진행 중", number: 7 },
  { label: "상신 대기", number: 10 },
  { label: "반려", number: 0 },
  { label: "완료", number: 0 },
];

// TO-DO 퍼센트
const todoPercent = ref(84);

// 알림 목록
const alerts = [
  "[팀장] 프로젝트 보고서 작성해주세요.",
  "[인사팀] 이번 주 건강검진 일정 안내",
  "[개발팀] 서버 업데이트 완료",
];

// 실시간 시계
const clock = ref("--:--:--");

function updateClock() {
  const now = new Date();
  clock.value = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

onMounted(() => {
  updateClock();
  setInterval(updateClock, 1000);
});

// 출퇴근 체크
function checkIn() {
  alert("출근이 체크되었습니다.");
}

function checkOut() {
  alert("퇴근이 체크되었습니다.");
}

// 뉴스피드
const categories = ["전체", "공지", "업무", "채용"];
const selectedCategory = ref("전체");
const newsList = ref([
  {
    title: "사내 전산 시스템 점검 안내",
    reporter: "IT팀 / 최원혁",
    date: "2025-06-01",
    category: "전체",
  },
  {
    title: "기획부 프로젝트 일정 변경",
    reporter: "기획팀 / 김영희",
    date: "2025-06-03",
    category: "업무",
  },
  {
    title: "2025 신입사원 채용 공고",
    reporter: "HR / 박민수",
    date: "2025-05-28",
    category: "채용",
  },
]);
const filteredNews = computed(() =>
  selectedCategory.value === "전체"
    ? newsList.value
    : newsList.value.filter((n) => n.category === selectedCategory.value),
);

// 날씨 (예시 고정)
const weather = {
  temp: "-4℃",
  desc: "흐림",
  location: "현재 서울",
};

// 게시판
const boards = [
  { title: "[공지] 6월 월간 회의 일정 안내", date: "2025-06-01" },
  { title: "[업무] 신규 시스템 교육 자료 업로드", date: "2025-05-30" },
  { title: "[자유게시판] 주말 등산 모임", date: "2025-05-28" },
];

// 친구 목록
const friends = [
  { name: "김철수", avatar: "https://via.placeholder.com/40" },
  { name: "이영희", avatar: "https://via.placeholder.com/40" },
  { name: "박민수", avatar: "https://via.placeholder.com/40" },
];

const todayEvents = [
  { id: 1, time: "10:00", title: "팀 스탠드업 미팅" },
  { id: 2, time: "11:00", title: "고객 A 프레젠테이션" },
  { id: 3, time: "12:00", title: "점심 식사" },
  { id: 4, time: "15:00", title: "디자인 리뷰" },
  { id: 5, time: "16:00", title: "주간 회고 세션" },
];
</script>
<style scoped src="./index.css" />
