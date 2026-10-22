/* 참여형 수업 목록 — 런처(index.html)와 교사 콘솔(teacher.html)이 공유하는 단일 명부.
   새 차시 추가 = 여기 맨 위에 한 객체 + lessons/<id>.js 모듈 1개 (최신 수업이 맨 위).
   colbase = 그 수업의 Firestore 컬렉션 접두사(반별 _c<N>), clsKey = 교사 반 복원용 localStorage 키 — 수업별로 반드시 달라야 함. */
export const LESSONS = [
  {
    id: "heat", emoji: "☀️",
    title: "지구의 가계부", subtitle: "열수지와 복사 평형",
    unit: "통합과학2 · 지구 환경 변화 1/3",
    student: "https://zeroyoung-collab.github.io/hn-sci/heat/",
    colbase: "pw_openclass_heat", clsKey: "och_teacher_cls",
  },
  {
    id: "warming", emoji: "🌡️",
    title: "지구의 체온", subtitle: "온실효과와 지구 온난화",
    unit: "통합과학2 · 지구 환경 변화",
    student: "https://zeroyoung-collab.github.io/hn-sci/openclass/",
    colbase: "pw_openclass_warming", clsKey: "ocw_teacher_cls",
    clsHint: '수행평가 때 같은 반을 다시 선택하면 제출한 "나의 생각"이 그대로 열려요.',
  },
];
