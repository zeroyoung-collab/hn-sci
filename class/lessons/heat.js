/* 지구의 가계부 — 열수지와 복사 평형 (교사 콘솔 수업 모듈)
   원본: heat/teacher.html — 데이터 저장은 pw_openclass_heat(_c<반>) 그대로 사용 */
export default function build(E){
  const P = E.presenter;
  const REAL = { ref:30, atm:23, srf:47 };   // 완자 120쪽 — 반사 및 산란 30(대기 23+지표면 7) · 대기의 흡수 23 · 지표면 흡수 47

  /* ── 모둠별 데이터셋 (학생 앱과 동일) ── */
  const DATASETS = {
    1:{ name:"화산 분출과 지구의 반사율", short:"피나투보 화산" },
    2:{ name:"달과 지구의 낮밤 온도", short:"달 vs 지구" },
    3:{ name:"표면에 따라 다른 반사율", short:"알베도·해빙" },
    4:{ name:"지구 에너지 불균형", short:"흡수−방출 위성" },
    5:{ name:"하루 동안의 일사량과 기온", short:"일사와 기온" },
  };

  /* ── 차트 (학생 앱과 동일 데이터) ── */
  function chartPinatubo(){
    const pts=[[1988,0.41],[1989,0.29],[1990,0.45],[1991,0.40],[1992,0.02],[1993,0.08],[1994,0.22],[1995,0.42],[1996,0.35]];
    return E.lineChart({ title:"피나투보 화산 분출과 지구 평균 기온", sub:"1951~1980년 평균 대비 기온 편차 (℃)", ylabel:"기온 편차 (℃)",
      src:"자료: NASA GISS", xmin:1987, xmax:1997.5, ymin:-0.25, ymax:0.75, zero:0,
      yticks:[-0.2,0,0.2,0.4,0.6], xticks:[1988,1990,1992,1994,1996], pts, dots:true, color:"#d64545",
      marks:[[1991,0.40,"1991.6 분출 🌋","start",-14],[1992,0.02,"약 0.4~0.5℃ 하강","start",26]] });
  }
  function chartMoon(){
    return E.barChart({ title:"달과 지구의 낮밤 온도", sub:"대기가 없는 달(적도) vs 대기가 있는 지구(사하라 사막)", ylabel:"온도 (℃)",
      src:"자료: NASA·기상 관측", ymin:-210, ymax:180, zero:0, yticks:[-150,-100,-50,0,50,100,150],
      cats:[ {label:"달 · 낮", val:127, vlabel:"+127℃", color:"#e09b00"},
             {label:"달 · 밤", val:-173, vlabel:"−173℃", color:"#1f6fd6"},
             {label:"사하라 · 낮", val:38, vlabel:"+38℃", color:"#e09b00"},
             {label:"사하라 · 밤", val:5, vlabel:"+5℃", color:"#1f6fd6"} ],
      notes:[[0.5,165,"일교차 약 300℃!"],[2.5,165,"일교차 약 33℃"]] });
  }
  function chartAlbedo(){
    return E.barChart({ title:"표면에 따라 다른 반사율(알베도)", sub:"표면이 태양 복사를 반사하는 비율 — 지구 전체 평균은 30 %", ylabel:"반사율",
      src:"자료: 지구과학 관측 자료", ymin:0, ymax:1.0, yticks:[0,0.2,0.4,0.6,0.8,1.0],
      cats:[ {label:"갓 내린 눈", val:0.85, vlabel:"85%", color:"#8fb2d6"},
             {label:"해빙(얼음)", val:0.5, vlabel:"50%", color:"#5b9bd5"},
             {label:"사막 모래", val:0.4, vlabel:"40%", color:"#d8b24a"},
             {label:"숲", val:0.15, vlabel:"15%", color:"#1A9A3E"},
             {label:"바다", val:0.06, vlabel:"6%", color:"#1f6fd6"} ],
      notes:[[2,0.97,"밝을수록 많이 반사 · 어두울수록 많이 흡수","#c8920a"]] });
  }
  function chartEEI(){
    const pts=[[2001,0.45],[2003,0.5],[2005,0.55],[2008,0.6],[2010,0.65],[2012,0.72],[2015,0.85],[2017,0.95],[2019,1.05],[2021,1.2],[2023,1.4]];
    return E.lineChart({ title:"지구 에너지 불균형 (흡수 − 방출)", sub:"위성으로 잰 전 지구 평균 (W/m²) — 0이면 복사 평형", ylabel:"흡수 − 방출 (W/m²)",
      src:"자료: NASA CERES", xmin:2000, xmax:2025, ymin:-0.2, ymax:1.7, zero:0,
      yticks:[0,0.5,1.0,1.5], xticks:[2001,2010,2023], pts, dots:true, color:"#d64545",
      marks:[[2001,0.45,"2001년 +0.45","start",-12],[2023,1.4,"2023년 +1.4 W/m²","end",-12]],
      notes:[[2010,-0.12,"0 = 흡수량과 방출량이 같은 상태(복사 평형)","middle","#3d4652"]] });
  }
  function chartDay(){
    const sun=[[0,0],[5.5,0],[6,2],[7,14],[8,30],[9,48],[10,66],[11,84],[12,97],[12.5,100],[13,97],[14,84],[15,66],[16,48],[17,30],[18,14],[19,2],[19.5,0],[24,0]];
    const tmp=[[0,38],[2,32],[4,26],[6,22],[7,24],[8,30],[10,46],[12,62],[13,72],[14,80],[15,85],[16,83],[17,78],[18,71],[20,57],[22,46],[24,39]];
    return E.lineChart({ title:"하루 동안의 일사량과 기온", sub:"맑은 날의 태양 복사(일사량)와 기온 변화 — 상대값", ylabel:"상대 크기 (%)",
      src:"자료: 기상 관측", xmin:0, xmax:24, ymin:0, ymax:112, yticks:[0,25,50,75,100],
      xticks:[0,6,12,18,24], xfmt:t=>t+"시",
      series:[ {pts:sun, color:"#e09b00", label:"일사량(받는 에너지)"}, {pts:tmp, color:"#d64545", label:"기온"} ],
      marks:[[12.5,100,"일사 최대 — 남중(약 12시 30분)","start",-12],[15,85,"기온 최대 15시","start",24]] });
  }
  const chartSVG = t => [chartPinatubo, chartMoon, chartAlbedo, chartEEI, chartDay][t-1]();

  /* ── 하늘·대기·지표 배경 ── */
  const bandsSVG = (w,h,spaceH,groundY) => `
    <defs>
      <linearGradient id="hatm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#aecfee"/><stop offset="1" stop-color="#dcebfa"/></linearGradient>
      <linearGradient id="hspc" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#101b36"/><stop offset="1" stop-color="#2b4573"/></linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${spaceH}" fill="url(#hspc)"/>
    <g fill="#fff" opacity=".8">
      <circle cx="90" cy="14" r="1.5"/><circle cx="215" cy="50" r="1.2"/><circle cx="345" cy="14" r="1.5"/>
      <circle cx="555" cy="52" r="1.2"/><circle cx="640" cy="16" r="1.5"/><circle cx="905" cy="60" r="1.2"/>
    </g>
    <rect x="0" y="${spaceH}" width="${w}" height="${groundY-spaceH}" fill="url(#hatm)"/>
    <rect x="0" y="${groundY}" width="${w}" height="${h-groundY-34}" fill="#cdbf9f"/>
    <rect x="0" y="${h-34}" width="${w}" height="34" fill="#b3a184"/>
    <line x1="0" y1="${spaceH}" x2="${w}" y2="${spaceH}" stroke="#8fb2d6" stroke-width="1.5"/>
    <line x1="0" y1="${groundY}" x2="${w}" y2="${groundY}" stroke="#a4906d" stroke-width="1.5"/>
    <rect x="14" y="22" width="58" height="30" rx="15" fill="#5b7cad"/><text x="43" y="43" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">우주</text>
    <rect x="14" y="240" width="58" height="30" rx="15" fill="#3f6ea8"/><text x="43" y="261" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">대기</text>
    <rect x="14" y="${groundY+22}" width="58" height="30" rx="15" fill="#7a674a"/><text x="43" y="${groundY+43}" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">지표</text>`;

  /* ── 개념 브리핑 — 세 갈래 길 (수치 없음) ── */
  function svgIntro(step){
    const S = (n, html) => step >= n ? html : "";
    const SOL="#ffc93c", SOLS="#e09b00";
    return `<svg viewBox="0 0 960 520">
      ${bandsSVG(960,520,70,440)}
      <circle cx="170" cy="36" r="24" fill="#ffd23c" stroke="#e09b00" stroke-width="3"/>
      ${S(1, E.fatArrow(170,62, 170,250, 32, SOL, SOLS) + `
        <text x="250" y="40" font-size="22" font-weight="900" fill="#fff">태양 복사 에너지 100</text>
        <text x="170" y="150" text-anchor="middle" font-size="16" font-weight="700" fill="#8a6a2a">지구에 도착!</text>`)}
      ${S(2, E.fatArrow(205,260, 330,66, 18, "#ffe28a", SOLS) + `
        <text x="345" y="100" font-size="20" font-weight="900" fill="#fff">① 반사 및 산란 — ?</text>
        <text x="345" y="124" font-size="14" font-weight="700" fill="#cdd9ec">구름·대기·지표면에서 우주로 되돌아감</text>`
        + `<circle cx="470" cy="270" r="40" fill="#9b7dd9" opacity=".45"/>`
        + E.fatArrow(195,275, 420,272, 16, "#9b7dd9", "#7a4fc9") + `
        <text x="470" y="276" text-anchor="middle" font-size="24" font-weight="900" fill="#5e3a7d">?</text>
        <text x="470" y="336" text-anchor="middle" font-size="19" font-weight="900" fill="#5e3a7d">② 대기의 흡수</text>`
        + E.fatArrow(170,268, 170,428, 24, "#f0845c", "#d1532c") + `
        <ellipse cx="170" cy="448" rx="100" ry="13" fill="#e8603c" opacity=".4"/>
        <text x="255" y="408" font-size="19" font-weight="900" fill="#7a2f14">③ 지표면 흡수 — ?</text>`)}
      ${S(3,`<rect x="580" y="140" width="350" height="150" rx="14" fill="#fff" opacity=".95"/>
        <rect x="580" y="140" width="350" height="150" rx="14" fill="none" stroke="#0B3E86" stroke-width="3"/>
        <text x="755" y="182" text-anchor="middle" font-size="20" font-weight="900" fill="#0B3E86">🔑 단 하나의 규칙</text>
        <text x="755" y="216" text-anchor="middle" font-size="19" font-weight="900" fill="#3d4652">반사된 에너지는</text>
        <text x="755" y="244" text-anchor="middle" font-size="19" font-weight="900" fill="#d64545">지구를 데우지 못한다!</text>
        <text x="755" y="274" text-anchor="middle" font-size="15" font-weight="700" fill="#c8920a">①+②+③ = 100 — 몇 대 몇일지는 여러분이 정하라</text>`)}
    </svg>`;
  }

  /* ── 완자 120쪽 지구 열수지 — 단계 완성 ── */
  function svgHB(step){
    const S = (n, html) => step >= n ? html : "";
    const SOL="#ffc93c", SOLS="#e09b00", RAD="#f2729b", RADS="#d64577", EVP="#6fb3e0", EVPS="#3a85b8";
    return `<svg viewBox="0 0 960 540">
      ${bandsSVG(960,540,70,440)}
      <circle cx="150" cy="36" r="24" fill="#ffd23c" stroke="#e09b00" stroke-width="3"/>
      ${S(1, E.fatArrow(150,62, 150,254, 30, SOL, SOLS) + `
        <text x="205" y="22" font-size="21" font-weight="900" fill="#fff">태양 복사 100</text>`)}
      ${S(2, E.fatArrow(188,262, 296,66, 15, "#ffe28a", SOLS) + `
        <text x="300" y="46" font-size="19" font-weight="900" fill="#fff">반사 및 산란 30</text>
        <text x="300" y="68" font-size="13.5" font-weight="700" fill="#cdd9ec">대기의 반사 및 산란 23 + 지표면 반사 7 — 지구를 데우지 못함</text>`)}
      ${S(3, `<circle cx="330" cy="282" r="30" fill="#9b7dd9" opacity=".5"/>`
        + E.fatArrow(178,276, 292,280, 12, "#9b7dd9", "#7a4fc9") + `
        <text x="330" y="288" text-anchor="middle" font-size="18" font-weight="900" fill="#5e3a7d">23</text>
        <text x="330" y="330" text-anchor="middle" font-size="16" font-weight="900" fill="#5e3a7d">대기의 흡수</text>`
        + E.fatArrow(150,270, 150,428, 22, "#f0845c", "#d1532c") + `
        <ellipse cx="150" cy="448" rx="90" ry="13" fill="#e8603c" opacity=".4"/>
        <text x="162" y="412" font-size="17" font-weight="900" fill="#7a2f14">지표면 흡수 47</text>
        <rect x="30" y="486" width="360" height="40" rx="9" fill="#fff" opacity=".93"/>
        <text x="210" y="512" text-anchor="middle" font-size="17" font-weight="900" fill="#0B3E86">지구가 흡수한 에너지 = 23 + 47 = 70</text>`)}
      ${S(4, E.fatArrow(520,430, 520,180, 22, RAD, RADS) + `
        <text x="532" y="400" font-size="17" font-weight="900" fill="#b02d55">지표면 방출 116</text>
        <circle cx="520" cy="200" r="26" fill="#f2729b" opacity=".4"/>
        <text x="556" y="196" font-size="15" font-weight="900" fill="#b02d55">대기가 104 흡수</text>`
        + E.fatArrow(575,170, 575,64, 7, RAD, RADS) + `
        <text x="590" y="110" font-size="15" font-weight="900" fill="#fff">우주로 손실 12</text>`
        + E.fatArrow(680,430, 680,320, 11, EVP, EVPS) + `
        <text x="668" y="366" text-anchor="end" font-size="15" font-weight="900" fill="#1d5f86">물의 증발 24</text>`
        + E.fatArrow(745,430, 745,352, 6, EVP, EVPS) + `
        <text x="757" y="392" font-size="14" font-weight="900" fill="#1d5f86">대류와 전도 5</text>`)}
      ${S(5, E.fatArrow(870,230, 870,428, 18, RAD, RADS) + `
        <text x="848" y="258" text-anchor="end" font-size="16" font-weight="900" fill="#b02d55">대기의 재복사 98</text>
        <text x="848" y="280" text-anchor="end" font-size="13" font-weight="700" fill="#7a3350">지표로 되돌아옴 — 온실효과!</text>`
        + E.fatArrow(712,210, 712,64, 13, RAD, RADS) + `
        <text x="726" y="86" font-size="16" font-weight="900" fill="#fff">대기의 복사 58</text>
        <rect x="620" y="8" width="326" height="48" rx="10" fill="#0B3E86"/>
        <text x="783" y="38" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">우주로 나가는 지구 복사 = 12 + 58 = 70</text>`)}
      ${S(6, `<rect x="60" y="94" width="400" height="250" rx="14" fill="#fff" opacity=".96"/>
        <rect x="60" y="94" width="400" height="250" rx="14" fill="none" stroke="#c8920a" stroke-width="3.5"/>
        <text x="260" y="128" text-anchor="middle" font-size="19" font-weight="900" fill="#c8920a">📒 가계부 결산 — 영역별 열수지</text>
        <text x="90" y="163" font-size="17" font-weight="900" fill="#3d4652">대기 &nbsp;&nbsp;흡수 <tspan fill="#0B3E86">156</tspan> = 방출 <tspan fill="#0B3E86">156</tspan> <tspan font-size="13" fill="#8a93a1">(23+104+24+5 = 58+98)</tspan></text>
        <text x="90" y="196" font-size="17" font-weight="900" fill="#3d4652">지표면 흡수 <tspan fill="#0B3E86">145</tspan> = 방출 <tspan fill="#0B3E86">145</tspan> <tspan font-size="13" fill="#8a93a1">(47+98 = 116+24+5)</tspan></text>
        <text x="90" y="229" font-size="17" font-weight="900" fill="#3d4652">지구 전체 흡수 <tspan fill="#0B3E86">70</tspan> = 방출 <tspan fill="#0B3E86">70</tspan></text>
        <text x="260" y="264" text-anchor="middle" font-size="18" font-weight="900" fill="#d64545">흡수량 = 방출량 → 복사 평형 → 체온 일정!</text>`)}
    </svg>`;
  }

  /* ── 위도별 에너지 수지 (전체 공유) ── */
  function svgLat(step){
    const w=960, h=520, ml=100, mr=40, mt=86, mb=70;
    const iw=w-ml-mr, ih=h-mt-mb;
    const X=x=>ml+x/90*iw;
    const Y=y=>mt+ih-(y-0)/350*ih;
    const abs=[[0,300],[10,295],[20,280],[30,250],[38,230],[50,180],[60,130],[70,90],[80,60],[90,45]];
    const emi=[[0,250],[10,248],[20,244],[30,238],[38,230],[50,215],[60,200],[70,185],[80,175],[90,170]];
    const line = pts => pts.map(p=>`${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
    let g = "";
    [0,100,200,300].forEach(t=>{ g += `<line x1="${ml}" y1="${Y(t)}" x2="${w-mr}" y2="${Y(t)}" stroke="#e3e9f2" stroke-width="1.5"/>
      <text x="${ml-10}" y="${Y(t)+5}" text-anchor="end" font-size="16" fill="#3d4652">${t}</text>`; });
    [0,30,60,90].forEach(t=>{ g += `<text x="${X(t)}" y="${h-mb+28}" text-anchor="middle" font-size="17" fill="#3d4652">${t}°</text>`; });
    g += `<text x="${X(0)}" y="${h-mb+52}" text-anchor="middle" font-size="15" font-weight="700" fill="#c8920a">적도</text>
          <text x="${X(90)}" y="${h-mb+52}" text-anchor="middle" font-size="15" font-weight="700" fill="#1f6fd6">극</text>`;
    if(step>=1){
      const band=(pts1,pts2,a,b,fill)=>{
        const f=pts1.filter(p=>p[0]>=a&&p[0]<=b), r=pts2.filter(p=>p[0]>=a&&p[0]<=b).reverse();
        return `<polygon points="${line(f)} ${line(r)}" fill="${fill}"/>`;
      };
      g += band(abs,emi,0,38,"rgba(245,179,1,.3)") + band(emi,abs,38,90,"rgba(31,111,214,.22)");
      g += `<line x1="${X(38)}" y1="${mt}" x2="${X(38)}" y2="${h-mb}" stroke="#3d4652" stroke-width="2.5" stroke-dasharray="7 5"/>
        <text x="${X(38)}" y="${mt-10}" text-anchor="middle" font-size="18" font-weight="900" fill="#3d4652">위도 약 38°</text>
        <text x="${X(16)}" y="${Y(285)}" text-anchor="middle" font-size="19" font-weight="900" fill="#c8920a">에너지 과잉</text>
        <text x="${X(16)}" y="${Y(262)}" text-anchor="middle" font-size="15" font-weight="700" fill="#8a6a2a">흡수량 &gt; 방출량</text>
        <text x="${X(68)}" y="${Y(215)}" text-anchor="middle" font-size="19" font-weight="900" fill="#1f6fd6">에너지 부족</text>
        <text x="${X(68)}" y="${Y(192)}" text-anchor="middle" font-size="15" font-weight="700" fill="#2a5a8a">흡수량 &lt; 방출량</text>`;
    }
    g += `<line x1="${ml}" y1="${mt-6}" x2="${ml}" y2="${h-mb}" stroke="#3d4652" stroke-width="2.5"/>
          <line x1="${ml}" y1="${h-mb}" x2="${w-mr}" y2="${h-mb}" stroke="#3d4652" stroke-width="2.5"/>
          <polyline points="${line(abs)}" fill="none" stroke="#e09b00" stroke-width="4.5" stroke-linejoin="round"/>
          <polyline points="${line(emi)}" fill="none" stroke="#d64545" stroke-width="4.5" stroke-linejoin="round"/>`;
    const lx=w-mr-310, ly=mt+6;
    g += `<line x1="${lx}" y1="${ly}" x2="${lx+36}" y2="${ly}" stroke="#e09b00" stroke-width="6"/>
      <text x="${lx+44}" y="${ly+6}" font-size="17" font-weight="700" fill="#3d4652">태양 복사 에너지 흡수량</text>
      <line x1="${lx}" y1="${ly+28}" x2="${lx+36}" y2="${ly+28}" stroke="#d64545" stroke-width="6"/>
      <text x="${lx+44}" y="${ly+34}" font-size="17" font-weight="700" fill="#3d4652">지구 복사 에너지 방출량</text>`;
    const q = step>=2 ? `<rect x="190" y="396" width="580" height="74" rx="14" fill="#0B3E86"/>
      <text x="480" y="427" text-anchor="middle" font-size="21" font-weight="900" fill="#fff">그런데 왜 적도는 계속 뜨거워지지 않고,</text>
      <text x="480" y="456" text-anchor="middle" font-size="21" font-weight="900" fill="#F5B301">극은 계속 차가워지지 않을까? 🤔</text>` : "";
    return `<svg viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="#fff"/>
      <text x="30" y="40" font-size="25" font-weight="900" fill="#092f66">위도별 에너지 수지 — 흡수량과 방출량 (연평균)</text>
      <text x="30" y="66" font-size="16" font-weight="700" fill="#3d4652">단위: W/m² · 자료: 위성 관측 기반(수업용 재구성)</text>
      <text x="30" y="${mt+ih/2}" text-anchor="middle" font-size="15" font-weight="900" fill="#0B3E86" transform="rotate(-90 30 ${mt+ih/2})">에너지양 (W/m²)</text>
      ${g}${q}
    </svg>`;
  }

  const allocOf = t => {
    const b = E.boards[t] || {};
    const has = b.ref !== undefined && b.ref !== "";
    return { has, r:+b.ref||0, a:+b.atm||0, s:+b.srf||0, rule:b.rule, leaderName:b.leaderName,
      sum:(+b.ref||0)+(+b.atm||0)+(+b.srf||0) };
  };
  function closestTeam(){
    let best=0, bestScore=1e9;
    for(let t=1;t<=5;t++){ const o=allocOf(t);
      if(!o.has || o.sum===0) continue;
      const sc = Math.abs(o.r-REAL.ref)+Math.abs(o.a-REAL.atm)+Math.abs(o.s-REAL.srf);
      if(sc<bestScore){ bestScore=sc; best=t; } }
    return best;
  }

  let introStep = 0, hbStep = 0, latStep = 0, allocPres = 0, opFull = false;

  /* 0 로비 */
  E.slide(() => `
    <div class="kicker">통합과학2 · 지구 환경 변화 1/3 · 호남고등학교 · ${E.clsLabel()}</div>
    <h1 class="big">지구의 가계부 —<br>열수지와 복사 평형</h1>
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
    preds.forEach(p => bins[Math.min(9, Math.max(0, Math.floor(p/10)))]++);
    const mx = Math.max(1, ...bins);
    const avg = preds.length ? (preds.reduce((a,b)=>a+b,0)/preds.length).toFixed(0) : "-";
    return `
    <div class="kicker">생각 열기 · 예측</div>
    <div class="qbig">태양에서 들어오는 복사 에너지를 <b>100</b>이라 할 때,<br><b>지표면이 흡수하는 양</b>은 얼마일까? <span style="font-size:2.6vh;color:var(--soft)">(0~100)</span></div>
    <div id="hist">${bins.map((n,i) => `
      <div class="hbar ${E.state.predictReveal && i===4 ? "hot":""}">
        <div class="n">${n||""}</div>
        <div class="bar" style="height:${(n/mx*30)}vh"></div>
        <div class="lb">${i*10}~${i===9?100:i*10+9}</div>
      </div>`).join("")}
    </div>
    <div class="predmeta">제출 ${preds.length}명 · 우리 반 평균 <b>${avg}</b>${E.state.predictReveal ? ` &nbsp;→&nbsp; 실제는 <b>47</b>! 미션에서 확인한 그대로 (완자 120쪽)` : " &nbsp;·&nbsp; 정답은 미션 후에 공개됩니다"}</div>`;
  }, { enter(){ E.setState({phase:"predict", predictReveal:false}); },
       acts(){ return [
         [E.state.predictOpen ? "제출 마감" : "제출 열기", E.state.predictOpen ? "ghost" : "gold", () => E.setState({predictOpen: !E.state.predictOpen})],
       ]; } });

  /* 2 학습목표 */
  E.slide(() => `
    <div class="kicker">오늘의 목표</div>
    <h2 class="mid">이 수업이 끝나면, 여러분은</h2>
    <div class="rule"></div>
    <div class="goals">
      <p><span class="num">1</span>지구 열수지 그림에서 <b>각 영역의 흡수량 = 방출량</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(복사 평형)임을 설명할 수 있다.</p>
      <p style="margin-top:3vh"><span class="num">2</span>실제 관측 데이터를 <b>열수지(흡수와 방출)</b>의 눈으로<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;해석하여 수치와 함께 제시할 수 있다.</p>
    </div>
    <div style="margin-top:auto;font-size:2.4vh;color:var(--soft);font-weight:700">※ 오늘 완성하는 <b style="color:var(--navy)">지구 열수지 그림(완자 120쪽)</b>은 이번 시험 범위의 핵심 자료입니다.</div>`);

  /* 3 개념 브리핑 — 세 갈래 길 */
  E.slide(() => `
    <div class="kicker">개념 브리핑 — 에너지의 세 갈래 길</div>
    <h2 class="mid">태양 에너지 100은 어디로 갈까? <span style="font-size:2.4vh;color:var(--soft)">(Space를 눌러 단계 진행 ${introStep}/3)</span></h2>
    <div class="svgwrap">${svgIntro(introStep)}</div>`,
    { enter(){ introStep = 0; },
      space(){ if(introStep < 3){ introStep++; E.render(); return true; } return false; },
      acts(){ return [["다음 단계 ▶ (Space)", "navy", () => { if(introStep<3){ introStep++; E.render(); } }]]; } });

  /* 4 미션① 안내 */
  E.slide(() => `
    <div class="kicker">모둠 미션 ① — 에너지 100 배분하기</div>
    <h2 class="mid">우리 모둠의 지구 가계부를 제출하라!</h2>
    <div class="rule"></div>
    <div class="goals" style="font-size:3vh">
      <p>❶ 모둠 토론 — <b>반사 및 산란 / 대기의 흡수 / 지표면 흡수</b>는 각각 얼마일까?</p>
      <p>❷ <b>팀장 보드의 슬라이더</b>로 제출 — 합계 <b>100</b>을 맞추세요 (모두의 화면에 실시간 공유)</p>
      <p>❸ 그렇게 나눈 <b>근거를 한 문장</b>으로!</p>
      <p style="font-size:2.3vh;color:var(--soft)">💡 힌트 — 우주에서 찍은 지구 사진을 떠올려 보세요. 구름과 눈·얼음이 보이나요?</p>
    </div>
    ${E.timerHTML()}`,
    { enter(){ E.setState({phase:"alloc"}); E.setTimer(480); },
      acts(){ return E.timerActs(480); } });

  /* 5 미션① 현황 + 실제값 공개 */
  E.slide(() => {
    if(!allocPres){
      const best = E.state.allocReveal ? closestTeam() : 0;
      return `
      <div class="kicker">모둠 미션 ① — 실시간 현황</div>
      <h2 class="mid" style="margin-bottom:.5vh">모둠별 에너지 배분 ${E.state.allocReveal ? `<span style="font-size:2.4vh;color:var(--gold-d)">— 실제값: 반사 및 산란 30 · 대기의 흡수 23 · 지표면 흡수 47</span>` : `<span style="font-size:2.2vh;color:var(--soft)">— 모둠을 누르면 크게 보여요</span>`}</h2>
      <div class="bgrid">${[1,2,3,4,5].map(t => {
        const o = allocOf(t);
        return `
        <div class="bcard click ${E.state.allocReveal && best===t ? "hl" : ""}" data-t="${t}">
          <h4>${t}모둠 ${o.leaderName ? `<span class="meta">👑 ${o.leaderName}</span>` : ""}<span class="sp"></span>${E.state.allocReveal && best===t ? '<span class="donebdg">🏆 실제값 최근접</span>' : ""}</h4>
          ${o.has ? `
          <div class="abar">
            <div style="width:${o.r}%;background:#e0a92e">${o.r>=12?o.r:""}</div>
            <div style="width:${o.a}%;background:#9b7dd9">${o.a>=12?o.a:""}</div>
            <div style="width:${o.s}%;background:#f0845c">${o.s>=12?o.s:""}</div>
          </div>
          <div class="anum">☀️반사 <b>${o.r}</b> · 🌫️대기 <b>${o.a}</b> · 🌍지표 <b>${o.s}</b> — 합 <span class="asum ${o.sum===100?"ok":"no"}">${o.sum}</span></div>` : `
          <div class="btext"><span class="dim2">아직 제출 전…</span></div>`}
          <div class="btext" style="font-size:1.9vh">${o.rule ? "💬 " + o.rule : '<span class="dim2">근거 입력 중…</span>'}</div>
        </div>`;}).join("")}
        <div class="bcard note">${E.state.allocReveal
          ? `📖 <b>실제값(완자 120쪽)</b><br><div class="abar" style="margin-top:.8vh"><div style="width:30%;background:#e0a92e">30</div><div style="width:23%;background:#9b7dd9">23</div><div style="width:47%;background:#f0845c">47</div></div>☀️반사 및 산란 <b>30</b> · 🌫️대기의 흡수 <b>23</b> · 🌍지표면 흡수 <b>47</b>`
          : `🎯 다 제출되면 <b>실제값 공개</b> 버튼을 누르세요.<br><br>어느 모둠이 실제 지구에 가장 가까울까요?`}</div>
      </div>`;
    }
    const o = allocOf(allocPres);
    return `
    <div class="kicker">모둠 미션 ① — 피드백</div>
    <h2 class="mid" style="margin-bottom:1vh">${allocPres}모둠의 에너지 배분 ${o.leaderName ? `<span style="font-size:2.6vh;color:var(--gold-d)">👑 팀장 ${o.leaderName}</span>` : ""}</h2>
    <div style="flex:1;display:flex;flex-direction:column;gap:2.5vh;justify-content:center;max-width:100%">
      <div style="display:flex;gap:1.5vw">
        ${[["☀️ 반사 및 산란","r","#c8920a"],["🌫️ 대기의 흡수","a","#7a4fc9"],["🌍 지표면 흡수","s","#d1532c"]].map(([lb,k,c]) => `
        <div style="flex:1;text-align:center;background:var(--lt);border:.35vh solid var(--line);border-radius:1.6vh;padding:2.5vh 1vh">
          <div style="font-size:2.2vh;font-weight:700;color:var(--soft)">${lb}</div>
          <div style="font-size:7vh;font-weight:900;color:${o.has?c:"#a8b2c0"}">${o.has?o[k]:"?"}</div>
          ${E.state.allocReveal ? `<div style="font-size:2vh;font-weight:900;color:var(--soft)">실제 ${k==="r"?REAL.ref:k==="a"?REAL.atm:REAL.srf}</div>` : ""}
        </div>`).join(`<div style="align-self:center;font-size:4.5vh;font-weight:900;color:var(--gold-d)">+</div>`)}
        <div style="align-self:center;font-size:4.5vh;font-weight:900;color:var(--gold-d)">=</div>
        <div style="flex:.7;text-align:center;background:${o.sum===100?"#f0faf3":"#fde8e8"};border:.35vh solid ${o.sum===100?"var(--green)":"var(--red)"};border-radius:1.6vh;padding:2.5vh 1vh">
          <div style="font-size:2.2vh;font-weight:700;color:var(--soft)">합계</div>
          <div style="font-size:7vh;font-weight:900;color:${o.sum===100?"var(--green)":"var(--red)"}">${o.has?o.sum:"?"}</div>
        </div>
      </div>
      <div class="bans" style="font-size:3.2vh;padding:2.5vh 3vh"><b style="font-size:2.2vh">💬 우리 모둠의 근거</b>${o.rule || "<span class='dim2'>아직 입력 전…</span>"}</div>
      <div style="font-size:2.2vh;color:var(--soft);font-weight:700">📡 실시간 연동 — 피드백 받고 고치면 바로 반영 &nbsp;·&nbsp; 확인 포인트: <b style="color:var(--navy)">합계가 100인가</b>, <b style="color:var(--navy)">'반사는 데우지 못한다'를 생각했는가</b></div>
    </div>`;
  },
  { enter(){ E.setState({phase:"alloc"}); },
    after(){
      document.querySelectorAll(".bcard.click[data-t]").forEach(el => el.onclick = () => { allocPres = +el.dataset.t; E.render(); });
    },
    acts(){
      const reveal = ["📖 실제값 공개", "green", () => E.setState({allocReveal:true, predictReveal:true}), !!E.state.allocReveal];
      if(!allocPres) return [reveal];
      return [
        ["◀ 전체 보기", "ghost", () => { allocPres = 0; E.render(); }],
        reveal,
        ...[1,2,3,4,5].map(t => [`${t}모둠`, allocPres===t ? "gold" : "navy", () => { allocPres = t; E.render(); }])
      ];
    } });

  /* 6 완자 열수지 완성 */
  E.slide(() => `
    <div class="kicker">개념 완성 — 지구 열수지 (완자 120쪽 · 시험 출제 자료)</div>
    <h2 class="mid">흡수한 70은 어디로 갈까? <span style="font-size:2.4vh;color:var(--soft)">(Space를 눌러 단계 진행 ${hbStep}/6)</span></h2>
    <div class="svgwrap">${svgHB(hbStep)}</div>`,
    { enter(){ hbStep = 0; E.setState({phase:"alloc"}); },
      space(){ if(hbStep < 6){ hbStep++; E.render(); return true; } return false; },
      acts(){ return [["다음 단계 ▶ (Space)", "navy", () => { if(hbStep<6){ hbStep++; E.render(); } }]]; } });

  /* 7 미션② 안내 */
  E.slide(() => `
    <div class="kicker">모둠 미션 ② — 데이터 탐정</div>
    <h2 class="mid">평형이 흔들리면 무슨 일이? <span style="font-size:2.4vh;color:var(--soft)">— 모둠마다 다른 진짜 관측 데이터</span></h2>
    <div style="display:flex;gap:3vw;flex:1;min-height:0">
      <div class="goals" style="font-size:2.8vh;flex:1.1">
        ${[1,2,3,4,5].map(t => `<p><span class="num">${t}</span><b>${t}모둠</b> — ${DATASETS[t].name}</p>`).join("")}
      </div>
      <div style="flex:1;display:flex;flex-direction:column">
        <div class="goals" style="font-size:2.7vh">
          <p>① 이 데이터가 <b>말하는 것</b> (한 문장)</p>
          <p>② <b>근거 수치</b> (시작값 → 변화값)</p>
          <p>③ <b>복사 평형(흡수량=방출량)과의 연결</b></p>
          <p style="font-size:2.2vh;color:var(--soft);margin-top:1vh">잠시 후 모둠별로 <b>발표</b>합니다 — 다섯 조각을 모으면 열수지의 전체 그림 완성!</p>
        </div>
        ${E.timerHTML()}
      </div>
    </div>`,
    { enter(){ E.setState({phase:"data"}); E.setTimer(600); },
      acts(){ return E.timerActs(600); } });

  /* 8 데이터 모둠 보드 + 발표 */
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
        <div class="bans"><b>③ 복사 평형과의 연결</b>${b.link || "<span class='dim2'>아직 입력 전…</span>"}</div>
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

  /* 9 상호 투표 */
  E.slide(() => {
    const sents = E.state.sentences || {};
    const votes = {1:0,2:0,3:0,4:0,5:0};
    E.students.forEach(s => { if(s.vote) votes[s.vote] = (votes[s.vote]||0)+1; });
    const mxV = Math.max(...Object.values(votes));
    const voted = E.students.filter(s => s.vote).length;
    return `
    <div class="kicker">상호 평가 — 열수지 해석</div>
    <h2 class="mid">가장 설득력 있는 해석은? <span style="font-size:2.4vh;color:var(--soft)">투표 ${voted}/${E.students.length}명</span></h2>
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
    <div style="flex-shrink:0; font-size:2.2vh; font-weight:700; color:var(--soft)">투표 기준 — <b>수치 근거</b>가 정확한가, <b>복사 평형(흡수·방출)과의 연결</b>이 논리적인가!</div>`;
  },
  { enter(){ E.setState({phase:"vote", sentences:E.collectSentences(DATASETS)}); },
    acts(){ return [
      ["문장 다시 불러오기", "ghost", () => E.setState({sentences:E.collectSentences(DATASETS)})],
      ["베스트 공개", "green", () => E.setState({voteDone:true})],
    ]; } });

  /* 10 정리 — 가계부 결산 (완자 열수지 그림 + 수지표) */
  E.slide(() => `
    <div class="kicker">정리 — 지구 열수지 (완자 120쪽 그대로, 시험에 나옵니다)</div>
    <h2 class="mid" style="margin-bottom:1vh">흡수량 = 방출량, 그래서 지구의 체온은 일정하다</h2>
    <div style="flex:1;display:flex;gap:2vw;min-height:0;align-items:center">
      <div class="svgwrap" style="flex:1.5;min-width:0">${svgHB(5)}</div>
      <div style="flex:1;display:flex;flex-direction:column;gap:1.4vh;min-width:0">
        <div class="ledger" style="flex-direction:column;gap:1.2vh;margin-top:0">
          <div><b>📒 대기의 가계부</b>흡수 23+104+24+5 = <b style="display:inline;font-size:inherit">156</b> &nbsp;=&nbsp; 방출 58+98 = <b style="display:inline;font-size:inherit">156</b></div>
          <div><b>📒 지표면의 가계부</b>흡수 47+98 = <b style="display:inline;font-size:inherit">145</b> &nbsp;=&nbsp; 방출 116+24+5 = <b style="display:inline;font-size:inherit">145</b></div>
          <div><b>📒 지구 전체의 가계부</b>흡수 100−30 = <b style="display:inline;font-size:inherit">70</b> &nbsp;=&nbsp; 방출 12+58 = <b style="display:inline;font-size:inherit">70</b></div>
        </div>
        <div style="font-size:2.1vh;font-weight:700;color:var(--soft);line-height:1.8;background:var(--lt);border-radius:1vh;padding:1.4vh 1.8vh">
          🎯 <b style="color:var(--navy)">시험 포인트</b><br>① 복사 평형이면 <b style="color:var(--navy)">각 영역에서 흡수량=방출량</b> 등식을 세울 수 있다<br>② 지구의 반사율은 <b style="color:var(--navy)">30 %</b>(23+7 — "23 %" 함정 주의!)<br>③ 대기는 태양 복사(23)보다 <b style="color:var(--navy)">지표면 방출(104)을 더 많이</b> 흡수한다</div>
      </div>
    </div>`);

  /* 11 전체 공유 — 위도별로 보면? */
  E.slide(() => `
    <div class="kicker">한 걸음 더 — 위도별로 보면?</div>
    <h2 class="mid">지구 전체는 70 = 70 평형. 그런데 위도별로 보면? <span style="font-size:2.4vh;color:var(--soft)">(Space ${latStep}/2)</span></h2>
    <div class="svgwrap">${svgLat(latStep)}</div>`,
    { enter(){ latStep = 0; },
      space(){ if(latStep < 2){ latStep++; E.render(); return true; } return false; },
      acts(){ return [["다음 단계 ▶ (Space)", "navy", () => { if(latStep<2){ latStep++; E.render(); } }]]; } });

  /* 12 나의 생각 한 문장 */
  E.slide(() => {
    const ops = E.students.filter(s => s.opinion).sort((a,b)=>(a.opinionTs||0)-(b.opinionTs||0));
    const list = opFull ? ops : ops.slice(-10);
    return `
    <div class="kicker">정리 — 나의 생각${opFull ? ` · 전체 목록 (${E.clsShort()})` : ""}</div>
    <h2 class="mid">나의 생각 한 문장 <span style="font-size:2.4vh;color:var(--soft)">제출 ${ops.length}/${E.students.length}명</span></h2>
    ${opFull ? "" : `<div style="font-size:2.5vh;font-weight:700;color:var(--soft)">💻 각자 노트북에 — <b style="color:var(--navy)">"적도는 에너지가 남고 극은 모자란데, 왜 적도는 계속 뜨거워지지 않고 극은 계속 차가워지지 않을까?"</b> 오늘 배운 열수지로 나의 생각을 1~2문장으로.</div>`}
    <div class="opfeed" style="${opFull ? "overflow-y:auto" : ""}">${list.map(s => `<div class="opline"><b>${s.team}모둠 ${s.name}</b>${s.opinion}</div>`).join("")}</div>`;
  },
  { enter(){ E.setState({phase:"end"}); opFull = false; },
    acts(){ return [[opFull ? "최근 10개만 보기" : "전체 목록 보기", opFull ? "ghost" : "gold", () => { opFull = !opFull; E.render(); }]]; } });

  /* 13 마무리 — 다음 시간 예고 */
  E.slide(() => {
    const ops = E.students.filter(s => s.opinion);
    return `
    <div class="kicker">다음 시간 예고</div>
    <h2 class="mid">남는 에너지는, 배달됩니다</h2>
    <div class="rule"></div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center">
      <div style="border:.5vh solid var(--navy); border-radius:2vh; padding:4vh 5vh; max-width:120vh">
        <div style="font-size:2.2vh;font-weight:900;color:var(--gold-d);letter-spacing:.14em;margin-bottom:1.5vh">지구 환경 변화 2/3</div>
        <div style="font-size:3.6vh;font-weight:900;color:var(--navy2);line-height:1.45">『에너지 배달부 —<br>대기 대순환과 해수의 표층 순환』</div>
        <div class="goals" style="font-size:2.5vh;margin-top:2vh">
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">1</span>오늘 질문의 답 — 저위도의 <b>남는 에너지</b>는 어떻게 고위도로 옮겨질까?</p>
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">2</span>바람과 해류가 만드는 <b>지구의 에너지 배달 노선도</b>를 그려 봅니다</p>
        </div>
        <div style="font-size:2.2vh;font-weight:700;color:var(--soft);margin-top:2vh">📚 복습 — 오늘의 <b style="color:var(--navy)">지구 열수지 그림(완자 120쪽)</b>은 시험 범위 핵심! 수지 등식(흡수량=방출량)을 꼭 연습하세요.</div>
      </div>
    </div>
    <div style="font-size:2.4vh;font-weight:700;color:var(--soft)">나의 생각 제출 ${ops.length}/${E.students.length}명 — 아직 제출 전인 사람은 지금 제출하세요! 수고했습니다 🌍</div>`;
  },
  { enter(){ E.setState({phase:"end"}); } });
}
