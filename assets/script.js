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
