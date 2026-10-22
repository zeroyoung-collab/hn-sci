/* 지구의 체온 — 온실효과와 지구 온난화 (교사 콘솔 수업 모듈)
   원본: openclass/teacher.html — 데이터 저장은 pw_openclass_warming(_c<반>) 그대로 사용 */
export default function build(E){
  const P = E.presenter;

  /* ── 모둠별 데이터셋 (학생 앱과 동일) ── */
  const DATASETS = {
    1:{ name:"대기 중 CO₂ 농도", short:"킬링 곡선" },
    2:{ name:"지구 평균 기온 편차", short:"NASA 기온 편차" },
    3:{ name:"지구 평균 해수면 변화", short:"위성 해수면" },
    4:{ name:"북극 해빙 최소 면적", short:"9월 해빙" },
    5:{ name:"우리나라 연평균 기온", short:"한반도 기온" },
  };

  /* ── 차트 (학생 앱과 동일 데이터) ── */
  function chartCO2(){
    const A=[[1958,315.3],[1970,325.7],[1980,338.8],[1990,354.4],[2000,369.7],[2010,390.1],[2015,401.0],[2020,414.2],[2024,422.8]];
    const pts=[]; for(let y=1958;y<=2024.01;y+=0.25) pts.push([y, E.interp(A,y)+2.7*Math.sin((y%1)*6.283+1.3)]);
    return E.lineChart({ title:"대기 중 CO₂ 농도 (킬링 곡선)", sub:"하와이 마우나로아 관측소", ylabel:"CO₂ 농도 (ppm)",
      src:"자료: NOAA·스크립스 해양연구소", xmin:1956, xmax:2026, ymin:300, ymax:435,
      yticks:[300,330,360,390,420], xticks:[1960,1980,2000,2020], pts,
      marks:[[1958,315.3,"1958년 315 ppm","start",-12],[2024,422.8,"2024년 423 ppm","end",-12]] });
  }
  function chartTemp(){
    const pts=[[1880,-0.16],[1890,-0.35],[1900,-0.08],[1910,-0.43],[1920,-0.27],[1930,-0.14],[1940,0.12],[1950,-0.17],[1960,-0.03],[1970,0.03],[1980,0.26],[1990,0.45],[2000,0.39],[2005,0.67],[2010,0.72],[2015,0.90],[2020,1.01],[2023,1.17],[2024,1.28]];
    return E.lineChart({ title:"지구 평균 기온 편차", sub:"1951~1980년 평균 대비 (℃)", ylabel:"기온 편차 (℃)",
      src:"자료: NASA GISS", xmin:1875, xmax:2030, ymin:-0.6, ymax:1.5, zero:0,
      yticks:[-0.5,0,0.5,1.0,1.5], xticks:[1880,1920,1960,2000,2024], pts, dots:true, color:"#d64545",
      marks:[[1910,-0.43,"−0.43℃","start",22],[2024,1.28,"2024년 +1.28℃","end",-10]] });
  }
  function chartSea(){
    const pts=[[1993,0],[1997,10],[2000,21],[2005,36],[2010,52],[2015,70],[2020,87],[2024,105]];
    return E.lineChart({ title:"지구 평균 해수면 변화", sub:"인공위성 관측 (1993년 = 0 mm)", ylabel:"해수면 변화 (mm)",
      src:"자료: NASA 위성 고도계", xmin:1991, xmax:2027, ymin:-8, ymax:118,
      yticks:[0,30,60,90],  xticks:[1995,2005,2015,2024], pts, dots:true, color:"#1f6fd6",
      marks:[[1993,0,"1993년 기준 0","start",-12],[2024,105,"2024년 +105 mm","end",-12]] });
  }
  function chartIce(){
    const pts=[[1979,7.05],[1980,7.67],[1985,6.70],[1990,6.24],[1996,7.88],[2000,6.32],[2005,5.57],[2007,4.16],[2012,3.39],[2015,4.63],[2020,3.92],[2024,4.28]];
    return E.lineChart({ title:"북극 해빙 최소 면적", sub:"매년 9월 최솟값 (백만 km²)", ylabel:"면적 (백만 km²)",
      src:"자료: 미국 빙설자료센터(NSIDC)", xmin:1977, xmax:2027, ymin:3, ymax:8.2,
      yticks:[3,4,5,6,7,8], xticks:[1980,1995,2010,2024], pts, dots:true, color:"#1f6fd6",
      marks:[[1979,7.05,"1979년 7.05","start",-12],[2012,3.39,"2012년 3.39 (최저)","start",26],[2024,4.28,"2024년 4.28","end",-14]] });
  }
  function chartKorea(){
    const pts=[[1915,12.1],[1925,12.2],[1935,12.4],[1945,12.3],[1955,12.2],[1965,12.4],[1975,12.5],[1985,12.6],[1995,13.0],[2005,13.2],[2015,13.4],[2021,13.7]];
    return E.lineChart({ title:"우리나라 연평균 기온", sub:"10년 평균값 (℃) — 약 +1.6℃/100년", ylabel:"연평균 기온 (℃)",
      src:"자료: 기상청 109년 기후변화 분석", xmin:1910, xmax:2028, ymin:11.8, ymax:14.1,
      yticks:[12.0,12.5,13.0,13.5,14.0], xticks:[1920,1950,1980,2010], pts, dots:true, color:"#1A9A3E",
      marks:[[1915,12.1,"1910년대 12.1℃","start",-12],[2021,13.7,"2020년대 13.7℃","end",-12]] });
  }
  const chartSVG = t => [chartCO2, chartTemp, chartSea, chartIce, chartKorea][t-1]();

  /* ── 온실효과 원리 단계 다이어그램 ── */
  function ghMolecule(cx,cy,label){
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="24" fill="#7a4fc9" opacity=".85"/>
      <circle cx="${cx-20}" cy="${cy+12}" r="13" fill="#9b7dd9" opacity=".85"/>
      <circle cx="${cx+20}" cy="${cy+12}" r="13" fill="#9b7dd9" opacity=".85"/>
      <text x="${cx}" y="${cy+6}" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">${label}</text></g>`;
  }
  function svgGH(step){
    const S = (n, html) => step >= n ? html : "";
    const SOL="#ffc93c", SOLS="#e09b00", RAD="#f2729b", RADS="#d64577";
    return `<svg viewBox="0 0 960 520">
      <defs>
        <linearGradient id="atm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#aecfee"/><stop offset="1" stop-color="#dcebfa"/></linearGradient>
        <linearGradient id="spc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#101b36"/><stop offset="1" stop-color="#2b4573"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="960" height="70" fill="url(#spc)"/>
      <g fill="#fff" opacity=".8">
        <circle cx="90" cy="14" r="1.5"/><circle cx="215" cy="50" r="1.2"/><circle cx="345" cy="14" r="1.5"/>
        <circle cx="555" cy="52" r="1.2"/><circle cx="640" cy="16" r="1.5"/><circle cx="905" cy="60" r="1.2"/>
      </g>
      <rect x="0" y="70" width="960" height="370" fill="url(#atm)"/>
      <rect x="0" y="440" width="960" height="46" fill="#cdbf9f"/>
      <rect x="0" y="486" width="960" height="34" fill="#b3a184"/>
      <line x1="0" y1="70" x2="960" y2="70" stroke="#8fb2d6" stroke-width="1.5"/>
      <line x1="0" y1="440" x2="960" y2="440" stroke="#a4906d" stroke-width="1.5"/>
      <rect x="14" y="22" width="58" height="30" rx="15" fill="#5b7cad"/><text x="43" y="43" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">우주</text>
      <rect x="14" y="240" width="58" height="30" rx="15" fill="#3f6ea8"/><text x="43" y="261" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">대기</text>
      <rect x="14" y="465" width="58" height="30" rx="15" fill="#7a674a"/><text x="43" y="486" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">지표</text>

      ${S(1, E.fatArrow(300,46, 300,428, 32, SOL, SOLS) + `
        <text x="300" y="30" text-anchor="middle" font-size="21" font-weight="900" fill="#fff">태양 복사 (주로 가시광선)</text>
        <text x="300" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="#8a6a2a">대기를 대부분 통과해</text>
        <text x="300" y="142" text-anchor="middle" font-size="15" font-weight="700" fill="#8a6a2a">지표에 도달한다</text>`)}
      ${S(2,`
        <ellipse cx="300" cy="448" rx="120" ry="14" fill="#e8603c" opacity=".45"/>
        <text x="300" y="475" text-anchor="middle" font-size="16" font-weight="900" fill="#7a2f14">지표가 데워진다</text>`
        + E.fatArrow(520,428, 520,80, 18, RAD, RADS) + `
        <text x="520" y="62" text-anchor="middle" font-size="19" font-weight="900" fill="#fff">지구 복사 (적외선)</text>`)}
      ${S(3, ghMolecule(700,250,"CO₂") + ghMolecule(810,180,"CH₄") + ghMolecule(880,300,"H₂O")
        + E.fatArrow(650,428, 690,290, 16, RAD, RADS) + `
        <g stroke="#d64577" stroke-width="4" stroke-linecap="round">
          <line x1="672" y1="262" x2="658" y2="246"/><line x1="700" y1="252" x2="700" y2="230"/><line x1="726" y1="264" x2="740" y2="250"/>
        </g>
        <text x="700" y="330" text-anchor="middle" font-size="17" font-weight="900" fill="#7a4fc9">온실 기체가 적외선을 흡수!</text>
        <text x="700" y="352" text-anchor="middle" font-size="14" font-weight="700" fill="#5e3a7d">(들어오는 가시광선은 통과시키고, 나가는 적외선만 붙잡는다)</text>`)}
      ${S(4, E.fatArrow(748,290, 790,424, 14, RAD, RADS)
        + E.fatArrow(735,215, 735,80, 9, RAD, RADS) + `
        <text x="820" y="395" font-size="17" font-weight="900" fill="#b02d55">재복사</text>
        <text x="820" y="417" font-size="14" font-weight="700" fill="#b02d55">일부가 지표로 되돌아온다</text>
        <rect x="430" y="455" width="500" height="50" rx="10" fill="#0B3E86"/>
        <text x="680" y="487" text-anchor="middle" font-size="19" font-weight="900" fill="#fff">담요처럼 열을 붙잡는다 = 온실효과 🛌</text>`)}
      ${S(5,`<rect x="120" y="180" width="330" height="120" rx="14" fill="#fff" opacity=".93"/>
        <rect x="120" y="180" width="330" height="120" rx="14" fill="none" stroke="#0B3E86" stroke-width="3"/>
        <text x="285" y="218" text-anchor="middle" font-size="19" font-weight="900" fill="#3d4652">온실효과가 없다면 약 <tspan fill="#1f6fd6">−18℃</tspan></text>
        <text x="285" y="248" text-anchor="middle" font-size="19" font-weight="900" fill="#3d4652">온실효과 덕분에 약 <tspan fill="#d64545">15℃</tspan></text>
        <text x="285" y="281" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">온실효과 자체는 고마운 자연 현상!</text>`)}
    </svg>`;
  }

  let ghStep = 0, simPres = 0, opFull = false;

  /* 0 로비 */
  E.slide(() => `
    <div class="kicker">통합과학2 · 지구 환경 변화 · 호남고등학교 · ${E.clsLabel()}</div>
    <h1 class="big">지구의 체온 —<br>온실효과와 지구 온난화</h1>
    <div class="rule"></div>
    <div class="lobbywrap">
      <div class="lobbyL">
        <div style="font-size:3.2vh;font-weight:900;color:var(--navy)">💻 노트북으로 접속하세요</div>
        <div class="url">${E.ENTRY.replace("https://","")}</div>
        <div class="joined">
          <div class="cnt">접속 <b>${E.students.length}</b> / 20명</div>
          <div class="teamsrow">${[1,2,3,4,5].map(t => `
            <div class="teambox"><h4>${t}모둠</h4>${E.students.filter(s=>s.team===t).map(s=>`<span>${s.leader?"👑":""}${s.name}</span>`).join("")}</div>`).join("")}
          </div>
        </div>
      </div>
      <div class="lobbyR"><div id="qr"></div><div style="font-size:2vh;color:var(--soft);font-weight:700">QR을 찍어도 바로 열려요</div></div>
    </div>`,
    { enter(){ E.setState({phase:"lobby"}); },
      after(){ E.lobbyQR(); },
      acts(){ return [E.resetAct()]; } });

  /* 1 예측 */
  E.slide(() => {
    const preds = E.students.filter(s => s.predict !== undefined).map(s => s.predict);
    const bins = Array(10).fill(0);
    preds.forEach(p => bins[Math.min(9, Math.max(0, Math.floor((p+50)/10)))]++);
    const mx = Math.max(1, ...bins);
    const avg = preds.length ? (preds.reduce((a,b)=>a+b,0)/preds.length).toFixed(0) : "-";
    return `
    <div class="kicker">생각 열기 · 예측</div>
    <div class="qbig">지구에 <b>대기가 전혀 없다면</b>,<br>지구 표면의 평균 온도는 몇 ℃가 될까? <span style="font-size:2.6vh;color:var(--soft)">(지금은 약 15℃)</span></div>
    <div id="hist">${bins.map((n,i) => `
      <div class="hbar ${E.state.predictReveal && i===3 ? "hot":""}">
        <div class="n">${n||""}</div>
        <div class="bar" style="height:${(n/mx*30)}vh"></div>
        <div class="lb">${i*10-50}~${i*10-41}</div>
      </div>`).join("")}
    </div>
    <div class="predmeta">제출 ${preds.length}명 · 우리 반 평균 <b>${avg}℃</b>${E.state.predictReveal ? ` &nbsp;→&nbsp; 실제는 약 <b style="color:#1f6fd6">−18℃</b>! 그 33℃의 차이가 오늘의 주인공입니다` : ""}</div>`;
  }, { enter(){ E.setState({phase:"predict", predictReveal:false}); },
       acts(){ return [
         [E.state.predictOpen ? "제출 마감" : "제출 열기", E.state.predictOpen ? "ghost" : "gold", () => E.setState({predictOpen: !E.state.predictOpen})],
         ["정답 공개", "green", () => E.setState({predictOpen:false, predictReveal:true})],
       ]; } });

  /* 2 학습목표 */
  E.slide(() => `
    <div class="kicker">오늘의 목표</div>
    <h2 class="mid">이 수업이 끝나면, 여러분은</h2>
    <div class="rule"></div>
    <div class="goals">
      <p><span class="num">1</span>시뮬레이션 실험을 근거로 <b>온실효과의 원리</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(적외선 흡수와 재복사)를 설명할 수 있다.</p>
      <p style="margin-top:3vh"><span class="num">2</span>실제 관측 데이터를 해석하여 <b>지구 온난화의 증거</b>를<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수치와 함께 제시할 수 있다.</p>
    </div>
    <div style="margin-top:auto;font-size:2.4vh;color:var(--soft);font-weight:700">※ 오늘 보고 쓴 것들이 다음 시간 <b style="color:var(--navy)">수행평가(나의 생각 글쓰기)</b>의 재료가 됩니다.</div>`);

  /* 3 온실효과 원리 */
  E.slide(() => `
    <div class="kicker">개념 구성 — 온실효과의 원리</div>
    <h2 class="mid">지구는 어떻게 따뜻하게 유지될까? <span style="font-size:2.4vh;color:var(--soft)">(Space를 눌러 단계 진행 ${ghStep}/5)</span></h2>
    <div class="svgwrap">${svgGH(ghStep)}</div>`,
    { enter(){ ghStep = 0; },
      space(){ if(ghStep < 5){ ghStep++; E.render(); return true; } return false; },
      acts(){ return [["다음 단계 ▶ (Space)", "navy", () => { if(ghStep<5){ ghStep++; E.render(); } }]]; } });

  /* 4 시뮬 미션 안내 */
  E.slide(() => `
    <div class="kicker">모둠 미션 ① — 온실효과 실험실</div>
    <h2 class="mid">시뮬레이션으로 직접 확인하라!</h2>
    <div class="rule"></div>
    <div class="goals" style="font-size:3vh">
      <p>❶ <b>파형 화면</b> — 온실 기체 농도를 <b>없음 → 1750년 → 1950년 → 2020년</b>으로 바꾸며 지표 온도 기록</p>
      <p>❷ <b>광자 화면</b> — 적외선이 온실 기체에 부딪혀 <b>되돌아오는 장면</b> 관찰</p>
      <p>❸ 발견한 규칙을 <b>한 문장</b>으로 — 팀장 노트북에 입력 (모두의 화면에 실시간 공유)</p>
    </div>
    ${E.timerHTML()}`,
    { enter(){ E.setState({phase:"sim"}); E.setTimer(480); },
      acts(){ return E.timerActs(480); } });

  /* 5 시뮬 모둠 보드 현황 + 피드백(확대) */
  E.slide(() => {
    if(!simPres){
      return `
      <div class="kicker">모둠 미션 ① — 실시간 현황</div>
      <h2 class="mid" style="margin-bottom:.5vh">모둠별 실험 기록 <span style="font-size:2.2vh;color:var(--soft)">— 모둠을 누르면 피드백 화면으로 커집니다</span></h2>
      <div class="bgrid">${[1,2,3,4,5].map(t => {
        const b = E.boards[t] || {};
        const T = k => b[k] && String(b[k]).trim() !== "" ? `<b>${b[k]}</b>` : `<b class="none">?</b>`;
        return `
        <div class="bcard click" data-t="${t}">
          <h4>${t}모둠 ${b.leaderName ? `<span class="meta">👑 ${b.leaderName}</span>` : ""}<span class="sp"></span></h4>
          <div class="temps">
            <div><small>온실 기체 없음</small>${T("g0")}<small>℃</small></div>
            <div><small>1750년</small>${T("g1")}<small>℃</small></div>
            <div><small>1950년</small>${T("g2")}<small>℃</small></div>
            <div><small>2020년</small>${T("g3")}<small>℃</small></div>
          </div>
          <div class="btext">${b.rule ? "💡 " + b.rule : '<span class="dim2">발견 입력 중…</span>'}</div>
        </div>`;}).join("")}
        <div class="bcard note">🔬 온도 세 개가 말해 주는 것 —<br><b>온실 기체가 많을수록 지표는 따뜻하다.</b><br><br>피드백할 모둠을 <b>클릭</b>하세요!</div>
      </div>`;
    }
    const b = E.boards[simPres] || {};
    const T = k => b[k] && String(b[k]).trim() !== "" ? b[k] : "?";
    return `
    <div class="kicker">모둠 미션 ① — 피드백</div>
    <h2 class="mid" style="margin-bottom:1vh">${simPres}모둠의 실험 기록 ${b.leaderName ? `<span style="font-size:2.6vh;color:var(--gold-d)">👑 팀장 ${b.leaderName}</span>` : ""}</h2>
    <div style="flex:1;display:flex;flex-direction:column;gap:2.5vh;justify-content:center;max-width:100%">
      <div style="display:flex;gap:1.5vw">
        ${[["온실 기체 없음","g0"],["1750년 (산업화 전)","g1"],["1950년","g2"],["2020년 (현재)","g3"]].map(([lb,k]) => `
        <div style="flex:1;text-align:center;background:var(--lt);border:.35vh solid var(--line);border-radius:1.6vh;padding:2.5vh 1vh">
          <div style="font-size:2.2vh;font-weight:700;color:var(--soft)">${lb}</div>
          <div style="font-size:7vh;font-weight:900;color:${b[k]&&String(b[k]).trim()!==""?"var(--navy)":"#a8b2c0"}">${T(k)}<span style="font-size:3vh">℃</span></div>
        </div>`).join(`<div style="align-self:center;font-size:4.5vh;font-weight:900;color:var(--gold-d)">→</div>`)}
      </div>
      <div class="bans" style="font-size:3.4vh;padding:2.5vh 3vh"><b style="font-size:2.2vh">💡 우리 모둠의 발견</b>${b.rule || "<span class='dim2'>아직 입력 전…</span>"}</div>
      <div style="font-size:2.2vh;color:var(--soft);font-weight:700">📡 실시간 연동 — 피드백 받고 고치면 바로 반영됩니다 &nbsp;·&nbsp; 확인 포인트: 온도가 <b style="color:var(--navy)">단계적으로 높아지는가</b>, 발견 문장에 <b style="color:var(--navy)">원인(온실 기체)과 결과(온도)</b>가 모두 있는가</div>
    </div>`;
  },
  { enter(){ E.setState({phase:"sim"}); },
    after(){
      document.querySelectorAll(".bcard.click[data-t]").forEach(el => el.onclick = () => { simPres = +el.dataset.t; E.render(); });
    },
    acts(){ return !simPres ? [] : [
      ["◀ 전체 보기", "ghost", () => { simPres = 0; E.render(); }],
      ...[1,2,3,4,5].map(t => [`${t}모둠`, simPres===t ? "gold" : "navy", () => { simPres = t; E.render(); }])
    ]; } });

  /* 6 데이터 미션 안내 */
  E.slide(() => `
    <div class="kicker">모둠 미션 ② — 데이터 탐정</div>
    <h2 class="mid">그렇다면, 실제 지구에서는 무슨 일이? <span style="font-size:2.4vh;color:var(--soft)">— 모둠마다 다른 진짜 관측 데이터</span></h2>
    <div style="display:flex;gap:3vw;flex:1;min-height:0">
      <div class="goals" style="font-size:2.8vh;flex:1.1">
        ${[1,2,3,4,5].map(t => `<p><span class="num">${t}</span><b>${t}모둠</b> — ${DATASETS[t].name}</p>`).join("")}
      </div>
      <div style="flex:1;display:flex;flex-direction:column">
        <div class="goals" style="font-size:2.7vh">
          <p>① 이 데이터가 <b>말하는 것</b> (한 문장)</p>
          <p>② <b>근거 수치</b> (시작값 → 최근값)</p>
          <p>③ <b>온실효과 강화와의 연결</b></p>
          <p style="font-size:2.2vh;color:var(--soft);margin-top:1vh">잠시 후 모둠별로 <b>발표</b>합니다 — 다섯 조각을 모으면 지구 온난화의 전체 그림 완성!</p>
        </div>
        ${E.timerHTML()}
      </div>
    </div>`,
    { enter(){ E.setState({phase:"data"}); E.setTimer(600); },
      acts(){ return E.timerActs(600); } });

  /* 7 데이터 모둠 보드 + 발표 */
  E.slide(() => {
    if(!P.team){
      return `
      <div class="kicker">모둠 미션 ② — 실시간 현황</div>
      <h2 class="mid" style="margin-bottom:.5vh">데이터 분석 한눈에 보기 <span style="font-size:2.2vh;color:var(--soft)">— 모둠을 누르거나 🎲 뽑기로 발표 순서를 정하세요</span></h2>
      <div class="bgrid">${[1,2,3,4,5].map(t => {
        const b = E.boards[t] || {};
        return `
        <div class="bcard click ${P.hl===t ? "hl" : ""}" data-t="${t}">
          <h4>${t}모둠 · ${DATASETS[t].short} ${b.leaderName ? `<span class="meta">👑 ${b.leaderName}</span>` : ""}<span class="sp"></span>${P.presented.has(t) ? '<span class="donebdg">✓ 발표함</span>' : ""}</h4>
          <div class="minichart">${chartSVG(t)}</div>
          <div class="btext" style="font-size:1.9vh">${b.find ? "① " + b.find : '<span class="dim2">① 입력 중…</span>'}</div>
        </div>`;}).join("")}
        <div class="bcard note">📡 팀장 노트북과 <b>실시간 연동</b> 중.<br><br>🎲 <b>발표 모둠 뽑기</b>를 누르면 아직 발표 안 한 모둠 중에서 <b>랜덤으로</b> 뽑아요!</div>
      </div>`;
    }
    const b = E.boards[P.team] || {};
    return `
    <div class="kicker">모둠 발표 — ${DATASETS[P.team].name}</div>
    <h2 class="mid" style="margin-bottom:1vh">${P.team}모둠 ${b.leaderName ? `<span style="font-size:2.6vh;color:var(--gold-d)">👑 팀장 ${b.leaderName}</span>` : ""}${P.speaker ? ` <span style="font-size:2.6vh;background:var(--gold);color:var(--navy2);border-radius:1vh;padding:.5vh 1.6vh">🎤 발표자 ${P.speaker}</span>` : ""}</h2>
    <div style="flex:1;display:flex;gap:2.5vw;min-height:0;align-items:center">
      <div style="flex:1.4;max-width:120vh"><div class="minichart" style="border-width:.3vh">${chartSVG(P.team)}</div></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:1.6vh;min-width:0">
        <div class="bans"><b>① 이 데이터가 말하는 것</b>${b.find || "<span class='dim2'>아직 입력 전…</span>"}</div>
        <div class="bans"><b>② 근거 수치</b>${b.evid || "<span class='dim2'>아직 입력 전…</span>"}</div>
        <div class="bans"><b>③ 온실효과 강화와의 연결</b>${b.link || "<span class='dim2'>아직 입력 전…</span>"}</div>
        <div style="font-size:2vh;color:var(--soft);font-weight:700">📡 실시간 연동 — 발표 중에 고치면 바로 반영됩니다</div>
      </div>
    </div>`;
  },
  { enter(){ E.setState({phase:"data"}); },
    after(){
      document.querySelectorAll(".bcard.click[data-t]").forEach(el => el.onclick = () => { if(!P.drawing) P.open(+el.dataset.t); });
    },
    acts(){
      if(!P.team){
        const a = [["🎲 발표 모둠 뽑기", "gold", P.drawTeam]];
        if(P.presented.size) a.push(["뽑기 초기화", "ghost", P.reset]);
        return a;
      }
      return [
        ["◀ 전체 보기", "ghost", P.back],
        ["🎤 발표자 뽑기", "gold", P.drawSpeaker],
        ...[1,2,3,4,5].map(t => [`${t}모둠`, P.team===t ? "gold" : "navy", () => P.open(t)])
      ];
    } });

  /* 8 상호 투표 */
  E.slide(() => {
    const sents = E.state.sentences || {};
    const votes = {1:0,2:0,3:0,4:0,5:0};
    E.students.forEach(s => { if(s.vote) votes[s.vote] = (votes[s.vote]||0)+1; });
    const mxV = Math.max(...Object.values(votes));
    const voted = E.students.filter(s => s.vote).length;
    return `
    <div class="kicker">상호 평가 — 데이터 해석</div>
    <h2 class="mid">가장 설득력 있는 분석은? <span style="font-size:2.4vh;color:var(--soft)">투표 ${voted}/${E.students.length}명</span></h2>
    <div class="sents">${[1,2,3,4,5].map(t => {
      const s = sents[t] || {};
      return `
      <div class="sent ${E.state.voteDone && votes[t]===mxV && mxV>0 ? "best":""} ${s.text?"":"empty"}">
        <span class="tno">${t}모둠</span>
        <span class="ds">${DATASETS[t].short}</span>
        <span class="tx">${s.text || "아직 제출 전…"}</span>
        <span class="vt">${votes[t]}표</span>
      </div>`;}).join("")}
    </div>
    <div style="flex-shrink:0; font-size:2.2vh; font-weight:700; color:var(--soft)">투표 기준 — <b>수치 근거</b>가 정확한가, <b>온실효과와의 연결</b>이 논리적인가!</div>`;
  },
  { enter(){ E.setState({phase:"vote", sentences:E.collectSentences(DATASETS)}); },
    acts(){ return [
      ["문장 다시 불러오기", "ghost", () => E.setState({sentences:E.collectSentences(DATASETS)})],
      ["베스트 공개", "green", () => E.setState({voteDone:true})],
    ]; } });

  /* 9 정리 */
  E.slide(() => {
    const preds = E.students.filter(s => s.predict !== undefined).map(s => s.predict);
    const avg = preds.length ? (preds.reduce((a,b)=>a+b,0)/preds.length).toFixed(0) : "-";
    return `
    <div class="kicker">정리 — 오늘의 핵심 구조</div>
    <h2 class="mid">시뮬레이션의 원리 + 데이터의 증거 = 지구 온난화</h2>
    <div class="sumflow" style="flex:1;align-content:center">
      <div class="sumbox">화석 연료 사용<small>산업화 이후</small></div><span class="sumarrow">→</span>
      <div class="sumbox">온실 기체 증가<small>CO₂ 315 → 423 ppm</small></div><span class="sumarrow">→</span>
      <div class="sumbox" style="border-color:var(--red);color:var(--red)">재복사 증가<small>담요가 두꺼워진다</small></div><span class="sumarrow">→</span>
      <div class="sumbox">평균 기온 상승<small>+1.28℃ · 해수면 +105mm<br>해빙 감소 · 한반도 +1.6℃</small></div>
    </div>
    <div style="font-size:2.7vh;font-weight:700;color:var(--soft)">
      ✔ 도입 질문의 답 — 대기가 없다면 약 <b style="color:#1f6fd6">−18℃</b> (우리 반 예측 평균 ${avg}℃) · 온실효과 <b style="color:var(--navy)">자체는 고마운 자연 현상</b>, 문제는 <b style="color:var(--red)">강화</b>!</div>`;
  });

  /* 10 나의 생각 한 문장 */
  E.slide(() => {
    const ops = E.students.filter(s => s.opinion).sort((a,b)=>(a.opinionTs||0)-(b.opinionTs||0));
    const list = opFull ? ops : ops.slice(-10);
    return `
    <div class="kicker">정리 — 나의 생각${opFull ? ` · 전체 목록 (${E.clsShort()})` : ""}</div>
    <h2 class="mid">오늘 본 것을 바탕으로, 나의 생각 한 문장 <span style="font-size:2.4vh;color:var(--soft)">제출 ${ops.length}/${E.students.length}명</span></h2>
    ${opFull ? "" : `<div style="font-size:2.5vh;font-weight:700;color:var(--soft)">💻 각자 노트북에 — <b style="color:var(--navy)">"온실효과는 지구를 지켜 주는 고마운 현상이라는데, 왜 지구 온난화를 걱정할까?"</b> 이 질문에 대한 나의 생각을 1~2문장으로. (시뮬레이션·데이터에서 본 것을 담으면 최고!)</div>`}
    <div class="opfeed" style="${opFull ? "overflow-y:auto" : ""}">${list.map(s => `<div class="opline"><b>${s.team}모둠 ${s.name}</b>${s.opinion}</div>`).join("")}</div>`;
  },
  { enter(){ E.setState({phase:"end"}); opFull = false; },
    acts(){ return [[opFull ? "최근 10개만 보기" : "전체 목록 보기 (수행평가용)", opFull ? "ghost" : "gold", () => { opFull = !opFull; E.render(); }]]; } });

  /* 11 마무리 — 수행평가 예고 */
  E.slide(() => {
    const ops = E.students.filter(s => s.opinion);
    return `
    <div class="kicker">다음 시간 예고</div>
    <h2 class="mid">오늘 쓴 한 문장이, 한 편의 글이 됩니다</h2>
    <div class="rule"></div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center">
      <div style="border:.5vh solid var(--navy); border-radius:2vh; padding:4vh 5vh; max-width:120vh">
        <div style="font-size:2.2vh;font-weight:900;color:var(--gold-d);letter-spacing:.14em;margin-bottom:1.5vh">수행평가 안내 — 과학 글쓰기</div>
        <div style="font-size:3.6vh;font-weight:900;color:var(--navy2);line-height:1.45">『온실효과는 지구를 지켜 주는<br>고마운 현상이라는데,<br>왜 지구 온난화를 걱정할까?』</div>
        <div style="font-size:2.3vh;font-weight:700;color:var(--soft);margin-top:1.2vh">— 이 질문에 답하는 글을 씁니다 (다음 시간 수업 중 작성 · 400~600자)</div>
        <div class="goals" style="font-size:2.5vh;margin-top:2vh">
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">1</span><b>원리</b> — 온실효과가 일어나는 과정 설명 (<b>온실 기체 · 적외선 · 재복사</b> 중 2개 이상의 용어 사용)</p>
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">2</span><b>증거</b> — 오늘 분석한 5개 데이터 중 <b>1개 이상의 수치</b>를 인용</p>
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">3</span><b>생각</b> — 오늘 제출한 <b>나의 생각 한 문장</b>에서 출발한 나의 입장과 이유</p>
        </div>
      </div>
    </div>
    <div style="font-size:2.4vh;font-weight:700;color:var(--soft)">오늘 생각 제출 ${ops.length}/${E.students.length}명 — 아직 제출 전인 사람은 지금 제출하세요! 수고했습니다 🌏</div>`;
  },
  { enter(){ E.setState({phase:"end"}); } });
}
