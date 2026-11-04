/* 지구 배달 주식회사 — 대기 대순환과 해수의 표층 순환 (교사 콘솔 수업 모듈)
   학생 앱: circ/index.html — 데이터 저장은 pw_openclass_circ(_c<반>) */
export default function build(E){
  const P = E.presenter;
  const AR = E.fatArrow;

  /* ── 공용 그림 도우미 ── */
  const esc = s => String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const TRI = (x,y,dx,dy,s,fill) => {   // (x,y)에 (dx,dy) 진행 방향 화살촉
    const L=Math.hypot(dx,dy)||1, ux=dx/L, uy=dy/L, px=-uy, py=ux;
    return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(x-ux*s*1.9+px*s).toFixed(1)},${(y-uy*s*1.9+py*s).toFixed(1)} ${(x-ux*s*1.9-px*s).toFixed(1)},${(y-uy*s*1.9-py*s).toFixed(1)}" fill="${fill}"/>`;
  };
  const VT = (x,y,s,fill="#6b5a3e") => `<text x="${x}" y="${y}" text-anchor="middle" font-size="14" font-weight="900" fill="${fill}">${[...s].map((ch,i)=>`<tspan x="${x}" dy="${i?16:0}">${ch}</tspan>`).join("")}</text>`;

  /* ── 단서 카드 6장 (학생 앱과 동일 — 그림·질문·정답·해설) ── */
  function svgC1(){
    return `<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="340" fill="#fff"/>
      <circle cx="200" cy="178" r="128" fill="#eef3fa" stroke="#b9c4d4" stroke-width="3"/>
      <path d="M 330,178 A 130,130 0 0 0 200,48" fill="none" stroke="#1f6fd6" stroke-width="6"/>
      ${TRI(200,48,-1,0,12,"#1f6fd6")}
      <path d="M 70,178 A 130,130 0 0 0 200,308" fill="none" stroke="#1f6fd6" stroke-width="6"/>
      ${TRI(200,308,1,0,12,"#1f6fd6")}
      <text x="322" y="300" font-size="14" font-weight="900" fill="#1f6fd6">자전 방향</text>
      <circle cx="200" cy="178" r="8" fill="#092f66"/>
      <text x="200" y="76" text-anchor="middle" font-size="22">🎯</text>
      <line x1="200" y1="168" x2="200" y2="86" stroke="#3d4652" stroke-width="3" stroke-dasharray="6 5"/>
      <text x="138" y="130" text-anchor="end" font-size="13" font-weight="700" fill="#3d4652">겨눈 방향</text>
      <path d="M 200,170 Q 238,128 268,96" fill="none" stroke="#d64545" stroke-width="5"/>
      ${TRI(268,96,0.7,-0.7,11,"#d64545")}
      <text x="284" y="92" font-size="22" font-weight="900" fill="#d64545">?</text>
      <text x="430" y="86" font-size="20" font-weight="900" fill="#092f66">빙글빙글 도는 원판(지구) 위에서</text>
      <text x="430" y="116" font-size="20" font-weight="900" fill="#092f66">정면의 과녁을 향해 공을 던졌다!</text>
      <text x="430" y="158" font-size="15" font-weight="700" fill="#3d4652">· 지구는 하루에 한 바퀴, 쉬지 않고 자전 중</text>
      <text x="430" y="184" font-size="15" font-weight="700" fill="#3d4652">· 바람도 바닷물도 '도는 지구 위에서' 움직인다</text>
      <text x="430" y="228" font-size="17" font-weight="900" fill="#c8920a">공은 과연 어디로 갈까?</text>
    </svg>`;
  }
  function svgC2(){
    return `<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="340" fill="#fff"/>
      <text x="410" y="40" text-anchor="middle" font-size="15" font-weight="700" fill="#3d4652">태평양 왕복 — 실제 운항 시간표 기준</text>
      <rect x="40" y="56" width="740" height="236" rx="14" fill="#eaf3fb"/>
      <circle cx="150" cy="175" r="9" fill="#0B3E86"/>
      <text x="150" y="212" text-anchor="middle" font-size="17" font-weight="900" fill="#092f66">인천</text>
      <circle cx="670" cy="175" r="9" fill="#0B3E86"/>
      <text x="670" y="212" text-anchor="middle" font-size="17" font-weight="900" fill="#092f66">로스앤젤레스(LA)</text>
      <path d="M 150,160 Q 410,70 670,160" fill="none" stroke="#1A9A3E" stroke-width="5"/>
      ${TRI(670,160,1,0.35,12,"#1A9A3E")}
      <text x="410" y="86" text-anchor="middle" font-size="18" font-weight="900" fill="#136e2e">갈 때 · 인천 → LA — 약 10시간 30분 ✈️</text>
      <path d="M 670,195 Q 410,288 150,195" fill="none" stroke="#d64545" stroke-width="5"/>
      ${TRI(150,195,-1,-0.37,12,"#d64545")}
      <text x="410" y="282" text-anchor="middle" font-size="18" font-weight="900" fill="#b02d55">올 때 · LA → 인천 — 약 13시간 ✈️</text>
      <text x="410" y="180" text-anchor="middle" font-size="17" font-weight="900" fill="#c8920a">거의 같은 길인데, 왜 2시간 30분이나 차이 날까?</text>
    </svg>`;
  }
  function svgC3(){
    return `<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="340" fill="#fff"/>
      <rect x="40" y="50" width="740" height="250" fill="#d4e7f7" rx="12"/>
      <path d="M 40,50 L 150,50 L 128,110 L 150,170 L 120,240 L 140,300 L 40,300 Z" fill="#cdbf9f"/>
      <text x="86" y="182" text-anchor="middle" font-size="15" font-weight="900" fill="#6b5a3e">아메리카</text>
      <path d="M 780,50 L 672,50 L 700,120 L 668,190 L 696,300 L 780,300 Z" fill="#cdbf9f"/>
      <text x="736" y="108" text-anchor="middle" font-size="15" font-weight="900" fill="#6b5a3e">유럽</text>
      <text x="734" y="244" text-anchor="middle" font-size="15" font-weight="900" fill="#6b5a3e">아프리카</text>
      ${AR(640,245, 185,245, 13, "#F5B301", "#c8920a")}
      <text x="412" y="222" text-anchor="middle" font-size="17" font-weight="900" fill="#8a6a2a">⛵ 갈 때 — 저위도 항로 (동 → 서)</text>
      ${AR(190,110, 640,110, 13, "#1f6fd6", "#0B3E86")}
      <text x="412" y="88" text-anchor="middle" font-size="17" font-weight="900" fill="#0B3E86">⛵ 올 때 — 고위도 항로 (서 → 동)</text>
      <text x="412" y="286" text-anchor="middle" font-size="14" font-weight="700" fill="#3d4652">대항해시대의 범선 — 엔진 없이 바람이 전부!</text>
      <text x="412" y="326" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">콜럼버스는 왜 갈 때와 올 때 길을 바꿨을까?</text>
    </svg>`;
  }
  function svgC4(){
    const lat = d => 170 - d*1.4;
    return `<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="340" fill="#fff"/>
      <rect x="60" y="${lat(90)}" width="700" height="${lat(-90)-lat(90)}" fill="#eaf3fb" rx="10"/>
      <rect x="60" y="${lat(35)}" width="700" height="${lat(25)-lat(35)}" fill="#F5B301" opacity=".28"/>
      <rect x="60" y="${lat(-25)}" width="700" height="${lat(-35)-lat(-25)}" fill="#F5B301" opacity=".28"/>
      <line x1="60" y1="${lat(0)}" x2="760" y2="${lat(0)}" stroke="#d64545" stroke-width="2" stroke-dasharray="7 5"/>
      <text x="52" y="${lat(0)+5}" text-anchor="end" font-size="13" font-weight="700" fill="#d64545">적도 0°</text>
      <line x1="60" y1="${lat(30)}" x2="760" y2="${lat(30)}" stroke="#b9c4d4" stroke-width="1.5"/>
      <text x="52" y="${lat(30)+5}" text-anchor="end" font-size="13" font-weight="700" fill="#3d4652">30°N</text>
      <line x1="60" y1="${lat(-30)}" x2="760" y2="${lat(-30)}" stroke="#b9c4d4" stroke-width="1.5"/>
      <text x="52" y="${lat(-30)+5}" text-anchor="end" font-size="13" font-weight="700" fill="#3d4652">30°S</text>
      <ellipse cx="400" cy="${lat(23)}" rx="52" ry="14" fill="#d8b24a"/>
      <text x="400" y="${lat(23)-20}" text-anchor="middle" font-size="14" font-weight="900" fill="#8a6a2a">사하라</text>
      <ellipse cx="496" cy="${lat(27)}" rx="24" ry="10" fill="#d8b24a"/>
      <text x="526" y="${lat(27)-10}" font-size="13" font-weight="700" fill="#8a6a2a">아라비아</text>
      <ellipse cx="170" cy="${lat(31)}" rx="22" ry="9" fill="#d8b24a"/>
      <text x="170" y="${lat(31)-14}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#8a6a2a">북미 남서부</text>
      <ellipse cx="640" cy="${lat(-27)}" rx="34" ry="12" fill="#d8b24a"/>
      <text x="640" y="${lat(-27)+32}" text-anchor="middle" font-size="14" font-weight="900" fill="#8a6a2a">오스트레일리아</text>
      <ellipse cx="238" cy="${lat(-25)}" rx="12" ry="11" fill="#d8b24a"/>
      <text x="238" y="${lat(-25)+30}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#8a6a2a">아타카마</text>
      <ellipse cx="438" cy="${lat(-28)}" rx="16" ry="9" fill="#d8b24a"/>
      <text x="438" y="${lat(-28)+28}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#8a6a2a">칼라하리</text>
      <text x="410" y="326" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">세계의 큰 사막들 — 주소가 묘하게 비슷하다?</text>
    </svg>`;
  }
  function svgC5(){
    return `<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="340" fill="#fff"/>
      <text x="410" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="#3d4652">북태평양 표층 수온 지도 (단순화)</text>
      <rect x="120" y="50" width="580" height="250" fill="#d4e7f7"/>
      <rect x="66" y="50" width="54" height="250" fill="#cdbf9f"/>
      <rect x="700" y="50" width="54" height="250" fill="#cdbf9f"/>
      ${VT(93,140,"아시아")}
      ${VT(727,110,"북아메리카")}
      <text x="134" y="72" font-size="13" font-weight="700" fill="#3d4652">↑ 고위도</text>
      <text x="560" y="292" font-size="13" font-weight="700" fill="#3d4652">↓ 저위도(적도 쪽)</text>
      <path d="M 120,86 C 300,108 500,134 700,172" fill="none" stroke="#1f6fd6" stroke-width="4.5"/>
      <text x="150" y="80" font-size="15" font-weight="900" fill="#1f6fd6">15℃</text>
      <path d="M 120,150 C 300,172 500,196 700,232" fill="none" stroke="#e09b00" stroke-width="4.5"/>
      <text x="150" y="144" font-size="15" font-weight="900" fill="#e09b00">20℃</text>
      <path d="M 120,214 C 300,232 500,252 700,280" fill="none" stroke="#d64545" stroke-width="4.5"/>
      <text x="150" y="208" font-size="15" font-weight="900" fill="#d64545">25℃</text>
      <text x="238" y="118" font-size="14" font-weight="900" fill="#b02d55">서쪽 — 고위도 쪽으로 휨</text>
      <text x="470" y="258" font-size="14" font-weight="900" fill="#0B3E86">동쪽 — 저위도 쪽으로 휨</text>
      <text x="410" y="328" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">같은 수온을 이은 선(등수온선)이 좌우로 비스듬하다 — 왜?</text>
    </svg>`;
  }
  function svgC6(){
    return `<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="340" fill="#fff"/>
      <line x1="60" y1="92" x2="760" y2="92" stroke="#3d4652" stroke-width="2" stroke-dasharray="7 5"/>
      <text x="410" y="78" text-anchor="middle" font-size="15" font-weight="900" fill="#3d4652">북위 51° — 두 도시는 거의 같은 위도!</text>
      <line x1="120" y1="230" x2="700" y2="230" stroke="#b9c4d4" stroke-width="2"/>
      <text x="112" y="235" text-anchor="end" font-size="13" font-weight="700" fill="#3d4652">0℃</text>
      <rect x="205" y="230" width="76" height="60" rx="6" fill="#1f6fd6"/>
      <text x="243" y="315" text-anchor="middle" font-size="22" font-weight="900" fill="#1f6fd6">−15℃</text>
      <text x="243" y="128" text-anchor="middle" font-size="17" font-weight="900" fill="#092f66">🍁 캐나다 동부 해안</text>
      <text x="243" y="150" text-anchor="middle" font-size="13" font-weight="700" fill="#3d4652">1월 평균기온</text>
      <rect x="539" y="210" width="76" height="20" rx="6" fill="#d64545"/>
      <text x="577" y="198" text-anchor="middle" font-size="22" font-weight="900" fill="#d64545">+5℃</text>
      <text x="577" y="128" text-anchor="middle" font-size="17" font-weight="900" fill="#092f66">🏙️ 런던</text>
      <text x="577" y="150" text-anchor="middle" font-size="13" font-weight="700" fill="#3d4652">1월 평균기온</text>
      <text x="410" y="262" text-anchor="middle" font-size="14" font-weight="700" fill="#3d4652">두 도시 사이에는 대서양</text>
      <text x="410" y="332" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">같은 위도인데 20℃ 차이 — 런던의 보온 비결은?</text>
    </svg>`;
  }
  const CARDS = [
    { emoji:"🌀", title:"돌고 있는 지구",
      q:"북반구에서, 정면의 과녁을 향해 던진 공(움직이는 공기·물도 똑같다)은 어떻게 될까?",
      opts:["겨눈 대로 똑바로 날아간다","진행 방향의 오른쪽으로 휜다","진행 방향의 왼쪽으로 휜다"], ans:1,
      exp:"지구는 하루에 한 바퀴 자전 중 — 그 효과로 북반구에서 움직이는 모든 것(바람·바닷물 포함)은 진행 방향의 오른쪽으로 휘어 보입니다.",
      svg:svgC1 },
    { emoji:"✈️", title:"수상한 비행시간",
      q:"거의 같은 길을 왕복하는데, 인천→LA는 약 10시간 30분 · LA→인천은 약 13시간. 이유로 가장 그럴듯한 것은?",
      opts:["지구가 둥글어서 돌아올 때 거리가 더 멀다","하늘 높은 곳에 서쪽→동쪽으로 부는 강한 바람이 있다","돌아올 때는 연료를 가득 실어 비행기가 무겁다"], ans:1,
      exp:"중위도 상공에는 서→동으로 부는 강한 바람이 늘 붑니다. 갈 때(동쪽행)는 뒤에서 밀어주는 순풍, 올 때는 맞바람!",
      svg:svgC2 },
    { emoji:"⛵", title:"콜럼버스의 지혜",
      q:"대항해시대 범선 선원들이 갈 때는 저위도, 올 때는 고위도 항로를 고집한 까닭은?",
      opts:["위도대마다 '늘 부는 바람'의 방향이 서로 다르기 때문","저위도 바다가 더 잔잔해서 가기 편했기 때문","고위도 항로에서 보급품을 구하기 쉬웠기 때문"], ans:0,
      exp:"저위도에서는 동→서로, 중위도에서는 서→동으로 부는 바람이 1년 내내 꾸준히 붑니다. 돛단배는 '바람의 지도'를 알아야 바다를 건넜습니다.",
      svg:svgC3 },
    { emoji:"🏜️", title:"사막의 주소",
      q:"사하라·아라비아·오스트레일리아… 세계의 큰 사막이 몰려 있는 곳은?",
      opts:["적도(위도 0°) 부근","위도 30° 부근","위도 60° 부근"], ans:1,
      exp:"큰 사막들의 주소는 위도 30° 부근 — 이 위도에서 비가 잘 내리지 않는 특별한 일이 일어나고 있다는 단서입니다.",
      svg:svgC4 },
    { emoji:"🌡️", title:"휘어진 등수온선",
      q:"등수온선이 대양의 서쪽에서는 고위도 쪽으로, 동쪽에서는 저위도 쪽으로 휘어 있다. 이것이 말해 주는 것은?",
      opts:["서쪽 바다가 동쪽 바다보다 더 깊다","따뜻한 물과 찬 물이 남북으로 이동하고 있다","인공위성의 측정 오류일 뿐이다"], ans:1,
      exp:"대양 서쪽에서는 따뜻한 물이 고위도로 올라가고, 동쪽에서는 찬 물이 저위도로 내려오는 중 — 바닷물이 열을 싣고 움직인다는 증거!",
      svg:svgC5 },
    { emoji:"🏙️", title:"런던의 비밀",
      q:"런던(1월 약 +5℃)이 비슷한 위도의 캐나다 동부 해안(약 −15℃)보다 훨씬 따뜻한 이유는?",
      opts:["런던은 대도시라 건물의 열기 때문에","따뜻한 바닷물이 유럽 앞바다로 흘러들기 때문에","런던이 사실은 훨씬 남쪽에 있기 때문에"], ans:1,
      exp:"저위도에서 데워진 바닷물이 대서양을 건너 유럽 앞바다까지 흘러갑니다. 바닷물은 거대한 '보온 배달부'!",
      svg:svgC6 },
  ];
  const evidName = n => (n>=1 && n<=6) ? `단서 ${n} — ${CARDS[n-1].emoji} ${CARDS[n-1].title}` : "";

  /* ── 노선도 (학생 앱과 동일 로직 — 같은 그림이 나오게)
     name을 주면 회사명 대신 그 이름으로 표시(1차 블라인드 심사용 "후보 A" 등) ── */
  function routeSVG(b, name){
    b = b || {};
    const DIR = { SW:[-1,-1], NE:[1,1], E:[1,0], W:[-1,0] };   // [동서, 남북(북+)] — 바람이 흘러가는 쪽
    const WLBL = { SW:"↙ 남서쪽으로", NE:"↗ 북동쪽으로", E:"→ 동쪽으로", W:"← 서쪽으로" };
    let g = "";
    /* 왼쪽 — 지상 노선(북반구 바람 3구간) */
    const bands = [
      {k:"w3", y0:84,  name:"3구간 · 위도 60°~90°", col:"#e3edf8"},
      {k:"w2", y0:194, name:"2구간 · 위도 30°~60°", col:"#eaf4ec"},
      {k:"w1", y0:304, name:"1구간 · 위도 0°~30°",  col:"#fdf2da"},
    ];
    bands.forEach(bd => {
      g += `<rect x="36" y="${bd.y0}" width="356" height="110" fill="${bd.col}" stroke="#b9c4d4"/>
        <text x="46" y="${bd.y0+22}" font-size="14.5" font-weight="700" fill="#3d4652">${bd.name}</text>`;
      const v = b[bd.k], cx = 214, cy = bd.y0+60;
      if(v && DIR[v]){
        const [dx,dy] = DIR[v], L = (dx&&dy) ? 38 : 56;
        g += AR(cx-dx*L, cy+dy*L, cx+dx*L, cy-dy*L, 19, "#F5B301", "#c8920a")
          + `<text x="384" y="${bd.y0+103}" text-anchor="end" font-size="15" font-weight="900" fill="#0B3E86">${WLBL[v]}</text>`;
      }else{
        g += `<circle cx="${cx}" cy="${cy}" r="26" fill="#fff" stroke="#b9c4d4" stroke-width="2" stroke-dasharray="5 4"/>
          <text x="${cx}" y="${cy+8}" text-anchor="middle" font-size="24" font-weight="900" fill="#a8b2c0">?</text>`;
      }
    });
    g += `<text x="36" y="438" font-size="13" font-weight="700" fill="#3d4652">↓ 아래가 적도 쪽 (0°)</text>`;
    /* 오른쪽 — 해상 노선(북태평양) */
    g += `<rect x="420" y="84" width="370" height="330" fill="#d8eafa" stroke="#b9c4d4"/>
      <rect x="420" y="84" width="34" height="330" fill="#cdbf9f"/>
      <rect x="756" y="84" width="34" height="330" fill="#cdbf9f"/>
      ${VT(437,160,"아시아")}${VT(773,140,"북아메리카")}
      <text x="605" y="404" text-anchor="middle" font-size="13" font-weight="700" fill="#3d4652">↓ 적도 쪽</text>`;
    const gv = b.gyre, cx=605, cy=242, rx=112, ry=104;
    if(gv === "cw" || gv === "ccw"){
      const B = "#5b9bd5", BS = "#1f6fd6";
      if(gv === "cw"){
        g += AR(cx-58,cy-ry, cx+58,cy-ry, 15, B, BS) + AR(cx+rx,cy-56, cx+rx,cy+56, 15, B, BS)
           + AR(cx+58,cy+ry, cx-58,cy+ry, 15, B, BS) + AR(cx-rx,cy+56, cx-rx,cy-56, 15, B, BS);
      }else{
        g += AR(cx+58,cy-ry, cx-58,cy-ry, 15, B, BS) + AR(cx-rx,cy-56, cx-rx,cy+56, 15, B, BS)
           + AR(cx-58,cy+ry, cx+58,cy+ry, 15, B, BS) + AR(cx+rx,cy+56, cx+rx,cy-56, 15, B, BS);
      }
      g += `<text x="${cx}" y="${cy+7}" text-anchor="middle" font-size="19" font-weight="900" fill="#0B3E86">${gv==="cw"?"시계 방향 ⟳":"반시계 방향 ⟲"}</text>`;
    }else{
      g += `<circle cx="${cx}" cy="${cy}" r="30" fill="#fff" stroke="#b9c4d4" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="${cx}" y="${cy+9}" text-anchor="middle" font-size="26" font-weight="900" fill="#a8b2c0">?</text>`;
    }
    return `<svg viewBox="0 0 820 470" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="470" fill="#fff"/>
      <text x="410" y="32" text-anchor="middle" font-size="20" font-weight="900" fill="#092f66">🚚 ${esc(name) || "배달 노선도"} — 예측 노선도</text>
      <text x="410" y="54" text-anchor="middle" font-size="13" font-weight="700" fill="#c8920a">화살표 = 바람과 바닷물이 흘러가는 방향</text>
      <text x="214" y="76" text-anchor="middle" font-size="16" font-weight="900" fill="#092f66">🌬 지상 노선 — 북반구의 바람</text>
      <text x="605" y="76" text-anchor="middle" font-size="16" font-weight="900" fill="#092f66">🌊 해상 노선 — 북태평양</text>
      ${g}
      <text x="410" y="458" text-anchor="middle" font-size="13" font-weight="700" fill="#8a93a1">지구 배달 주식회사 — 예측 노선도</text>
    </svg>`;
  }

  /* ── 위도별 에너지 수지 (①차시 그래프 재등장 — heat 모듈 svgLat 재구성) ── */
  function svgLat(){
    const w=960, h=520, ml=100, mr=40, mt=86, mb=70;
    const iw=w-ml-mr, ih=h-mt-mb;
    const X=x=>ml+x/90*iw;
    const Y=y=>mt+ih-y/350*ih;
    const abs=[[0,300],[10,295],[20,280],[30,250],[38,230],[50,180],[60,130],[70,90],[80,60],[90,45]];
    const emi=[[0,250],[10,248],[20,244],[30,238],[38,230],[50,215],[60,200],[70,185],[80,175],[90,170]];
    const line = pts => pts.map(p=>`${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
    let g = "";
    [0,100,200,300].forEach(t=>{ g += `<line x1="${ml}" y1="${Y(t)}" x2="${w-mr}" y2="${Y(t)}" stroke="#e3e9f2" stroke-width="1.5"/>
      <text x="${ml-10}" y="${Y(t)+5}" text-anchor="end" font-size="16" fill="#3d4652">${t}</text>`; });
    [0,30,60,90].forEach(t=>{ g += `<text x="${X(t)}" y="${h-mb+28}" text-anchor="middle" font-size="17" fill="#3d4652">${t}°</text>`; });
    g += `<text x="${X(0)}" y="${h-mb+52}" text-anchor="middle" font-size="15" font-weight="700" fill="#c8920a">적도</text>
          <text x="${X(90)}" y="${h-mb+52}" text-anchor="middle" font-size="15" font-weight="700" fill="#1f6fd6">극</text>`;
    const band=(pts1,pts2,a,b,fill)=>{
      const f=pts1.filter(p=>p[0]>=a&&p[0]<=b), r=pts2.filter(p=>p[0]>=a&&p[0]<=b).reverse();
      return `<polygon points="${line(f)} ${line(r)}" fill="${fill}"/>`;
    };
    g += band(abs,emi,0,38,"rgba(245,179,1,.3)") + band(emi,abs,38,90,"rgba(31,111,214,.22)");
    g += `<line x1="${X(38)}" y1="${mt}" x2="${X(38)}" y2="${h-mb}" stroke="#3d4652" stroke-width="2.5" stroke-dasharray="7 5"/>
      <rect x="${X(38)-150}" y="${h-mb-40}" width="300" height="28" rx="8" fill="#fff" opacity=".9"/>
      <text x="${X(38)}" y="${h-mb-20}" text-anchor="middle" font-size="18" font-weight="900" fill="#3d4652">위도 약 38° — 에너지 이동 가장 활발</text>
      <text x="${X(16)}" y="${Y(285)}" text-anchor="middle" font-size="19" font-weight="900" fill="#c8920a">재고 누적 (과잉)</text>
      <text x="${X(16)}" y="${Y(262)}" text-anchor="middle" font-size="15" font-weight="700" fill="#8a6a2a">흡수량 &gt; 방출량</text>
      <text x="${X(68)}" y="${Y(215)}" text-anchor="middle" font-size="19" font-weight="900" fill="#1f6fd6">품절 (부족)</text>
      <text x="${X(68)}" y="${Y(192)}" text-anchor="middle" font-size="15" font-weight="700" fill="#2a5a8a">흡수량 &lt; 방출량</text>`;
    g += `<line x1="${ml}" y1="${mt-6}" x2="${ml}" y2="${h-mb}" stroke="#3d4652" stroke-width="2.5"/>
          <line x1="${ml}" y1="${h-mb}" x2="${w-mr}" y2="${h-mb}" stroke="#3d4652" stroke-width="2.5"/>
          <polyline points="${line(abs)}" fill="none" stroke="#e09b00" stroke-width="4.5" stroke-linejoin="round"/>
          <polyline points="${line(emi)}" fill="none" stroke="#d64545" stroke-width="4.5" stroke-linejoin="round"/>`;
    const lx=w-mr-310, ly=mt+6;
    g += `<line x1="${lx}" y1="${ly}" x2="${lx+36}" y2="${ly}" stroke="#e09b00" stroke-width="6"/>
      <text x="${lx+44}" y="${ly+6}" font-size="17" font-weight="700" fill="#3d4652">태양 복사 에너지 흡수량</text>
      <line x1="${lx}" y1="${ly+28}" x2="${lx+36}" y2="${ly+28}" stroke="#d64545" stroke-width="6"/>
      <text x="${lx+44}" y="${ly+34}" font-size="17" font-weight="700" fill="#3d4652">지구 복사 에너지 방출량</text>`;
    return `<svg viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="#fff"/>
      <text x="30" y="40" font-size="25" font-weight="900" fill="#092f66">위도별 에너지 수지 — ①차시에서 확인한 발주 근거</text>
      <text x="30" y="66" font-size="16" font-weight="700" fill="#3d4652">단위: W/m² · 자료: 위성 관측 기반(수업용 재구성)</text>
      <text x="30" y="${mt+ih/2}" text-anchor="middle" font-size="15" font-weight="900" fill="#0B3E86" transform="rotate(-90 30 ${mt+ih/2})">에너지양 (W/m²)</text>
      ${g}
    </svg>`;
  }

  /* ── 정리 강의① 대기 대순환 — 단계 완성 (완자 123쪽) ── */
  function svgAtm(step){
    const S=(n,h)=>step>=n?h:"";
    const mx0=332, mx1=1008;
    const lat = d => 272 - d*2.31;
    let g = "";
    const band=(d1,d2,f)=>`<rect x="${mx0}" y="${lat(d2).toFixed(1)}" width="${mx1-mx0}" height="${(lat(d1)-lat(d2)).toFixed(1)}" fill="${f}"/>`;
    g += band(60,90,"#e3edf8")+band(30,60,"#eaf4ec")+band(0,30,"#fdf2da")
       + band(-30,0,"#fdf2da")+band(-60,-30,"#eaf4ec")+band(-90,-60,"#e3edf8");
    [[90,"90°N"],[60,"60°N"],[30,"30°N"],[0,"0° 적도"],[-30,"30°S"],[-60,"60°S"],[-90,"90°S"]].forEach(([d,lb])=>{
      g += `<line x1="${mx0}" y1="${lat(d)}" x2="${mx1}" y2="${lat(d)}" stroke="${d===0?"#d64545":"#b9c4d4"}" stroke-width="${d===0?2.5:1.5}"${d===0?' stroke-dasharray="8 5"':""}/>
        <text x="${mx0+8}" y="${(lat(d)+17).toFixed(1)}" font-size="13.5" font-weight="700" fill="#3d4652">${lb}</text>`;
    });
    g += S(2, (function(){
      const xTop=118, xSurf=298, xMid=208, xRa=xTop+(xSurf-xTop)*0.32, GAP=7;
      const GOLD="#d99a1a", GOLDd="#b9780d", GRN="#2f9e52", GRNd="#1d7a3b", BLU="#2f7fd6", BLUd="#1559a8";
      let c = "";
      /* 고도축 안내선 (지표 ↔ 상공) */
      c += `<line x1="${xTop}" y1="${(lat(90)-4).toFixed(1)}" x2="${xTop}" y2="${(lat(-90)+4).toFixed(1)}" stroke="#c7d2e0" stroke-width="1.4" stroke-dasharray="3 5"/>
        <line x1="${xSurf}" y1="${(lat(90)-4).toFixed(1)}" x2="${xSurf}" y2="${(lat(-90)+4).toFixed(1)}" stroke="#c7d2e0" stroke-width="1.4" stroke-dasharray="3 5"/>`;
      /* 연직 순환 셀: (xSurf)=지표, (xTop)=상공. riseAtPole=극쪽 경계에서 상승 */
      const cell=(dE,dP,riseAtPole,col,colD,full,name,type,wind)=>{
        const yE=lat(dE), yP=lat(dP), cY=(yE+yP)/2;
        const yRise=riseAtPole?yP:yE, ySink=riseAtPole?yE:yP;
        const ins=v=> v + (cY>v?GAP:-GAP);
        const yR=ins(yRise), yS=ins(ySink), sdir=Math.sign(yR-yS);
        let s=`<path d="M${xSurf} ${yR.toFixed(1)} L${xTop} ${yR.toFixed(1)} L${xTop} ${yS.toFixed(1)} L${xSurf} ${yS.toFixed(1)} Z" fill="none" stroke="${col}" stroke-width="4" stroke-linejoin="round"/>`;
        s+=`<line x1="${xSurf}" y1="${yS.toFixed(1)}" x2="${xSurf}" y2="${yR.toFixed(1)}" stroke="${colD}" stroke-width="6.5" stroke-linecap="round"/>`;
        s+=TRI(xRa,yR,-1,0,8.5,colD)+TRI(xTop,(yR+yS)/2,0,Math.sign(yS-yR),8.5,colD)+TRI(xRa,yS,1,0,8.5,colD);
        s+=TRI(xSurf,yS+(yR-yS)*0.34,0,sdir,11,colD)+TRI(xSurf,yS+(yR-yS)*0.70,0,sdir,11,colD);
        if(full){
          s+=`<text x="${xMid}" y="${(cY-14).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="900" fill="${colD}">${name}</text>
            <text x="${xMid}" y="${(cY+1).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3d4652">${type}</text>
            <text x="${xMid}" y="${(cY+16).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="900" fill="${colD}">지표풍 → ${wind}</text>`;
        } else {
          s+=`<text x="${xMid}" y="${(cY+5).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="800" fill="${colD}" opacity=".7">${name}</text>`;
        }
        return full ? s : `<g opacity=".5">${s}</g>`;
      };
      c += cell(0,30,false,GOLD,GOLDd,true,"해들리 순환","직접 순환 (0°~30°)","무역풍")
         + cell(30,60,true,GRN,GRNd,true,"페렐 순환","간접 순환 (30°~60°)","편서풍")
         + cell(60,90,false,BLU,BLUd,true,"극 순환","직접 순환 (60°~극)","극동풍")
         + cell(0,-30,false,GOLD,GOLDd,false,"해들리 순환(S)")
         + cell(-30,-60,true,GRN,GRNd,false,"페렐 순환(S)")
         + cell(-60,-90,false,BLU,BLUd,false,"극 순환(S)");
      /* 상승역·하강역 콜백 (완자 C4 '위도 30° = 사막' 회수) */
      const cal=(d,l1,l2,up,yo=0)=>{ const y=lat(d)+yo, cc=up?"#c0392b":"#1559a8";
        let t=`<text x="112" y="${(y-2).toFixed(1)}" text-anchor="end" font-size="12" font-weight="900" fill="${cc}">${l1}</text>`;
        if(l2) t+=`<text x="112" y="${(y+13).toFixed(1)}" text-anchor="end" font-size="10.5" font-weight="700" fill="#5a6572">${l2}</text>`;
        return t; };
      c += cal(0,"▲ 적도 상승","상승 → 다우(비↑)",true)
         + cal(30,"▼ 아열대고압대","하강 → 건조(사막)",false)
         + cal(60,"▲ 한대전선대","상승 (저압대)",true)
         + cal(90,"▼ 극 하강","(극고압대)",false,16);
      /* 고도축 라벨 + 요약 */
      c += `<text x="${xTop}" y="486" text-anchor="middle" font-size="11.5" font-weight="900" fill="#6a7686">상공(고층)</text>
        <text x="${xSurf}" y="486" text-anchor="middle" font-size="11.5" font-weight="900" fill="#6a7686">지표면</text>
        <text x="${xMid}" y="506" text-anchor="middle" font-size="12.5" font-weight="800" fill="#3d4652">순환 원동력 = 에너지 불균형 + 지구 자전</text>`;
      /* 바람 이름 ↔ 화살표 방향 대조 (학생 최다 오개념 교정) */
      c += `<rect x="392" y="483" width="612" height="31" rx="8" fill="#fff7e6" stroke="#e0b24d" stroke-width="1.5"/>
        <text x="698" y="496" text-anchor="middle" font-size="12.5" font-weight="900" fill="#8a5a00">바람 이름 = 불어오는 방향 · 배달 화살표 = 흘러가는 방향 → 서로 반대!</text>
        <text x="698" y="510" text-anchor="middle" font-size="11" font-weight="700" fill="#6a4a10">예) 북동 무역풍 → 남서쪽으로 분다 · 편서풍(남서에서) → 북동쪽으로</text>`;
      return c;
    })());
    const wband = (dmid,dx,dy,name,sub) => {
      const cy = lat(dmid); let a = "";
      [mx0+110, mx0+250, mx0+390].forEach(x=>{ const L=(dx&&dy)?38:52;
        a += AR(x-dx*L, cy+dy*L, x+dx*L, cy-dy*L, 15, "#F5B301", "#c8920a"); });
      a += `<rect x="${mx1-218}" y="${cy-22}" width="210" height="44" rx="9" fill="#fff" opacity=".93" stroke="#b9c4d4"/>
        <text x="${mx1-113}" y="${cy-3}" text-anchor="middle" font-size="17" font-weight="900" fill="#092f66">${name}</text>
        <text x="${mx1-113}" y="${cy+15}" text-anchor="middle" font-size="12" font-weight="700" fill="#3d4652">${sub}</text>`;
      return a;
    };
    g += S(3, wband(15,-1,-1,"무역풍","적도 ~ 위도 30° (북동 무역풍)"));
    g += S(4, wband(45,1,1,"편서풍","위도 30° ~ 60°"));
    g += S(5, wband(75,-1,-1,"극동풍","위도 60° ~ 극"));
    g += S(6, wband(-15,-1,1,"무역풍","적도 ~ 위도 30° (남동 무역풍)")
            + wband(-45,1,-1,"편서풍","위도 30° ~ 60°")
            + wband(-75,-1,1,"극동풍","위도 60° ~ 극"));
    /* 1단계 라벨은 맨 마지막에 그려 바람 화살표 위에 보이게 (흰 바탕 포함)
       — 최종 단계(6)에서 오른쪽 풍계 정보 박스(x≥mx1-218)와 겹치지 않도록 중심을 왼쪽으로 이동 */
    const tagCx = (mx0+mx1)/2 - 110;
    const tag = (y, w, txt, color) => `<rect x="${tagCx - w/2}" y="${y-19}" width="${w}" height="27" rx="8" fill="#fff" opacity=".88"/>
      <text x="${tagCx}" y="${y}" text-anchor="middle" font-size="17" font-weight="900" fill="${color}">${txt}</text>`;
    g += S(1, tag(lat(0)-12, 330, "☀ 적도 — 에너지 재고 누적 (남음)", "#d64545")
            + tag(lat(82), 230, "❄ 북극 — 품절 (부족)", "#1f6fd6")
            + tag(lat(-86), 230, "❄ 남극 — 품절 (부족)", "#1f6fd6"));
    return `<svg viewBox="0 0 1040 520">
      <rect width="1040" height="520" fill="#fff"/>
      <text x="24" y="34" font-size="23" font-weight="900" fill="#092f66">대기 대순환 — 하늘의 배달 노선 (완자 123쪽)</text>
      <text x="24" y="56" font-size="13.5" font-weight="700" fill="#3d4652">왼쪽 = 공기의 연직 순환 단면도(북반구 기준) · 오른쪽 = 지표 바람 지도 (화살표 = 바람이 흘러가는 방향)</text>
      ${g}
    </svg>`;
  }

  /* ── 정리 강의② 해수의 표층 순환 — 단계 완성 ── */
  function svgSea(step){
    const S=(n,h)=>step>=n?h:"";
    const ox0=300, ox1=820;
    const lat = d => 272 - d*3.3;
    const warm = step>=3 ? "#d64545" : "#5b7cad", warmS = step>=3 ? "#b02d55" : "#3f5a7d";
    const cold = step>=3 ? "#1f6fd6" : "#5b7cad", coldS = step>=3 ? "#0B3E86" : "#3f5a7d";
    let g = "";
    g += `<rect x="${ox0}" y="74" width="${ox1-ox0}" height="396" fill="#d8eafa"/>
      <rect x="248" y="74" width="52" height="396" fill="#cdbf9f"/>
      <rect x="${ox1}" y="74" width="52" height="396" fill="#cdbf9f"/>
      ${VT(274,120,"아시아")}${VT(846,110,"북아메리카")}${VT(274,316,"오스트레일리아")}${VT(846,330,"남아메리카")}`;
    [[60,"60°N"],[30,"30°N"],[0,"적도 0°"],[-30,"30°S"],[-60,"60°S"]].forEach(([d,lb])=>{
      g += `<line x1="${ox0}" y1="${lat(d)}" x2="${ox1}" y2="${lat(d)}" stroke="${d===0?"#d64545":"#b9c4d4"}" stroke-width="${d===0?2:1.2}"${d===0?' stroke-dasharray="8 5"':""} opacity=".8"/>
        <text x="240" y="${lat(d)+5}" text-anchor="end" font-size="13.5" font-weight="700" fill="#3d4652">${lb}</text>`;
    });
    /* 1단계 — 바람이 해류를 만든다 (해류가 등장하는 2단계부터는 바람을 걷어 겹침 방지) */
    if(step === 1){
      [380,540,700].forEach(x=>{ g += AR(x+30, lat(20)-30, x-30, lat(20)+30, 12, "#F5B301", "#c8920a"); });
      [380,540,700].forEach(x=>{ g += AR(x-28, lat(50)+28, x+28, lat(50)-28, 12, "#F5B301", "#c8920a"); });
      g += `<text x="560" y="${lat(20)+52}" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">무역풍 — 1년 내내 서쪽으로</text>
        <text x="560" y="${lat(50)+52}" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">편서풍 — 1년 내내 동쪽으로</text>`;
    }
    g += S(1, `<rect x="24" y="80" width="208" height="110" rx="10" fill="#fffaf0" stroke="#c8920a"/>
      <text x="128" y="108" text-anchor="middle" font-size="14" font-weight="900" fill="#092f66">바람이 1년 내내</text>
      <text x="128" y="130" text-anchor="middle" font-size="14" font-weight="900" fill="#092f66">같은 방향으로 불면 →</text>
      <text x="128" y="152" text-anchor="middle" font-size="13" font-weight="700" fill="#3d4652">표층의 바닷물이 끌려 흐른다</text>
      <text x="128" y="176" text-anchor="middle" font-size="15" font-weight="900" fill="#c8920a">= 표층 해류</text>`);
    /* 2단계 — 북태평양 순환 4해류 (3단계에서 난류·한류 색 구분) */
    const cur = (x1,y1,x2,y2,isWarm,label,lx,ly,anchor) =>
      AR(x1,y1,x2,y2,13, isWarm?warm:cold, isWarm?warmS:coldS)
      + `<text x="${lx}" y="${ly}"${anchor?` text-anchor="${anchor}"`:""} font-size="15.5" font-weight="900" fill="${isWarm?warm:cold}">${label}</text>`;
    g += S(2,
      cur(770,240, 350,240, true,  `① 북적도 해류${step>=3?" · 난류":""}`, 560,260,"middle")
    + cur(335,232, 335,146, true,  `② 쿠로시오 해류${step>=3?" · 난류":""}`, 352,172,"")
    + cur(345,136, 770,136, false, `③ 북태평양 해류${step>=3?" · 한류":""}`, 560,158,"middle")
    + cur(788,144, 788,230, false, `④ 캘리포니아 해류${step>=3?" · 한류":""}`, 772,224,"end")
    + `<text x="560" y="100" text-anchor="middle" font-size="16" font-weight="900" fill="#0B3E86">북태평양 순환 — 시계 방향 ⟳</text>
       <text x="560" y="500" text-anchor="middle" font-size="16" font-weight="900" fill="#092f66">경로 암기 — 북적도 → 쿠로시오 → 북태평양 → 캘리포니아 해류 (시계 방향)</text>`);
    /* 3단계 — 난류·한류 범례 */
    g += S(3, `<rect x="24" y="206" width="208" height="112" rx="10" fill="#fff" stroke="#b9c4d4"/>
      <rect x="38" y="224" width="30" height="10" rx="3" fill="#d64545"/>
      <text x="76" y="234" font-size="13" font-weight="900" fill="#b02d55">난류 — 따뜻한 물</text>
      <text x="38" y="254" font-size="11.5" font-weight="700" fill="#3d4652">저위도 → 고위도 (예: 쿠로시오)</text>
      <rect x="38" y="270" width="30" height="10" rx="3" fill="#1f6fd6"/>
      <text x="76" y="280" font-size="13" font-weight="900" fill="#0B3E86">한류 — 찬 물</text>
      <text x="38" y="300" font-size="11.5" font-weight="700" fill="#3d4652">고위도 → 저위도 (예: 캘리포니아)</text>`);
    /* 4단계 — 남반구 대칭 + 대서양(멕시코 만류·카나리아 해류) */
    g += S(4,
      AR(770,308, 350,308, 13, warm, warmS) + AR(335,316, 335,400, 13, warm, warmS)
    + AR(345,410, 770,410, 13, cold, coldS) + AR(788,402, 788,316, 13, cold, coldS)
    + `<text x="560" y="366" text-anchor="middle" font-size="16" font-weight="900" fill="#0B3E86">남반구 — 반시계 방향 ⟲ (거의 대칭)</text>
      <rect x="24" y="334" width="208" height="128" rx="10" fill="#fff" stroke="#b9c4d4"/>
      <text x="128" y="360" text-anchor="middle" font-size="14" font-weight="900" fill="#092f66">대서양도 같은 원리!</text>
      <text x="128" y="386" text-anchor="middle" font-size="13.5" font-weight="900" fill="#d64545">멕시코 만류 = 난류</text>
      <text x="128" y="406" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3d4652">(런던을 데우는 그 바닷물)</text>
      <text x="128" y="432" text-anchor="middle" font-size="13.5" font-weight="900" fill="#1f6fd6">카나리아 해류 = 한류</text>`);
    return `<svg viewBox="0 0 960 520">
      <rect width="960" height="520" fill="#fff"/>
      <text x="24" y="34" font-size="23" font-weight="900" fill="#092f66">해수의 표층 순환 — 바다의 배달 노선 (완자 123쪽)</text>
      <text x="24" y="56" font-size="14" font-weight="700" fill="#3d4652">원인은 대기 대순환의 바람 · 북반구와 남반구는 거의 대칭</text>
      ${g}
    </svg>`;
  }

  /* ── 예측 집계 도우미 (개인 predInit / predFinal 방향별) ── */
  const WDIRS = ["SW","NE","E","W"];
  const WLABEL = { SW:"↙ 남서", NE:"↗ 북동", E:"→ 동", W:"← 서" };
  const GLABEL = { cw:"⟳ 시계", ccw:"⟲ 반시계" };
  const BANDNAME = { w1:"1구간 0°~30°", w2:"2구간 30°~60°", w3:"3구간 60°~90°" };
  /* 과학적 정답 — 바람·바닷물이 '흘러가는 쪽' 기준 (svgAtm/svgSea와 일치) */
  const TRUTH = { w1:"SW", w2:"NE", w3:"SW", gyre:"cw" };
  const TRUTHLBL = { w1:"무역풍 → 남서쪽", w2:"편서풍 → 북동쪽", w3:"극동풍 → 남서쪽", gyre:"시계 방향 ⟳" };

  const preds = key => E.students.map(s => s[key]).filter(p => p && typeof p === "object");
  const submitted = key => E.students.filter(s => { const p = s[key]; return p && (p.w1||p.w2||p.w3||p.gyre); }).length;
  function windCounts(key, band){            // 한 구간의 방향별 득표 {SW,NE,E,W}
    const c = { SW:0, NE:0, E:0, W:0 };
    preds(key).forEach(p => { if(c[p[band]] !== undefined) c[p[band]]++; });
    return c;
  }
  function gyreCounts(key){ const c = { cw:0, ccw:0 }; preds(key).forEach(p => { if(c[p.gyre] !== undefined) c[p.gyre]++; }); return c; }
  function changeStat(){                      // 1차→2차 수정 현황
    let changed = 0, both = 0;
    E.students.forEach(s => { const a=s.predInit, b=s.predFinal;
      if(a && b){ both++; if(["w1","w2","w3","gyre"].some(k => (a[k]||"") !== (b[k]||""))) changed++; } });
    return { changed, both };
  }

  /* 분포 막대 한 줄 (방향별 득표) — showTruth면 정답 방향을 금색으로 강조 */
  function distRow(label, counts, order, labeler, truthKey, showTruth){
    const mx = Math.max(1, ...order.map(k => counts[k]));
    return `
    <div style="display:flex;align-items:center;gap:1vw;margin-bottom:1vh">
      <div style="flex-shrink:0;width:22vh;font-size:2.1vh;font-weight:900;color:var(--navy2)">${label}</div>
      <div style="flex:1;display:flex;gap:1.6vw">
        ${order.map(k => { const hot = showTruth && k===truthKey;
          return `<div style="flex:1;display:flex;flex-direction:column;align-items:center">
            <div style="font-size:2vh;font-weight:900;color:${hot?"var(--gold-d)":"var(--navy)"}">${counts[k]||""}</div>
            <div style="width:100%;height:7vh;display:flex;align-items:flex-end;justify-content:center">
              <div style="width:46%;height:${(counts[k]/mx*100).toFixed(1)}%;min-height:.4vh;border-radius:.6vh .6vh 0 0;background:${hot?"var(--gold)":"var(--navy)"}"></div>
            </div>
            <div style="font-size:1.7vh;font-weight:700;color:${hot?"var(--gold-d)":"var(--soft)"};margin-top:.4vh;white-space:nowrap">${labeler[k]}${hot?" ✔":""}</div>
          </div>`; }).join("")}
      </div>
    </div>`;
  }
  function distBlock(key, showTruth){
    return ["w1","w2","w3"].map(b => distRow(BANDNAME[b], windCounts(key,b), WDIRS, WLABEL, TRUTH[b], showTruth)).join("")
      + distRow("🌊 북태평양 순환", gyreCounts(key), ["cw","ccw"], GLABEL, TRUTH.gyre, showTruth);
  }

  /* ── 공유 — 학생 전체 풀에서 지명 (교사 모듈 자체 구현: drawSpeaker를 전체 학생으로 확장) ── */
  let pickedId = "", drawing2 = false;
  const pickedStu = () => E.students.find(s => s.id === pickedId);
  function drawStudent(){
    if(drawing2) return;
    const pool = E.students.filter(s => s.predFinal && (s.predFinal.w1 || s.predFinal.gyre));
    const use = pool.length ? pool : E.students;
    if(!use.length){ alert("아직 입장·제출한 학생이 없어요."); return; }
    drawing2 = true;
    const winner = use[Math.floor(Math.random()*use.length)];
    const total = 10 + Math.floor(Math.random()*6);
    let step = 0;
    const spin = () => {
      if(step >= total){ pickedId = winner.id; drawing2 = false; E.render(); return; }   // 종료: 플래그 먼저 내리고 재렌더 → '뽑는 중…' 배지 제거
      pickedId = use[step % use.length].id;
      E.render();
      step++; setTimeout(spin, 70 + step*step*1.1);
    };
    spin();
  }
  function changeText(s){                     // 지명 학생의 1차→2차 변화 문구
    const a = s.predInit || {}, b = s.predFinal || {};
    const moves = [];
    [["w1","1구간"],["w2","2구간"],["w3","3구간"],["gyre","해류"]].forEach(([k,nm]) => {
      if(a[k] && b[k] && a[k] !== b[k]){
        const L = k==="gyre" ? GLABEL : WLABEL;
        moves.push(`${nm} ${L[a[k]]}→${L[b[k]]}`);
      }
    });
    return moves;
  }

  let briefIdx = 0, atmStep = 0, seaStep = 0, opFull = false, showTruth2 = false, feedSel = "predEN";
  let clueOpen = {};   // 단서별 해석 공개 상태 {0:false…5} — 교사가 토글로 하나씩 공개

  /* 0 로비 — 입찰 공고 포스터 */
  E.slide(() => `
    <div class="kicker">통합과학2 · 지구 환경 변화 2/3 · 호남고등학교 · ${E.clsLabel()}</div>
    <h1 class="big" style="font-size:6.2vh">지구 배달 주식회사 —<br>대기 대순환과 해수의 표층 순환</h1>
    <div class="rule"></div>
    <div style="font-size:2.3vh;font-weight:900;color:var(--navy2);background:#fffaf0;border:.3vh solid var(--gold);border-radius:1.2vh;padding:1.2vh 2vh;margin-bottom:1.5vh">
      📦 <span style="color:var(--gold-d)">분석 의뢰</span> — 발주처 「지구」: 적도의 남는 에너지를 극까지 나르는 <b>배달 노선</b>을 찾습니다. 오늘은 <b>각자</b> 노선을 예측하고 단서로 고쳐 봅니다. 지금 입장하세요!
    </div>
    <div class="lobbywrap">
      <div class="lobbyL">
        <div style="font-size:3vh;font-weight:900;color:var(--navy)">💻 노트북으로 접속하세요</div>
        <div class="url">${E.ENTRY.replace("https://","")}</div>
        <div class="joined">
          <div class="cnt">접속 <b>${E.students.length}</b>명</div>
          <div class="teamsrow" style="grid-template-columns:1fr">
            <div class="teambox"><h4>입장한 분석가</h4>${E.students.map(s=>`<span>${esc(s.name)}</span>`).join("") || '<span style="background:none;color:#a8b2c0;font-weight:500">아직 입장 전…</span>'}</div>
          </div>
        </div>
      </div>
      <div class="lobbyR"><div id="qr"></div><div style="font-size:2vh;color:var(--soft);font-weight:700">QR을 찍어도 바로 열려요</div></div>
    </div>`,
    { enter(){ E.setState({phase:"lobby"}); },
      after(){ E.lobbyQR(); },
      acts(){ return [E.resetAct()]; } });

  /* 1 발주 공고 — ①차시 그래프 재등장 */
  E.slide(() => `
    <div class="kicker">발주 공고 — 왜 배달이 필요한가</div>
    <h2 class="mid" style="margin-bottom:1vh">발주처 「지구」 — 에너지 배달 노선 분석 의뢰</h2>
    <div style="flex:1;display:flex;gap:2.5vw;min-height:0;align-items:center">
      <div style="flex:1;border:.5vh solid var(--navy);border-radius:1.6vh;padding:3vh 3.2vh">
        <div style="font-size:2vh;font-weight:900;color:var(--gold-d);letter-spacing:.14em">분석 의뢰 제46억-0001호</div>
        <div style="font-size:3.1vh;font-weight:900;color:var(--navy2);line-height:1.5;margin:1.5vh 0">"적도 창고에는 에너지 재고가 쌓이고,<br>극 매장은 품절입니다."</div>
        <div class="goals" style="font-size:2.4vh">
          <p>📦 운송 물품 — 적도(저위도)의 <b>남는 에너지</b></p>
          <p>📍 배송지 — <b>극(고위도)</b> 방면</p>
          <p>🧭 과제 — 무엇이 이 에너지를 나르는지 <b>각자 노선을 예측</b></p>
          <p>🔎 방법 — 1차 예측 → 단서로 수정 → 실제와 대조</p>
        </div>
        <div style="font-size:2vh;font-weight:700;color:var(--soft);margin-top:1.5vh">※ ①차시 마지막 질문 — "왜 적도는 계속 뜨거워지지 않을까?" 그 답을 오늘 여러분이 예측합니다.</div>
      </div>
      <div class="svgwrap" style="flex:1.2;min-width:0">${svgLat()}</div>
    </div>`);

  /* 2 목표 제시 — 학습목표 + 개인 예측-수정형 안내 */
  E.slide(() => `
    <div class="kicker">오늘의 목표 — 예측하고, 고치고, 맞춰 본다</div>
    <h2 class="mid">이 수업이 끝나면, 여러분은</h2>
    <div class="rule"></div>
    <div class="goals">
      <p><span class="num">1</span><b>대기 대순환</b>(무역풍·편서풍·극동풍)이 생기는 까닭과 구조를<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;예측하고, 근거로 수정·설명할 수 있다.</p>
      <p style="margin-top:2.5vh"><span class="num">2</span><b>표층 해류</b>가 대기 대순환의 바람으로 생기고 에너지를<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수송함을 데이터로 해석·설명할 수 있다.</p>
    </div>
    <div style="margin-top:auto;background:#fffaf0;border:.3vh solid var(--gold);border-radius:1.2vh;padding:1.8vh 2.4vh">
      <div style="font-size:2.6vh;font-weight:900;color:var(--navy2)">🧭 오늘은 <span style="color:var(--gold-d)">각자</span> 예측하고, 단서로 고치고, 실제와 대조합니다</div>
      <div style="font-size:2.3vh;font-weight:700;color:var(--soft);line-height:1.9;margin-top:.8vh">
        <b style="color:var(--navy)">1차 예측</b>(감으로) &nbsp;→&nbsp; <b style="color:var(--navy)">단서 함께 읽기</b> &nbsp;→&nbsp;
        <b style="color:var(--navy)">2차 예측</b>(수정+근거) &nbsp;→&nbsp; <b style="color:var(--navy)">실제와 대조</b><br>
        <span style="color:var(--gold-d);font-weight:900">예측은 틀려도 괜찮아요 — 근거로 고치는 것이 과학입니다.</span>
      </div>
    </div>`);

  /* 3 1차 예측 분포 — 학생들이 감으로 그린 predInit 방향별 분포 */
  E.slide(() => {
    const n = submitted("predInit");
    return `
    <div class="kicker">1차 예측 — 감으로 그린 노선 (단서 보기 전)</div>
    <h2 class="mid" style="margin-bottom:.5vh">어디서 생각이 갈렸나? <span style="font-size:2.4vh;color:var(--gold-d)">제출 ${n}/${E.students.length}명</span></h2>
    <div style="font-size:2.2vh;font-weight:700;color:var(--soft);margin-bottom:1.5vh">💻 각자 노트북에서 지상 3구간의 바람과 북태평양 해류 방향을 <b style="color:var(--navy)">직감으로</b> 고르는 중 — 막대가 실시간으로 쌓입니다.</div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0">
      ${distBlock("predInit", false)}
    </div>
    <div style="flex-shrink:0;font-size:2.1vh;font-weight:700;color:var(--soft)">📡 정답은 지금 공개하지 않습니다 — 단서를 함께 읽은 뒤, <b style="color:var(--navy)">2차 예측</b>에서 스스로 고쳐 봅니다.</div>`;
  }, { enter(){ E.setState({phase:"predinit"}); },
       acts(){ return [E.resetAct()]; } });

  /* 4 단서 같이 읽기 — 발문 → 학생과 함께 추론 → 토글로 해석 공개 (단서별 개별 토글) */
  E.slide(() => {
    const K = CARDS[briefIdx];
    const isOpen = !!clueOpen[briefIdx];
    return `
    <div class="kicker">단서 같이 읽기 — 발문하고 함께 추론 (${briefIdx+1}/6) · ${isOpen ? "🔓 해석 공개됨" : "🔒 해석 숨김"}</div>
    <h2 class="mid" style="margin-bottom:1vh">${K.emoji} 단서 ${briefIdx+1} — ${K.title}</h2>
    <div style="flex:1;display:flex;gap:2.5vw;min-height:0;align-items:center">
      <div style="flex:1.5;min-width:0"><div class="minichart" style="border-width:.3vh">${K.svg()}</div></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:1.2vh;min-width:0">
        <div class="bans" style="font-size:2.3vh"><b>체크 질문</b>${K.q}</div>
        <div style="display:flex;flex-direction:column;gap:.8vh">
          ${K.opts.map((o,j)=>{ const hot = isOpen && j===K.ans;
            return `<div style="font-size:2.1vh;font-weight:700;padding:1vh 1.6vh;border-radius:1vh;border:.25vh solid ${hot?"var(--green)":"var(--line)"};background:${hot?"#f0faf3":"#fff"};color:${hot?"var(--green)":"var(--soft)"}">${"①②③"[j]} ${o}${hot?" ✔":""}</div>`; }).join("")}
        </div>
        ${isOpen
          ? `<div class="bans" style="border-left-color:var(--green);font-size:2.1vh"><b>한 줄 해설</b>${K.exp}</div>`
          : `<div class="bans" style="border-left-color:var(--gold);font-size:2.1vh;background:#fffaf0"><b>💬 함께 추론해 봅시다</b>"이 단서는 무엇을 말할까요?" 학생들과 먼저 예측해 본 뒤, 아래 <b style="color:var(--gold-d)">💡 정답·해석 보기를</b> 눌러 공개하세요.</div>`}
      </div>
    </div>`;
  }, { enter(){ briefIdx = 0; clueOpen = {}; E.setState({phase:"scout"}); },
       space(){ if(briefIdx < 5){ briefIdx++; E.render(); return true; } return false; },
       acts(){ const isOpen = !!clueOpen[briefIdx]; const allOpen = CARDS.every((_,i)=>clueOpen[i]);
         return [
         ["◀ 이전 단서", "ghost", () => { if(briefIdx>0){ briefIdx--; E.render(); } }],
         [isOpen ? "🔓 해석 닫기" : "💡 정답·해석 보기", isOpen ? "ghost" : "gold", () => { clueOpen[briefIdx] = !clueOpen[briefIdx]; E.render(); }],
         [allOpen ? "모두 닫기" : "모두 열기", "ghost", () => { CARDS.forEach((_,i)=>clueOpen[i]=!allOpen); E.render(); }],
         ["다음 단서 ▶ (Space)", "navy", () => { if(briefIdx<5){ briefIdx++; E.render(); } }],
       ]; } });

  /* 5 2차 예측 분포 + 1차→2차 변화 — 단서를 읽고 수정한 predFinal */
  E.slide(() => {
    const n = submitted("predFinal");
    const { changed, both } = changeStat();
    return `
    <div class="kicker">2차 예측 — 단서로 고친 노선</div>
    <h2 class="mid" style="margin-bottom:.5vh">생각은 어떻게 움직였나? <span style="font-size:2.4vh;color:var(--gold-d)">제출 ${n}/${E.students.length}명</span></h2>
    <div style="font-size:2.2vh;font-weight:700;color:var(--soft);margin-bottom:1.3vh">
      🔁 1·2차를 모두 낸 <b style="color:var(--navy)">${both}</b>명 중 <b style="color:var(--gold-d)">${changed}</b>명이 노선을 <b>수정</b>했습니다 — 단서가 생각을 바꿨어요.${showTruth2 ? ' <span style="color:var(--gold-d);font-weight:900">· 금색 ✔ = 실제 정답</span>' : ""}
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0">
      ${distBlock("predFinal", showTruth2)}
    </div>
    <div style="flex-shrink:0;font-size:2.1vh;font-weight:700;color:var(--soft)">📡 아직 고치는 중이라면 노트북에서 바로 반영됩니다 — 다음은 <b style="color:var(--navy)">친구 생각 공유</b>.</div>`;
  }, { enter(){ E.setState({phase:"predfinal"}); showTruth2 = false; },
       acts(){ return [[showTruth2 ? "정답 숨기기" : "실제 정답 표시", showTruth2 ? "ghost" : "gold", () => { showTruth2 = !showTruth2; E.render(); }]]; } });

  /* 6 공유 — 전체 학생 풀에서 지명, 지명 학생의 2차 노선도와 '고친 이유' 공유 */
  E.slide(() => {
    const s = pickedStu();
    if(!s){
      const n = submitted("predFinal");
      return `
      <div class="kicker">공유 — 친구의 생각을 들어 보자</div>
      <h2 class="mid" style="margin-bottom:.5vh">생각이 갈린 구간, 누구에게 물어볼까? <span style="font-size:2.4vh;color:var(--soft)">2차 제출 ${n}명</span></h2>
      <div style="font-size:2.4vh;font-weight:700;color:var(--soft);line-height:1.9;margin-bottom:1.5vh">
        🎲 아래 <b style="color:var(--navy)">🎲 학생 뽑기</b>로 2~3명을 지명하세요. 지명된 학생의 <b>2차 노선도</b>와 "1차엔 ○○였는데 △△ 단서 때문에 □□로 바꿨다"는 이야기를 함께 듣습니다.
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        <div style="border:.4vh dashed var(--line);border-radius:2vh;padding:4vh 6vh;text-align:center;color:var(--soft)">
          <div style="font-size:6vh">🎤</div>
          <div style="font-size:2.6vh;font-weight:900;color:var(--navy2);margin-top:1vh">🎲 학생 뽑기를 눌러 주세요</div>
        </div>
      </div>`;
    }
    const moves = changeText(s);
    const ev = +(s.predFinal && s.predFinal.evid) || 0;
    return `
    <div class="kicker">공유 — ${esc(s.name)} 분석가의 노선</div>
    <h2 class="mid" style="margin-bottom:1vh">🎤 <b style="color:var(--gold-d)">${esc(s.name)}</b>${drawing2 ? ' <span style="font-size:2.4vh;color:var(--soft)">뽑는 중…</span>' : ""}</h2>
    <div style="flex:1;display:flex;gap:2.5vw;min-height:0;align-items:center">
      <div style="flex:1.4;max-width:120vh"><div class="minichart" style="border-width:.3vh">${routeSVG(s.predFinal || {}, `${s.name} 2차`)}</div></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:1.6vh;min-width:0">
        <div class="bans"><b>🔁 1차 → 2차, 무엇을 고쳤나</b>${moves.length ? moves.map(m=>`• ${m}`).join("<br>") : "<span class='dim2'>1·2차가 같아요 — 왜 바꾸지 않았는지도 좋은 이야기!</span>"}</div>
        <div class="bans" style="border-left-color:var(--green)"><b>✍ 고친 이유 (한 줄 근거)</b>${s.predFinal && s.predFinal.reason ? esc(s.predFinal.reason) : "<span class='dim2'>근거 미입력</span>"}</div>
        <div class="bans"><b>🗂 결정적 단서</b>${ev ? evidName(ev) : "<span class='dim2'>미선택</span>"}</div>
      </div>
    </div>`;
  },
  { enter(){ E.setState({phase:"share"}); },
    acts(){ return [
      ["🎲 학생 뽑기", "gold", drawStudent],
      ...(pickedId ? [["지명 지우기", "ghost", () => { pickedId = ""; E.render(); }]] : []),
    ]; } });

  /* 10 정리 강의① — 대기의 노선 (완자 123쪽) */
  E.slide(() => `
    <div class="kicker">정리 ① — 예측 vs 실제 (대기 대순환 · 완자 123쪽)</div>
    <h2 class="mid">많이들 예측한 방향, 실제와 맞춰 봅시다 <span style="font-size:2.4vh;color:var(--soft)">(Space ${atmStep}/6)</span></h2>
    <div style="font-size:2vh;font-weight:700;color:var(--soft);margin-bottom:.6vh">💬 "1구간을 많이들 ○○로 예측했는데, 실제는 <b style="color:var(--navy)">남서쪽(무역풍)</b> — 왜냐하면 자전 때문에 오른쪽으로 휘니까…" 식으로 대조하며 공개하세요.</div>
    <div class="svgwrap">${svgAtm(atmStep)}</div>`,
    { enter(){ atmStep = 0; E.setState({phase:"wrap"}); },
      space(){ if(atmStep < 6){ atmStep++; E.render(); return true; } return false; },
      acts(){ return [["다음 단계 ▶ (Space)", "navy", () => { if(atmStep<6){ atmStep++; E.render(); } }]]; } });

  /* 11 정리 강의② — 바다의 노선 */
  E.slide(() => `
    <div class="kicker">정리 ② — 예측 vs 실제 (표층 해류 · 완자 123쪽)</div>
    <h2 class="mid">바람이 끌고 가는 바닷물 — 북태평양은 <b style="color:var(--navy)">시계 방향</b> <span style="font-size:2.4vh;color:var(--soft)">(Space ${seaStep}/4)</span></h2>
    <div class="svgwrap">${svgSea(seaStep)}</div>`,
    { enter(){ seaStep = 0; },
      space(){ if(seaStep < 4){ seaStep++; E.render(); return true; } return false; },
      acts(){ return [["다음 단계 ▶ (Space)", "navy", () => { if(seaStep<4){ seaStep++; E.render(); } }]]; } });

  /* 12 시험 포인트 결산 — ①차시 그래프와 연결 + 메타 교훈 */
  E.slide(() => `
    <div class="kicker">시험 포인트 결산 (완자 123쪽)</div>
    <h2 class="mid" style="margin-bottom:1vh">오늘 꼭 가져갈 세 가지</h2>
    <div style="flex:1;display:flex;gap:2vw;min-height:0;align-items:center">
      <div class="svgwrap" style="flex:1.2;min-width:0">${svgLat()}</div>
      <div style="flex:1;display:flex;flex-direction:column;gap:1.4vh;min-width:0">
        <div class="ledger" style="flex-direction:column;gap:1.2vh;margin-top:0">
          <div><b>⑴ 지상의 바람 3종 — 위도 숫자까지!</b>무역풍 적도~30° · 편서풍 30°~60° · 극동풍 60°~극 (남반구도 대칭)</div>
          <div><b>⑵ 표층 해류의 원인 = 대기 대순환의 바람</b>저위도 표층 해수는 서쪽으로(무역풍) · 중위도는 동쪽으로(편서풍)<br>북태평양: 북적도 → 쿠로시오 → 북태평양 → 캘리포니아 해류</div>
          <div><b>⑶ 왜 순환하나 — 에너지 배달</b>저위도의 남는 에너지를 고위도로 수송 · <b style="display:inline;font-size:inherit;color:var(--red)">위도 38° 부근</b>에서 에너지 이동이 가장 활발</div>
          <div style="border-left-color:var(--navy)"><b>⑷ 오늘의 수업이 남긴 것</b>1차 예측은 저마다 달랐지만, <b style="display:inline;font-size:inherit">단서(근거)</b>를 읽고 생각을 고치자 실제에 가까워졌다. <b style="display:inline;font-size:inherit">예측은 틀려도 괜찮다 — 근거로 고치는 것이 과학</b>이다.</div>
        </div>
        <div style="font-size:2.1vh;font-weight:700;color:var(--soft);line-height:1.8;background:var(--lt);border-radius:1vh;padding:1.4vh 1.8vh">
          🎯 ①차시 열수지 그래프와 오늘의 노선도는 <b style="color:var(--navy)">한 세트</b> — 그래프의 '남는 에너지'를 오늘 배운 바람과 해류가 배달합니다.</div>
      </div>
    </div>`);

  /* 13 다음차시 연결 — 엘니뇨·사막화 개인 예측 2문항 피드 */
  const FEEDS = {
    opinion: { key:"opinion", tab:"💭 오늘의 한 문장", head:"오늘 가장 크게 바뀐 생각은?", prompt:"예측이 단서로 어떻게 달라졌는지 돌아봅니다." },
    predEN:  { key:"predEN",  tab:"🌊 질문① 엘니뇨",  head:"무역풍이 약해지면?", prompt:"따뜻한 물·비구름은 어디로? 태평양 동·서 날씨는 어떻게 달라질까?" },
    predSD:  { key:"predSD",  tab:"🏜 질문② 사막화",  head:"위도 30° 건조대가 넓어지면?", prompt:"공기가 가라앉아 늘 건조한 띠(세계의 사막)가 넓어지면 땅과 사람에게 무슨 일이?" },
  };
  E.slide(() => {
    const F = FEEDS[feedSel] || FEEDS.predEN;
    const ops = E.students.filter(s => s[F.key] && String(s[F.key]).trim())
      .sort((a,b)=>(a.endTs||0)-(b.endTs||0));
    const list = opFull ? ops : ops.slice(-10);
    return `
    <div class="kicker">다음 시간 연결 — 『배달 사고: 엘니뇨와 사막화』 미리 예측</div>
    <h2 class="mid" style="margin-bottom:.6vh">${F.head} <span style="font-size:2.4vh;color:var(--soft)">제출 ${ops.length}/${E.students.length}명${opFull?` · 전체 (${E.clsShort()})`:""}</span></h2>
    <div style="font-size:2.3vh;font-weight:700;color:var(--soft);margin-bottom:1vh">💻 ${F.prompt} — 각자 노트북에서 <b style="color:var(--navy)">근거와 함께</b> 예측합니다.</div>
    <div class="opfeed" style="${opFull ? "overflow-y:auto" : ""}">${list.map(s => `<div class="opline"><b>${esc(s.name)}</b>${esc(s[F.key])}</div>`).join("") || '<div style="font-size:2.4vh;color:var(--soft);font-weight:700">아직 제출이 없어요.</div>'}</div>`;
  },
  { enter(){ E.setState({phase:"end"}); opFull = false; feedSel = "predEN"; },
    acts(){ return [
      ...Object.values(FEEDS).map(F => [F.tab, feedSel===F.key ? "gold" : "navy", () => { feedSel = F.key; E.render(); }]),
      [opFull ? "최근 10개만" : "전체 목록", opFull ? "ghost" : "ghost", () => { opFull = !opFull; E.render(); }],
    ]; } });

  /* 14 예고 — 배달 사고 */
  E.slide(() => {
    const ops = E.students.filter(s => s.opinion || s.predEN || s.predSD);
    return `
    <div class="kicker">다음 시간 예고</div>
    <h2 class="mid">만약, 배달이 멈춘다면</h2>
    <div class="rule"></div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center">
      <div style="border:.5vh solid var(--navy);border-radius:2vh;padding:4vh 5vh;max-width:120vh">
        <div style="font-size:2.2vh;font-weight:900;color:var(--gold-d);letter-spacing:.14em;margin-bottom:1.5vh">지구 환경 변화 3/3</div>
        <div style="font-size:3.6vh;font-weight:900;color:var(--navy2);line-height:1.45">『배달 사고 —<br>엘니뇨와 사막화』</div>
        <div class="goals" style="font-size:2.5vh;margin-top:2vh">
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">1</span>오늘 예측한 <b>무역풍이 약해지면</b> 바다와 날씨가 어떻게 달라지는지 — 엘니뇨로 확인합니다</p>
          <p><span class="num" style="width:3.6vh;height:3.6vh;line-height:3.6vh;font-size:2vh">2</span>위도 30° <b>건조대가 넓어지면</b> — 사막화가 만드는 이상 기후</p>
        </div>
        <div style="font-size:2.2vh;font-weight:700;color:var(--soft);margin-top:2vh">📚 복습 — <b style="color:var(--navy)">무역풍·편서풍·극동풍의 위도 범위</b>와 <b style="color:var(--navy)">북태평양 4해류 경로</b>는 시험 범위 핵심!</div>
      </div>
    </div>
    <div style="font-size:2.4vh;font-weight:700;color:var(--soft)">예측 제출 ${ops.length}/${E.students.length}명 — 아직이라면 지금 제출! 오늘도 수고했습니다 🚚</div>`;
  },
  { enter(){ E.setState({phase:"end"}); } });
}
