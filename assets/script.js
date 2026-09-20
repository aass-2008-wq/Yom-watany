const answers = {q1:'a', q2:'b', q3:'a', q4:'c', q5:'a', q6:'a'};
const form = document.getElementById('quizForm');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let score = 0, answered = 0;
  Object.entries(answers).forEach(([q, correct]) => {
    const chosen = form.querySelector(`input[name="${q}"]:checked`);
    if (chosen) {
      answered++;
      if (chosen.value === correct) score++;
    }
  });
  if (answered < 6) {
    resultEl.style.display = 'block';
    resultEl.textContent = 'أكمل جميع الأسئلة أولًا.';
    scoreEl.textContent = '—';
    return;
  }
  scoreEl.textContent = score;
  resultEl.style.display = 'block';
  resultEl.textContent = score === 6 ? 'ممتاز! معلومات وطنية قوية.' : score >= 4 ? 'أحسنت! نتيجة جميلة، راجع سؤالين فقط.' : 'محاولة جيدة. تصفح المجلة ثم أعد الاختبار.';
  resultEl.scrollIntoView({behavior:'smooth', block:'nearest'});
});

document.getElementById('resetQuiz').addEventListener('click', () => {
  form.reset();
  scoreEl.textContent = '—';
  resultEl.style.display = 'none';
});

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 650 ? 'block' : 'none';
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
