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
