/* 배달 사고 — 엘니뇨와 사막화 (교사 콘솔 수업 모듈)
   데이터 저장: pw_openclass_nino(_c<반>) · 학생 앱 hn-sci/nino/와 그림·데이터 공유
   발표 뽑기는 "짜여진 랜덤" — 연출은 룰렛이지만 결과는 항상 1→2→3→4→5(개념 흐름) 순서 */
import { getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export default function build(E){
  const P = E.presenter;
  const db = getFirestore(getApp());
  const COL = () => E.CLS ? `${E.meta.colbase}_c${E.CLS}` : E.meta.colbase;
  const esc = s => String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const VT = (x,y,s,fill="#6b5a3e") => `<text x="${x}" y="${y}" text-anchor="middle" font-size="13" font-weight="900" fill="${fill}">${[...s].map((ch,i)=>`<tspan x="${x}" dy="${i?15:0}">${ch}</tspan>`).join("")}</text>`;
  const AR = E.fatArrow;

  /* ── 모둠 자료 그림 (학생 앱과 동일) ── */
  function pacPanel(y0, mode, kind){
    const norm = mode === "n";
    const yo = y0+96, yb = y0+250;
    let g = `<rect x="30" y="${y0+8}" width="150" height="32" rx="16" fill="${norm?"#0B3E86":"#d64545"}"/>
      <text x="105" y="${y0+30}" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">${norm?"평상시":"엘니뇨 때"}</text>
      <rect x="36" y="${y0+46}" width="748" height="50" fill="#eef5fc"/>
      <rect x="36" y="${yo}" width="748" height="${yb-yo}" fill="#cfe4f6"/>
      <rect x="36" y="${y0+46}" width="52" height="${yb-y0-46}" fill="#cdbf9f"/>
      <rect x="732" y="${y0+46}" width="52" height="${yb-y0-46}" fill="#cdbf9f"/>
      ${VT(62, y0+118, "인도네시아")}
      ${VT(758, y0+118, "남아메리카")}
      <text x="410" y="${yb+20}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#3d4652">적도 부근 태평양 — 왼쪽이 서쪽, 오른쪽이 동쪽</text>`;
    if(norm){
      g += `<path d="M 88,${yo} L 732,${yo} L 732,${yo+16} C 500,${yo+26} 300,${yo+66} 88,${yo+96} Z" fill="#e8603c" opacity=".6"/>
        <text x="170" y="${yo+62}" font-size="17" font-weight="900" fill="#8a1f08">따뜻한 물 29℃</text>
        <text x="640" y="${yo+52}" font-size="16" font-weight="900" fill="#0B3E86">23℃ (찬 물)</text>`;
    }else{
      g += `<path d="M 88,${yo} L 732,${yo} L 732,${yo+78} C 520,${yo+92} 300,${yo+78} 88,${yo+56} Z" fill="#e8603c" opacity=".6"/>
        <text x="150" y="${yo+42}" font-size="16" font-weight="900" fill="#8a1f08">28℃</text>
        <text x="580" y="${yo+52}" font-size="17" font-weight="900" fill="#8a1f08">따뜻한 물 27℃!</text>`;
    }
    if(kind === "wind"){
      const wy = y0+71;
      if(norm){
        g += AR(700,wy, 130,wy, 15, "#F5B301", "#c8920a")
          + `<text x="410" y="${wy-22}" text-anchor="middle" font-size="16" font-weight="900" fill="#8a6a2a">🌬 무역풍 — 동에서 서로 쌩쌩!</text>`;
      }else{
        g += AR(620,wy, 380,wy, 7, "#F5B301", "#c8920a")
          + `<text x="410" y="${wy-22}" text-anchor="middle" font-size="16" font-weight="900" fill="#b02d55">🌬 무역풍이 약해짐!</text>`
          + AR(240,yo+36, 560,yo+36, 12, "#f2a48c", "#d64545")
          + `<text x="400" y="${yo+16}" text-anchor="middle" font-size="15" font-weight="900" fill="#b02d55">따뜻한 물이 동쪽으로 되돌아옴</text>`;
      }
    }
    if(kind === "cloud"){
      if(norm){
        g += `<text x="200" y="${y0+86}" text-anchor="middle" font-size="34">⛈️</text>
          <text x="160" y="${y0+86}" text-anchor="middle" font-size="30">🌧️</text>
          ${AR(180, yo-4, 180, y0+96, 9, "#9ec3e8", "#1f6fd6")}
          <text x="300" y="${y0+70}" font-size="15" font-weight="900" fill="#0B3E86">따뜻한 바다 위 = 비구름 공장</text>
          <text x="640" y="${y0+80}" text-anchor="middle" font-size="30">☀️</text>`;
      }else{
        g += `<text x="560" y="${y0+86}" text-anchor="middle" font-size="34">⛈️</text>
          <text x="600" y="${y0+86}" text-anchor="middle" font-size="30">🌧️</text>
          ${AR(580, yo-4, 580, y0+96, 9, "#9ec3e8", "#1f6fd6")}
          <text x="430" y="${y0+70}" text-anchor="end" font-size="15" font-weight="900" fill="#b02d55">비구름 공장이 동쪽으로 이사!</text>
          <text x="150" y="${y0+80}" text-anchor="middle" font-size="28">☀️</text>
          <text x="190" y="${y0+86}" text-anchor="middle" font-size="24">🔥</text>`;
      }
    }
    return g;
  }
  function figPac(kind, title, bottom){
    return `<svg viewBox="0 0 820 644" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="644" fill="#fff"/>
      <text x="30" y="36" font-size="22" font-weight="900" fill="#092f66">${title}</text>
      ${pacPanel(48, "n", kind)}
      ${pacPanel(330, "e", kind)}
      <text x="410" y="632" text-anchor="middle" font-size="13.5" font-weight="900" fill="#c8920a">${bottom}</text>
    </svg>`;
  }
  const figA1 = () => figPac("wind", "그림 A · 적도 태평양의 바람과 표층 수온", "두 그림에서 달라진 것을 모두 찾아보자!");
  const figA3 = () => figPac("cloud", "그림 A · 비구름 공장의 위치", "비구름은 왜 따뜻한 바다 위에서 생길까? (더운 공기는 위로!)");
  function upwPanel(y0, mode){
    const norm = mode === "n";
    const yo = y0+70;
    const warmH = norm ? 26 : 86;
    let g = `<rect x="30" y="${y0+8}" width="150" height="32" rx="16" fill="${norm?"#0B3E86":"#d64545"}"/>
      <text x="105" y="${y0+30}" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">${norm?"평상시":"엘니뇨 때"}</text>
      <rect x="36" y="${yo}" width="664" height="180" fill="#9dc3e6"/>
      <rect x="36" y="${yo+110}" width="664" height="70" fill="#5e93c7"/>
      <path d="M 700,${yo} L 784,${yo} L 784,${yo+180} L 740,${yo+180} L 700,${yo+60} Z" fill="#cdbf9f"/>
      ${VT(762, yo+70, "남아메리카", "#6b5a3e")}
      <rect x="36" y="${yo}" width="664" height="${warmH}" fill="#e8603c" opacity=".62"/>
      <text x="70" y="${yo+(norm?19:34)}" font-size="15.5" font-weight="900" fill="#8a1f08">따뜻한 층 ${norm?"(얇음)":"(두꺼움!)"}</text>
      <text x="590" y="${yo+150}" text-anchor="end" font-size="15" font-weight="900" fill="#dcebfa">깊은 곳의 찬 바닷물 — 영양분 가득</text>`;
    if(norm){
      g += AR(640, yo+150, 640, yo+36, 15, "#8fd0a8", "#1A9A3E")
        + `<text x="622" y="${yo+108}" text-anchor="end" font-size="15.5" font-weight="900" fill="#0f5c27">용승 — 찬 바닷물이 영양분을 싣고 상승!</text>
        <text x="200" y="${yo+16}" font-size="22">🐟🐟🐟🐟</text>
        <text x="330" y="${yo+44}" font-size="14" font-weight="900" fill="#092f66">플랑크톤 풍년 → 멸치 떼 풍년</text>`;
    }else{
      g += `<g opacity=".9">${AR(640, yo+170, 640, yo+110, 12, "#b9c4d4", "#8a93a1")}</g>
        <line x1="614" y1="${yo+120}" x2="666" y2="${yo+72}" stroke="#d64545" stroke-width="7" stroke-linecap="round"/>
        <line x1="666" y1="${yo+120}" x2="614" y2="${yo+72}" stroke="#d64545" stroke-width="7" stroke-linecap="round"/>
        <text x="595" y="${yo+45}" text-anchor="end" font-size="15.5" font-weight="900" fill="#b02d55">두꺼운 따뜻한 층이 뚜껑처럼 용승을 막음 →</text>
        <text x="330" y="${yo+22}" font-size="20">🐟…?</text>
        <text x="200" y="${yo+70}" font-size="14" font-weight="900" fill="#8a1f08">영양분 끊김 → 물고기가 사라짐</text>`;
    }
    return g;
  }
  const figA2 = () => `<svg viewBox="0 0 820 644" xmlns="http://www.w3.org/2000/svg">
    <rect width="820" height="644" fill="#fff"/>
    <text x="30" y="36" font-size="22" font-weight="900" fill="#092f66">그림 A · 페루 앞바다의 속사정 (연직 단면)</text>
    ${upwPanel(48, "n")}
    ${upwPanel(330, "e")}
    <text x="410" y="632" text-anchor="middle" font-size="13.5" font-weight="900" fill="#c8920a">바다를 옆에서 잘라 본 그림 — 찬 바닷물의 엘리베이터(용승)에 무슨 일이?</text>
  </svg>`;
  const figB4 = () => `<svg viewBox="0 0 820 560" xmlns="http://www.w3.org/2000/svg">
    <rect width="820" height="560" fill="#fff"/>
    <text x="30" y="36" font-size="22" font-weight="900" fill="#092f66">그림 B · 사헬 지대는 어디?</text>
    <rect x="60" y="60" width="500" height="460" rx="18" fill="#dcebfa"/>
    <path d="M 150,80 L 470,80 L 520,180 L 490,290 L 400,400 L 330,500 L 290,500 L 220,380 L 150,260 Z" fill="#cdbf9f"/>
    <text x="330" y="490" text-anchor="middle" font-size="15" font-weight="900" fill="#6b5a3e">아프리카</text>
    <path d="M 152,110 L 492,110 L 505,205 L 160,205 Z" fill="#e8c76a"/>
    <text x="330" y="165" text-anchor="middle" font-size="19" font-weight="900" fill="#8a6a2a">사하라 사막</text>
    <path d="M 160,205 L 505,205 L 500,250 L 168,250 Z" fill="#e0803c"/>
    <text x="330" y="235" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">사헬 지대</text>
    ${AR(240,256, 240,298, 11, "#d8b24a", "#8a6a2a")}
    ${AR(330,256, 330,298, 11, "#d8b24a", "#8a6a2a")}
    ${AR(420,256, 420,298, 11, "#d8b24a", "#8a6a2a")}
    <text x="330" y="318" text-anchor="middle" font-size="14.5" font-weight="900" fill="#b02d55">사막이 해마다 남쪽으로 확장 중!</text>
    <line x1="60" y1="130" x2="560" y2="130" stroke="#d64545" stroke-width="2" stroke-dasharray="7 5"/>
    <text x="66" y="122" font-size="13" font-weight="900" fill="#d64545">위도 30°N 부근</text>
    <rect x="580" y="90" width="214" height="240" rx="12" fill="#eef3fa"/>
    <text x="687" y="124" text-anchor="middle" font-size="15.5" font-weight="900" fill="#092f66">📌 지난 시간 복습</text>
    <text x="596" y="158" font-size="13.5" font-weight="700" fill="#3d4652"><tspan x="596" dy="0">위도 30° 부근은 공기가</tspan><tspan x="596" dy="22">가라앉는 자리라 비가 잘</tspan><tspan x="596" dy="22">안 온다 — 세계의 큰</tspan><tspan x="596" dy="22">사막이 모여 있는 이유!</tspan></text>
    <text x="596" y="276" font-size="13.5" font-weight="900" fill="#c8920a"><tspan x="596" dy="0">사헬 = 사하라의 남쪽</tspan><tspan x="596" dy="22">가장자리(경계) 지역</tspan></text>
    <text x="410" y="548" text-anchor="middle" font-size="12.5" fill="#8a93a1">수업용 모식도</text>
  </svg>`;

  /* ── 모둠 자료 5종 (학생 앱과 동일 데이터) ── */
  const DATASETS = {
    1:{ emoji:"🌬️", name:"멈춘 컨베이어 — 바람과 바닷물", short:"바람·수온",
      qs:["① 평상시 따뜻한 바닷물은 서쪽·동쪽 중 어디에? 무엇이 그렇게 만들고 있나?",
          "② 엘니뇨 때 무역풍의 세기는 어떻게 달라졌나?",
          "③ 그 결과 따뜻한 바닷물의 분포는 어떻게 바뀌었나?"],
      charts:[figA1, () => E.barChart({ title:"그래프 B · 적도 부근 무역풍의 세기", sub:"평상시 평균을 100으로 한 상댓값", ylabel:"상대 세기(%)",
        src:"자료: 미국 해양대기청(NOAA)", ymin:0, ymax:120, yticks:[0,50,100],
        cats:[{label:"평상시",val:100,color:"#0B3E86"},{label:"엘니뇨 때",val:60,color:"#d64545"}] })] },
    2:{ emoji:"🐟", name:"사라진 멸치 떼 — 용승과 어획량", short:"용승·어획량",
      qs:["① 평상시 용승이 물고기에게 주는 선물은?",
          "② 엘니뇨 때 무엇이 두꺼워져 용승을 막고 있나?",
          "③ 어획량이 급감한 시기와 그 까닭은?"],
      charts:[figA2, () => E.lineChart({ title:"그래프 B · 페루의 멸치(앤초비) 어획량", sub:"연도별 어획량 (백만 t)", ylabel:"어획량 (백만 t)",
        src:"자료: 유엔식량농업기구(FAO)", xmin:1964, xmax:1981, ymin:0, ymax:13.5,
        yticks:[0,4,8,12], xticks:[1965,1970,1975,1980], dots:true, color:"#1f6fd6",
        pts:[[1965,7.5],[1966,8.5],[1967,9.8],[1968,10.3],[1969,8.9],[1970,12.3],[1971,10.3],[1972,4.4],[1973,1.8],[1974,4.0],[1975,3.3],[1976,4.3],[1977,0.8],[1978,1.2],[1979,1.4],[1980,0.7]],
        marks:[[1970,12.3,"1970년 세계 1위!","start",-14],[1973,1.8,"1972~73년 엘니뇨","start",30]] })] },
    3:{ emoji:"⛈️", name:"이사 간 비구름 — 날씨 대혼란", short:"구름·기상 이변",
      qs:["① 비구름은 어떤 바다 위에서 잘 만들어지나?",
          "② 엘니뇨 때 비구름 공장은 어디로, 왜 이사 갔나?",
          "③ 인도네시아 쪽·페루 쪽의 기상 재해는?"],
      charts:[figA3, () => E.barChart({ title:"그래프 B · 엘니뇨 때 강수량 변화", sub:"평상시 대비 변화율(%) — 적도 태평양의 양쪽", ylabel:"강수량 변화(%)",
        src:"자료: 미국 해양대기청(NOAA)", ymin:-60, ymax:80, zero:0, yticks:[-40,0,40,80],
        cats:[{label:"인도네시아 쪽(서쪽)",val:-40,color:"#d8b24a",vlabel:"−40"},{label:"페루 연안(동쪽)",val:60,color:"#1f6fd6",vlabel:"+60"}],
        notes:[[0,12,"가뭄·산불"],[1,74,"폭우·홍수","#0B3E86"]] })] },
    4:{ emoji:"🏜️", name:"넓어지는 모래 왕국 — 사헬의 눈물", short:"사헬 사막화",
      qs:["① 사헬 지대는 어디에 있나? (사하라와의 위치 관계)",
          "② 1970~80년대 사헬의 강수량은?",
          "③ 비가 계속 부족하면 사막 가장자리 땅은?"],
      charts:[() => E.lineChart({ title:"그래프 A · 사헬 지대의 강수량 변화", sub:"평년 대비 편차 지수 — 0보다 작으면 평년보다 비가 적게 온 해", ylabel:"강수량 편차 지수",
        src:"자료: 미국 워싱턴대 사헬 강수 지수", xmin:1946, xmax:2014, ymin:-1.9, ymax:1.9, zero:0,
        yticks:[-1,0,1], xticks:[1950,1970,1990,2010], dots:true, color:"#c8920a",
        pts:[[1950,0.9],[1955,1.3],[1958,0.7],[1961,0.5],[1964,0.1],[1968,-0.5],[1972,-1.0],[1977,-0.9],[1980,-1.1],[1984,-1.5],[1987,-1.2],[1990,-0.9],[1994,-0.4],[1999,-0.2],[2003,-0.1],[2008,0.1],[2012,0.0]],
        marks:[[1955,1.3,"비가 넉넉하던 시절","start",-14],[1984,-1.5,"1980년대 대가뭄","start",30]] }), figB4] },
    5:{ emoji:"🐑", name:"범인은 우리? — 인간 활동과 황사", short:"인간 활동·황사",
      qs:["① 사막화를 일으키는 인간 활동 세 가지는?",
          "② 서울의 황사 일수는 어떻게 변해 왔나? 2010년대에 줄어든 까닭은?",
          "③ 중국·몽골의 사막화가 왜 우리 문제가 되나?"],
      charts:[() => E.barChart({ title:"그래프 A · 사막화를 일으키는 원인별 비율", sub:"전 세계 사막화 원인 분석", ylabel:"비율(%)",
        src:"자료: 유엔환경계획(UNEP)", ymin:0, ymax:42, yticks:[0,10,20,30,40],
        cats:[{label:"과잉 방목",val:35,color:"#0B3E86"},{label:"삼림 벌채",val:30,color:"#1A9A3E"},{label:"과잉 경작",val:28,color:"#c8920a"},{label:"기타",val:7,color:"#8a93a1"}],
        notes:[[1,38,"대부분이 인간 활동!"]] }), () => E.barChart({ title:"그래프 B · 서울의 연평균 황사 관측 일수", sub:"10년 단위 평균 (일)", ylabel:"황사 일수 (일/년)",
        src:"자료: 기상청", ymin:0, ymax:12, yticks:[0,4,8,12],
        cats:[{label:"1970년대",val:2.6,color:"#9fb0c6"},{label:"1980년대",val:3.9,color:"#9fb0c6"},{label:"1990년대",val:5.3,color:"#c8920a"},{label:"2000년대",val:9.8,color:"#d64545"},{label:"2010년대",val:6.9,color:"#e0803c"}],
        notes:[[4,8.6,"숲 가꾸기의 효과?"]] })] },
  };
  const DEF_EN = "무역풍이 약해지면서 <b style='color:var(--navy)'>적도 부근 동태평양(페루 앞바다)의 표층 수온이 평상시보다 높은 상태</b>가 수개월 이상 이어지는 현상";
  const DEF_SD = "오랜 가뭄이나 지나친 개발로 <b style='color:var(--navy)'>사막 주변(건조·반건조 지역)의 토지가 생산력을 잃고 사막처럼 변해 가는</b> 현상";

  /* ── 참가자 퇴장·모둠 이동 (로비 슬라이드에서 이름 클릭) ── */
  async function manageStu(sid){
    const s = E.students.find(x => x.id === sid);
    if(!s) return;
    const v = prompt(`조사관 ${s.name} (${s.team}모둠)\n\n· 다른 모둠으로 보내려면 모둠 번호(1~5)를 입력\n· 잘못 들어온 학생이면 "퇴장"이라고 입력 → 명단에서 삭제되고 그 기기는 입장 화면으로 돌아갑니다`);
    if(v === null) return;
    const t = v.trim();
    try{
      if(t === "퇴장"){
        if(!confirm(`${s.name} 학생을 퇴장시킬까요?`)) return;
        await deleteDoc(doc(db, COL(), sid));
      }else if(/^[1-5]$/.test(t)){
        await setDoc(doc(db, COL(), sid), {team:+t}, {merge:true});
      }else{
        alert("1~5 또는 '퇴장'만 입력할 수 있어요.");
      }
    }catch(e){ alert("처리 실패: " + e.message); }
  }
  function wireChips(){
    document.querySelectorAll("[data-sid]").forEach(el => { el.onclick = () => manageStu(el.dataset.sid); });
  }
  function teamBoxes(){
    let h = `<div class="teamsrow">`;
    for(let t=1;t<=5;t++){
      const mem = E.students.filter(s => s.team === t);
      h += `<div class="teambox"><h4>${t}모둠 · ${DATASETS[t].short} (${mem.length})</h4>
        ${mem.map(s => `<span data-sid="${esc(s.id)}" style="cursor:pointer">${esc(s.name)}</span>`).join("")}</div>`;
    }
    const lost = E.students.filter(s => !(s.team >= 1 && s.team <= 5));
    if(lost.length) h += `</div><div style="margin-top:.8vh;font-size:1.8vh;color:var(--red);font-weight:700">모둠 미지정: ${lost.map(s => `<span data-sid="${esc(s.id)}" style="cursor:pointer;text-decoration:underline">${esc(s.name)}</span>`).join(", ")}</div>`;
    else h += `</div>`;
    return h;
  }

  /* ── "짜여진 랜덤" 발표 뽑기 — 연출은 룰렛, 결과는 1→5 고정 ── */
  const ORDER = [1,2,3,4,5];   // 개념 흐름: 바람 → 용승 → 구름 → 사헬 → 인간 활동
  function pushBoard(t){
    const b = E.boards[t] || {};
    E.setState({ pteam:t, pboard:{ a1:b.a1||"", a2:b.a2||"", a3:b.a3||"", find:b.find||"" } });
  }
  function drawFixed(){
    if(P.drawing) return;
    const next = ORDER.find(t => !P.presented.has(t));
    if(!next){ alert("모든 모둠이 발표를 마쳤습니다. '뽑기 초기화'를 누르면 처음부터 다시 뽑을 수 있어요."); return; }
    const pool = [1,2,3,4,5].filter(t => !P.presented.has(t));
    P.drawing = true;
    const total = 12 + Math.floor(Math.random()*6);
    let step = 0;
    const spin = () => {
      P.hl = step >= total ? next : pool[step % pool.length];
      E.render();
      if(step >= total){ setTimeout(() => { P.drawing = false; P.hl = 0; P.open(next); pushBoard(next); }, 900); return; }
      step++;
      setTimeout(spin, 70 + step*step*1.1);
    };
    spin();
  }

  const opfeedStyle = "flex:1;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;gap:1.2vh 1.5vw;margin-top:1.5vh;align-content:start";

  /* ════════ 슬라이드 ════════ */

  /* 0 타이틀 */
  E.slide(() => `
    <div class="kicker">통합과학2 · 지구 환경 변화 3/3 · 호남고등학교 · ${E.clsLabel()}</div>
    <h1 class="big">🚨 배달 사고</h1>
    <div class="rule"></div>
    <div class="goals" style="font-size:4vh;line-height:1.7">
      지난 시간, 지구 배달 주식회사는 <b>바람과 바닷물 노선</b>을 완성했다.<br>
      그런데 오늘 아침, 사고 신고가 접수됐다 —<br>
      <b style="color:var(--red)">"열 배달이 멈췄어요!"</b> · <b style="color:var(--gold-d)">"땅이 사막으로 변해요!"</b>
    </div>
    <div style="margin-top:3vh;font-size:2.6vh;font-weight:900;color:var(--navy)">오늘의 임무 — 사고 조사관이 되어 <span style="color:var(--gold-d)">엘니뇨</span>와 <span style="color:var(--gold-d)">사막화</span>의 전말을 밝혀라!</div>
    `, { enter(){ E.setState({phase:"lobby"}); } });

  /* 1 로비 — QR 입장 + 모둠 현황 + 참가자 관리 */
  E.slide(() => `
    <div class="kicker">입장 — 조사관 등록</div>
    <h2 class="mid">명단에서 <b style="color:var(--gold-d)">내 이름</b>을 고르고, 앉은 <b style="color:var(--gold-d)">모둠 번호</b>를 선택!</h2>
    <div class="lobbywrap" style="align-items:flex-start">
      <div class="lobbyL">
        <div style="font-size:2.4vh;font-weight:700;color:var(--soft)">휴대폰·노트북으로 접속</div>
        <div class="url">${E.ENTRY}</div>
        <div class="joined">
          <div class="cnt">접속 <b>${E.students.length}</b>명</div>
          ${teamBoxes()}
          <div style="margin-top:1vh;font-size:1.7vh;color:var(--soft)">💡 이름을 클릭하면 <b>모둠 이동·퇴장</b> 처리를 할 수 있어요 (잘못 들어온 학생 정리)</div>
        </div>
      </div>
      <div class="lobbyR"><div id="qr"></div><div style="font-size:2vh;font-weight:700;color:var(--soft)">QR로 바로 입장</div></div>
    </div>
    `, { enter(){ E.setState({phase:"lobby"}); },
         after(){ E.lobbyQR(); wireChips(); },
         acts(){ return [E.resetAct()]; } });

  /* 2 사건 브리핑 */
  E.slide(() => `
    <div class="kicker">사건 개요</div>
    <h2 class="mid">접수된 사고 신고 2건</h2>
    <div style="display:flex;gap:2vw;flex:1;align-items:stretch;margin-top:1vh">
      <div style="flex:1;border:.4vh solid var(--red);border-radius:1.6vh;padding:2.5vh 2.5vh;display:flex;flex-direction:column">
        <div style="font-size:3.2vh;font-weight:900;color:var(--red)">🚨 신고 1호 — 태평양 노선</div>
        <div style="font-size:2.6vh;line-height:1.8;margin-top:1.5vh;font-weight:500">
          "페루 앞바다가 <b>이상하게 따뜻</b>해요.<br>
          물고기가 <b>사라지고</b>, 늘 비 오던 동네는 <b>바싹 말랐어요</b>.<br>
          서쪽으로 가던 <b>열 배달</b>이 멈춘 것 같아요!"</div>
        <div style="margin-top:auto;font-size:2.2vh;font-weight:900;color:var(--navy)">용의자 — <span style="font-size:3vh;color:var(--red)">엘니뇨</span> (수사 1·2·3반 투입)</div>
      </div>
      <div style="flex:1;border:.4vh solid var(--gold-d);border-radius:1.6vh;padding:2.5vh 2.5vh;display:flex;flex-direction:column">
        <div style="font-size:3.2vh;font-weight:900;color:var(--gold-d)">🏜️ 신고 2호 — 건조대 구역</div>
        <div style="font-size:2.6vh;line-height:1.8;margin-top:1.5vh;font-weight:500">
          "사하라 사막 가장자리의 <b>풀밭이 사라지고</b> 있어요.<br>
          봄마다 <b>누런 모래바람</b>이 우리 교실 창문까지 날아와요.<br>
          사막이 <b>점점 넓어지는</b> 것 같아요!"</div>
        <div style="margin-top:auto;font-size:2.2vh;font-weight:900;color:var(--navy)">용의자 — <span style="font-size:3vh;color:var(--gold-d)">사막화</span> (수사 4·5반 투입)</div>
      </div>
    </div>
    <div style="margin-top:1.5vh;font-size:2.3vh;font-weight:700;color:var(--soft)">수사 순서 — ① 용의자 검색 → ② 모둠별 증거 분석 → ③ 발표로 퍼즐 맞추기 → ④ 수사 결과 보고서</div>
    `, { enter(){ E.setState({phase:"lobby"}); } });

  /* 3 수사 1단계 — 검색 */
  E.slide(() => {
    const defs = k => E.students.filter(s => (s[k]||"").trim());
    const feed = (k, color) => defs(k).slice(-10).map(s =>
      `<div class="opline" style="border-left-color:${color}"><b>${esc(s.name)}</b>${esc(s[k])}</div>`).join("")
      || `<div style="font-size:2.2vh;color:#a8b2c0;padding:1vh">아직 올라온 문장이 없어요…</div>`;
    return `
    <div class="kicker">수사 1단계 — 용의자 검색 (5분)</div>
    <h2 class="mid" style="margin-bottom:.5vh">검색해서 <b style="color:var(--gold-d)">내 말로</b> 정리하라 <span style="font-size:2.4vh;color:var(--soft)">— 엘니뇨 ${defs("defEN").length}명 · 사막화 ${defs("defSD").length}명 제출</span></h2>
    <div style="display:flex;gap:2vw;flex:1;min-height:0;margin-top:1vh">
      <div style="flex:1;display:flex;flex-direction:column;min-height:0">
        <div style="font-size:2.6vh;font-weight:900;color:var(--navy)">🌊 엘니뇨란?</div>
        <div style="${opfeedStyle};grid-template-columns:1fr">${feed("defEN","#1f6fd6")}</div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;min-height:0">
        <div style="font-size:2.6vh;font-weight:900;color:var(--gold-d)">🏜️ 사막화란?</div>
        <div style="${opfeedStyle};grid-template-columns:1fr">${feed("defSD","#c8920a")}</div>
      </div>
      <div style="flex:0 0 26vh">${E.timerHTML()}</div>
    </div>`;
  }, { enter(){ E.setState({phase:"search"}); E.setTimer(300); },
       acts(){ return E.timerActs(300); } });

  /* 4 용어 정리 */
  E.slide(() => {
    const open = !!E.state.termsReveal;
    const box = (emoji, name, en, def, color) => `
      <div style="flex:1;border:.4vh solid ${color};border-radius:1.6vh;padding:2.5vh">
        <div style="font-size:3.4vh;font-weight:900;color:var(--navy2)">${emoji} ${name} <span style="font-size:2vh;color:var(--soft);font-weight:700">${en}</span></div>
        <div style="font-size:2.9vh;line-height:1.8;margin-top:1.5vh;font-weight:700">${open ? def : '<span style="color:#a8b2c0">학생들의 문장을 들어 본 뒤 공개합니다 — [공식 정의 공개]</span>'}</div>
      </div>`;
    return `
    <div class="kicker">수사 노트 — 용어 확정</div>
    <h2 class="mid">우리 반의 문장을 모아, 정의를 확정한다</h2>
    <div style="display:flex;flex-direction:column;gap:2vh;flex:1;justify-content:center">
      ${box("🌊","엘니뇨","El Niño", DEF_EN, "var(--navy)")}
      ${box("🏜️","사막화","Desertification", DEF_SD, "var(--gold-d)")}
    </div>
    <div style="font-size:2.1vh;color:var(--soft);font-weight:700;margin-top:1vh">💡 진행 — 앞 슬라이드의 학생 문장 몇 개를 소리 내어 읽고 "공통으로 들어간 말"을 찾은 뒤 공개</div>
    `;
  }, { enter(){ E.setState({phase:"terms"}); },
       acts(){ return [[E.state.termsReveal ? "정의 숨기기" : "공식 정의 공개", E.state.termsReveal ? "ghost" : "gold",
         () => E.setState({termsReveal: !E.state.termsReveal})]]; } });

  /* 5 수사 2단계 — 모둠 증거 분석 */
  E.slide(() => {
    const prog = t => {
      const b = E.boards[t] || {};
      const n = ["a1","a2","a3","find"].filter(k => (b[k]||"").trim()).length;
      return n;
    };
    return `
    <div class="kicker">수사 2단계 — 모둠별 증거 분석 (12분)</div>
    <h2 class="mid" style="margin-bottom:.5vh">각 수사반, 서로 <b style="color:var(--gold-d)">다른 증거</b>를 배당받았다</h2>
    <div style="display:flex;gap:1.5vw;flex:1;min-height:0;margin-top:1vh">
      <div class="bgrid" style="flex:1;grid-template-columns:repeat(2,1fr);margin-top:0">
        ${[1,2,3,4,5].map(t => `
          <div class="bcard">
            <h4>${t}모둠 ${DATASETS[t].emoji} ${DATASETS[t].name}<span class="sp"></span>
              <span class="donebdg" style="${prog(t)===4?"":"color:#a8b2c0"}">${prog(t)}/4 기록</span></h4>
            <div class="btext" style="font-size:1.9vh"><span class="dim2">${(E.boards[t]&&E.boards[t].find) ? "📢 " : ""}</span>${esc((E.boards[t]||{}).find || "발표 한 문장 대기 중…")}</div>
          </div>`).join("")}
        <div class="bcard note"><div>각 모둠 화면에 그림 2개 + 질문 3개 + 발표 한 문장.<br>질문의 답을 <b>모둠 보드</b>에 기록하면 여기 현황이 실시간으로 떠요.</div></div>
      </div>
      <div style="flex:0 0 26vh">${E.timerHTML()}</div>
    </div>`;
  }, { enter(){ E.setState({phase:"explore", pteam:0}); E.setTimer(720); },
       acts(){ return E.timerActs(720); } });

  /* 6 발표 — 짜여진 랜덤 룰렛 */
  E.slide(() => {
    if(!P.team){
      return `
      <div class="kicker">수사 3단계 — 증거 공개</div>
      <h2 class="mid">어느 수사반부터 발표할까? <span style="font-size:2.4vh;color:var(--soft)">— 뽑기로 결정!</span></h2>
      <div class="bgrid" style="grid-template-columns:repeat(3,1fr)">
        ${[1,2,3,4,5].map(t => {
          const b = E.boards[t] || {};
          return `<div class="bcard click ${P.hl===t ? "hl" : ""}" data-t="${t}">
            <h4>${t}모둠 ${DATASETS[t].emoji} ${DATASETS[t].short}<span class="sp"></span>${P.presented.has(t) ? '<span class="donebdg">✓ 발표함</span>' : ""}</h4>
            <div class="btext" style="font-size:2vh">${esc(b.find || "")||'<span class="dim2">발표 한 문장 없음</span>'}</div>
          </div>`;
        }).join("")}
        <div class="bcard note">🎲 뽑기로 발표 순서를 정합니다.<br>카드를 직접 눌러 열 수도 있어요.</div>
      </div>`;
    }
    const D = DATASETS[P.team], b = E.boards[P.team] || {};
    return `
    <div class="kicker">발표 — ${P.team}모둠 ${D.emoji} ${D.name}</div>
    <h2 class="mid" style="margin-bottom:1vh">${P.team}모둠의 수사 결과${P.speaker ? ` <span style="font-size:2.6vh;background:var(--gold);color:var(--navy2);border-radius:1vh;padding:.5vh 1.6vh">🎤 발표자 ${esc(P.speaker)}</span>` : ""}</h2>
    <div style="display:flex;gap:1.5vw;flex:1;min-height:0">
      <div style="flex:1.3;display:flex;gap:1vw;min-height:0">
        ${D.charts.map(f => `<div class="minichart" style="border-width:.3vh;flex:1;align-self:center">${f()}</div>`).join("")}
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:1vh;min-height:0;overflow-y:auto">
        ${[["a1",0],["a2",1],["a3",2]].map(([k,i]) => `
          <div class="bans" style="font-size:2vh;padding:1vh 1.4vh"><b>${D.qs[i]}</b>${esc(b[k]||"") || '<span class="dim2">(기록 없음)</span>'}</div>`).join("")}
        <div class="bans" style="border-left-color:var(--navy);font-size:2.3vh"><b>📢 발표 한 문장</b>${esc(b.find||"") || '<span class="dim2">(기록 없음)</span>'}</div>
      </div>
    </div>`;
  }, { enter(){ E.setState({phase:"present", pteam:0}); P.back(); },
       after(){ document.querySelectorAll(".bcard.click[data-t]").forEach(el =>
         el.onclick = () => { if(!P.drawing){ P.open(+el.dataset.t); pushBoard(+el.dataset.t); } }); },
       acts(){
         if(!P.team){
           const a = [["🎲 발표 모둠 뽑기", "gold", drawFixed]];
           if(P.presented.size) a.push(["뽑기 초기화", "ghost", () => { P.reset(); E.setState({pteam:0}); }]);
           return a;
         }
         return [
           ["◀ 전체 보기", "ghost", () => { P.back(); E.setState({pteam:0}); }],
           ["🎤 발표자 뽑기", "gold", P.drawSpeaker],
           ["보드 새로고침", "ghost", () => pushBoard(P.team)],
         ];
       } });

  /* 7 투표 */
  E.slide(() => {
    const votes = {1:0,2:0,3:0,4:0,5:0};
    E.students.forEach(s => { if(s.vote) votes[s.vote] = (votes[s.vote]||0)+1; });
    const mxV = Math.max(...Object.values(votes));
    const voted = E.students.filter(s => s.vote).length;
    const S = E.state.sentences || {};
    return `
    <div class="kicker">최우수 수사반 투표</div>
    <h2 class="mid">가장 설득력 있는 수사는? <span style="font-size:2.4vh;color:var(--soft)">투표 ${voted}/${E.students.length}명 · 자기 모둠 제외</span></h2>
    <div class="sents" style="overflow-y:auto;justify-content:flex-start">
      ${[1,2,3,4,5].map(t => {
        const s = S[t] || {};
        return `<div class="sent ${E.state.voteDone && votes[t]===mxV && mxV>0 ? "best":""} ${s.text?"":"empty"}">
          <span class="tno">${t}모둠</span>
          <span class="ds">${DATASETS[t].emoji} ${DATASETS[t].short}</span>
          <span class="tx">${esc(s.text || "발표 한 문장이 없어요")}</span>
          <span class="vt">${E.state.voteDone ? votes[t] + "표" : "?"}</span>
        </div>`;
      }).join("")}
    </div>`;
  }, { enter(){ E.setState({phase:"vote", pteam:0, voteDone:false, sentences:E.collectSentences(DATASETS)}); },
       acts(){ return [
         ["문장 다시 불러오기", "ghost", () => E.setState({sentences:E.collectSentences(DATASETS)})],
         ["결과 공개", "green", () => E.setState({voteDone:true})],
       ]; } });

  /* 8 정리① — 엘니뇨 */
  E.slide(() => `
    <div class="kicker">수사 결과 보고 ① — 사건의 전말</div>
    <h2 class="mid">🌊 엘니뇨 — 세 수사반의 증거를 이으면</h2>
    <div class="sumflow">
      <div class="sumbox">🌬 무역풍 약화<small>1모둠의 증거</small></div>
      <div class="sumarrow">→</div>
      <div class="sumbox">따뜻한 바닷물이<br>동쪽(페루 쪽)에 머묾<small>동태평양 수온 상승</small></div>
      <div class="sumarrow">→</div>
      <div class="sumbox" style="border-color:var(--red);color:var(--red)">용승 약화<br>어획량 급감<small>2모둠의 증거</small></div>
      <div class="sumarrow">＋</div>
      <div class="sumbox" style="border-color:var(--red);color:var(--red)">비구름 이동<br>가뭄 ↔ 홍수<small>3모둠의 증거</small></div>
    </div>
    <div class="ledger">
      <div><b>정의 (수사 노트)</b>적도 부근 동태평양의 표층 수온이 평상시보다 높은 상태가 수개월 이상 지속되는 현상</div>
      <div><b>핵심 연결</b>바람(대기)이 바뀌면 바닷물(해양)이 바뀐다 — 대기와 해양은 한 몸처럼 움직이는 시스템!</div>
      <div><b>기억할 한 줄</b>엘니뇨는 "열 배달 사고" — 서쪽으로 가던 따뜻한 물이 동쪽에 눌러앉은 사건</div>
    </div>
    `, { enter(){ E.setState({phase:"wrap", pteam:0}); } });

  /* 9 정리② — 사막화 */
  E.slide(() => `
    <div class="kicker">수사 결과 보고 ② — 사건의 전말</div>
    <h2 class="mid">🏜️ 사막화 — 범인은 하나가 아니었다</h2>
    <div class="sumflow">
      <div class="sumbox">오랜 가뭄<small>자연적 원인 · 4모둠</small></div>
      <div class="sumarrow">＋</div>
      <div class="sumbox">과잉 방목 · 과잉 경작<br>삼림 벌채<small>인간 활동 · 5모둠</small></div>
      <div class="sumarrow">→</div>
      <div class="sumbox" style="border-color:var(--red);color:var(--red)">토지가 생산력을 잃고<br>사막처럼 변함<small>사헬 지대 등</small></div>
      <div class="sumarrow">→</div>
      <div class="sumbox" style="border-color:var(--gold-d)">황사<small>우리나라까지 영향</small></div>
    </div>
    <div class="ledger">
      <div><b>정의 (수사 노트)</b>사막 주변의 토지가 생산력을 잃고 사막처럼 변해 가는 현상 — 자연 + 인간 활동의 합작</div>
      <div><b>위치의 비밀</b>위도 30° 부근 건조대(하강 기류)의 가장자리 — 지난 시간 '대기 대순환'이 만든 자리</div>
      <div><b>대책</b>숲 조성·방풍림, 토지의 회복력을 지키는 이용, 국제 협력 — 황사 그래프가 보여 준 희망!</div>
    </div>
    `, { enter(){ E.setState({phase:"wrap", pteam:0}); } });

  /* 10 오늘의 한 문장 + 예고 */
  E.slide(() => {
    const ops = E.students.filter(s => (s.opinion||"").trim());
    return `
    <div class="kicker">사건 종결 — 조사관의 소감</div>
    <h2 class="mid">💭 오늘의 한 문장 <span style="font-size:2.4vh;color:var(--soft)">제출 ${ops.length}/${E.students.length}명</span></h2>
    <div style="${opfeedStyle}">
      ${ops.slice(-14).map(s => `<div class="opline"><b>${esc(s.name)}</b>${esc(s.opinion)}</div>`).join("")
        || `<div style="font-size:2.4vh;color:#a8b2c0">학생 화면의 '수사 결과 보고서'에서 제출하면 여기 모여요…</div>`}
    </div>
    <div style="margin-top:1.5vh;font-size:2.4vh;font-weight:900;color:var(--navy)">📌 다음 시간 — 완자 문제로 오늘 수사 내용을 점검합니다. 수사 노트(정의 2개 + 흐름 2개)만 기억하면 끝!</div>
    `;
  }, { enter(){ E.setState({phase:"wrap", pteam:0}); } });
}
