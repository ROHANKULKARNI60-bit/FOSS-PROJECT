// ─── State ──────────────────────────────────────────────
let registeredUsers = []; // [{name, email, phone, sap, branch, year, password}]

// ─── Tab Switching ───────────────────────────────────────
function switchTab(tab) {
  document.getElementById('panelRegister').classList.toggle('active', tab === 'register');
  document.getElementById('panelLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  clearErrors();
  hideStatuses();
  resetLoginBtn();
}

// ─── Utilities ───────────────────────────────────────────
function val(id) { return document.getElementById(id).value.trim(); }

function setError(fieldId, errId, show) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errId);
  field.classList.toggle('error', show);
  err.classList.toggle('show', show);
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('input, select').forEach(e => e.classList.remove('error'));
}

function hideStatuses() {
  document.querySelectorAll('.status-msg').forEach(e => e.classList.remove('show'));
}

function resetLoginBtn() {
  const btn = document.getElementById('btn-login');
  btn.textContent = 'Request Access';
  btn.className = 'btn-submit';
  btn.disabled = false;
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.innerHTML = isText
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
}

// ─── Registration ────────────────────────────────────────
function handleRegister() {
  clearErrors();
  hideStatuses();

  const name     = val('reg-name');
  const email    = val('reg-email');
  const phone    = val('reg-phone');
  const sap      = val('reg-sap');
  const branch   = val('reg-branch');
  const year     = val('reg-year');
  const password = val('reg-password');

  let valid = true;

  if (!name) { setError('reg-name', 'err-reg-name', true); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('reg-email', 'err-reg-email', true); valid = false;
  }
  if (!phone || !/^\+?[\d\s\-]{10,14}$/.test(phone.replace(/\s/g, ''))) {
    setError('reg-phone', 'err-reg-phone', true); valid = false;
  }
  if (!sap) { setError('reg-sap', 'err-reg-sap', true); valid = false; }
  if (!branch) { setError('reg-branch', 'err-reg-branch', true); valid = false; }
  if (!year) { setError('reg-year', 'err-reg-year', true); valid = false; }
  if (!password || password.length < 6) {
    setError('reg-password', 'err-reg-password', true); valid = false;
  }

  if (!valid) return;

  // Store user
  registeredUsers.push({ name, email, phone, sap, branch, year, password });

  const btn = document.getElementById('btn-register');
  const msg = document.getElementById('status-register');

  btn.textContent = 'Registered ✓';
  btn.classList.add('success');
  btn.disabled = true;
  msg.classList.add('show', 'success');
}

// ─── Login ───────────────────────────────────────────────
function handleLogin() {
  clearErrors();
  hideStatuses();

  const sap      = val('login-sap');
  const email    = val('login-email');
  const password = val('login-password');

  let valid = true;

  if (!sap) { setError('login-sap', 'err-login-sap', true); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('login-email', 'err-login-email', true); valid = false;
  }
  if (!password) { setError('login-password', 'err-login-password', true); valid = false; }

  if (!valid) return;

  const btn     = document.getElementById('btn-login');
  const success = document.getElementById('status-login-success');
  const fail    = document.getElementById('status-login-fail');

  const user = registeredUsers.find(u =>
    u.sap === sap && u.email === email && u.password === password
  );

  if (user) {
    btn.textContent = 'Access Granted ✓';
    btn.classList.add('granted');
    btn.disabled = true;
    success.classList.add('show', 'success');
  } else {
    btn.textContent = 'Retry';
    btn.className = 'btn-submit retry';
    fail.classList.add('show', 'error');
    setTimeout(() => {
      btn.textContent = 'Request Access';
      btn.className = 'btn-submit';
      btn.disabled = false;
    }, 2500);
  }
}

// ─── Remove error on input ───────────────────────────────
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errEl = document.getElementById('err-' + el.id);
    if (errEl) errEl.classList.remove('show');
  });
});
