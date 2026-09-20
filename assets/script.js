const answers = {q1:'a', q2:'b', q3:'a', q4:'c', q5:'a', q6:'a'};
const form = document.getElementById('quizForm');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let score = 0;
  let answered = 0;

  Object.entries(answers).forEach(([q, correct]) => {
    const chosen = form.querySelector(`input[name="${q}"]:checked`);
    if (chosen) {
      answered++;
      if (chosen.value === correct) score++;
    }
  });

  resultEl.style.display = 'block';
  if (answered < 6) {
    scoreEl.textContent = '—';
    resultEl.textContent = 'أكمل جميع الأسئلة أولا.';
    return;
  }

  scoreEl.textContent = score;
  resultEl.textContent = score === 6
    ? 'ممتاز! إجاباتك كلها صحيحة.'
    : score >= 4
      ? 'أحسنت! نتيجة جميلة.'
      : 'محاولة جيدة، يمكنك إعادة الاختبار.';
  resultEl.scrollIntoView({behavior:'smooth', block:'nearest'});
});

document.getElementById('resetQuiz')?.addEventListener('click', () => {
  form.reset();
  scoreEl.textContent = '—';
  resultEl.style.display = 'none';
});

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 650 ? 'block' : 'none';
});
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* معرض أعمال الطلاب من Google Drive */
(() => {
  const students = document.getElementById('students');
  if (!students) return;

  const galleryStyle = document.createElement('style');
  galleryStyle.textContent = `
    #students.student-section{background:linear-gradient(180deg,#f6fbf8,#eef7f2)}
    .drive-showcase{display:grid;grid-template-columns:190px 1fr;gap:30px;align-items:center;background:linear-gradient(135deg,#ffffff 0%,#f0faf4 100%);border:1px solid rgba(0,108,53,.14);border-radius:30px;padding:32px;box-shadow:0 18px 50px rgba(0,71,38,.10);overflow:hidden;position:relative}
    .drive-showcase:after{content:"";position:absolute;width:260px;height:260px;border-radius:50%;background:rgba(0,108,53,.05);left:-100px;bottom:-130px;pointer-events:none}
    .drive-icon{width:170px;height:170px;border-radius:36px;background:#fff;display:grid;place-items:center;box-shadow:0 15px 35px rgba(0,72,38,.12);border:1px solid rgba(0,108,53,.1);position:relative;z-index:1}
    .drive-icon svg{width:132px;height:132px;display:block}
    .drive-copy{position:relative;z-index:1}
    .drive-kicker{display:inline-block;background:#dff3e8;color:#006c35;border-radius:999px;padding:5px 12px;font-size:.82rem;font-weight:900;margin-bottom:8px}
    .drive-copy h3{font-size:clamp(1.45rem,3vw,2.2rem);margin:0 0 8px;color:#073d26}
    .drive-copy p{margin:0;color:#60736a;max-width:720px}
    .drive-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
    .drive-btn{border:0;border-radius:16px;padding:12px 18px;font-family:inherit;font-weight:900;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;transition:.2s ease}
    .drive-btn:hover{transform:translateY(-2px)}
    .drive-btn-main{background:#006c35;color:#fff;box-shadow:0 9px 20px rgba(0,108,53,.18)}
    .drive-btn-alt{background:#fff;color:#006c35;border:1px solid rgba(0,108,53,.2)}
    .drive-browser{margin-top:24px;background:#fff;border-radius:26px;overflow:hidden;border:1px solid rgba(0,108,53,.14);box-shadow:0 16px 45px rgba(0,71,38,.09);scroll-margin-top:90px}
    .drive-browser[hidden]{display:none!important}
    .drive-browser-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 18px;background:linear-gradient(90deg,#006c35,#008a4b);color:#fff}
    .drive-browser-head strong{font-size:1rem}
    .drive-browser-head span{font-size:.82rem;opacity:.9}
    .drive-browser iframe{width:100%;height:720px;border:0;background:#f4f7f5;display:block}
    @media(max-width:760px){
      .drive-showcase{grid-template-columns:1fr;text-align:center;padding:24px 18px}
      .drive-icon{width:140px;height:140px;margin:auto;border-radius:30px}
      .drive-icon svg{width:108px;height:108px}
      .drive-actions{justify-content:center}
      .drive-browser-head{display:block;text-align:center}
      .drive-browser-head span{display:block;margin-top:2px}
      .drive-browser iframe{height:70vh;min-height:520px}
    }
  `;
  document.head.appendChild(galleryStyle);

  const folderId = '1WfxljrfWRWcDCARuNLoHOfUq31a7YyNa';
  const folderUrl = `https://drive.google.com/drive/folders/${folderId}`;
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;

  students.innerHTML = `
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="eyebrow">إبداعات طلابنا</div>
          <h2>معرض الأعمال الوطنية</h2>
        </div>
        <p class="lead">تصفح أعمال الطلاب مباشرة من Google Drive بجودتها الأصلية.</p>
      </div>

      <div class="drive-showcase">
        <div class="drive-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" role="img">
            <defs>
              <linearGradient id="folderGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#0a8f50"/>
                <stop offset="1" stop-color="#005f31"/>
              </linearGradient>
            </defs>
            <path d="M18 32c0-6 5-11 11-11h24l10 12h28c7 0 12 5 12 12v44c0 8-6 14-14 14H31c-7 0-13-6-13-13V32z" fill="url(#folderGrad)"/>
            <path d="M27 42h67c5 0 9 4 9 9v37c0 8-6 14-14 14H31c-7 0-13-6-13-13V55c0-7 6-13 13-13z" fill="#ffffff" opacity=".96"/>
            <circle cx="59" cy="68" r="15" fill="#e1f4e8"/>
            <path d="M58 56l13 23H45l13-23zm0 7l-7 12h14l-7-12z" fill="#007a3d"/>
          </svg>
        </div>
        <div class="drive-copy">
          <span class="drive-kicker">معرض Google Drive</span>
          <h3>أعمال طلاب مدرسة الإمام الشوكاني</h3>
          <p>الصور ومقاطع الفيديو محفوظة في Google Drive وتُعرض من المصدر مباشرة للمحافظة على وضوحها وجودتها.</p>
          <div class="drive-actions">
            <button class="drive-btn drive-btn-main" id="driveToggle" type="button">فتح المعرض داخل المجلة</button>
            <a class="drive-btn drive-btn-alt" href="${folderUrl}" target="_blank" rel="noopener">فتح المعرض بملء الشاشة</a>
          </div>
        </div>
      </div>

      <div class="drive-browser" id="driveBrowser" hidden>
        <div class="drive-browser-head">
          <strong>أعمال الطلاب</strong>
          <span>المحتوى معروض مباشرة من Google Drive</span>
        </div>
        <iframe id="driveFrame" title="معرض أعمال الطلاب على Google Drive" loading="lazy" allow="fullscreen"></iframe>
      </div>
    </div>`;

  const toggle = document.getElementById('driveToggle');
  const browser = document.getElementById('driveBrowser');
  const frame = document.getElementById('driveFrame');

  toggle?.addEventListener('click', () => {
    const opening = browser.hasAttribute('hidden');
    if (opening) {
      browser.removeAttribute('hidden');
      if (!frame.src) frame.src = embedUrl;
      toggle.textContent = 'إغلاق المعرض';
      setTimeout(() => browser.scrollIntoView({behavior:'smooth', block:'start'}), 80);
    } else {
      browser.setAttribute('hidden', '');
      toggle.textContent = 'فتح المعرض داخل المجلة';
    }
  });
})();
