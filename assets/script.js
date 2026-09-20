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

/* معرض أعمال الطلاب داخل المجلة */
(() => {
  const students = document.getElementById('students');
  if (!students) return;

  const galleryStyle = document.createElement('style');
  galleryStyle.textContent = `
    #students.student-section{background:linear-gradient(180deg,#f6fbf8,#eef7f2)}
    .student-gallery-frame{margin-top:24px;background:#fff;border-radius:28px;overflow:hidden;border:1px solid rgba(0,108,53,.14);box-shadow:0 16px 45px rgba(0,71,38,.09)}
    .student-gallery-head{padding:15px 18px;background:linear-gradient(90deg,#006c35,#008a4b);color:#fff;text-align:center}
    .student-gallery-head strong{display:block;font-size:1.05rem}
    .student-gallery-head span{display:block;font-size:.82rem;opacity:.9;margin-top:2px}
    .student-gallery-frame iframe{width:100%;height:760px;border:0;background:#f4f7f5;display:block}
    @media(max-width:760px){
      .student-gallery-frame iframe{height:72vh;min-height:540px}
    }
  `;
  document.head.appendChild(galleryStyle);

  const folderId = '1WfxljrfWRWcDCARuNLoHOfUq31a7YyNa';
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;

  students.innerHTML = `
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="eyebrow">إبداعات طلابنا</div>
          <h2>معرض الأعمال الوطنية</h2>
        </div>
        <p class="lead">تصفح أعمال الطلاب مباشرة داخل المجلة.</p>
      </div>

      <div class="student-gallery-frame">
        <div class="student-gallery-head">
          <strong>أعمال طلاب مدرسة الإمام الشوكاني الابتدائية بالمذنب</strong>
          <span>اليوم الوطني السعودي 96</span>
        </div>
        <iframe src="${embedUrl}" title="معرض أعمال الطلاب" loading="lazy"></iframe>
      </div>
    </div>`;
})();
