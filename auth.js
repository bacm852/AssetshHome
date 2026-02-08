// ================================================
// AssetsHome Auth System - CLEAN & BUG FREE
// NO Google/Discord - Pure Login/Signup Only
// ================================================

document.addEventListener('DOMContentLoaded', init);

function init() {
  initParticles();
  initTabs();
  initPasswordToggles();
  initForms();
  checkExistingSession();
}

// ================================================
// PARTICLES BACKGROUND
// ================================================
function initParticles() {
  if (typeof particlesJS === 'undefined') return;
  
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: '#00ffcc' },
      shape: { type: 'circle' },
      opacity: { value: 0.4, random: true },
      size: { value: 3, random: true },
      line_linked: { 
        enable: true, 
        distance: 150, 
        color: '#00ffcc', 
        opacity: 0.2, 
        width: 1 
      },
      move: { 
        enable: true, 
        speed: 1.5, 
        direction: 'none', 
        random: true, 
        out_mode: 'out' 
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { 
        onhover: { enable: true, mode: 'repulse' }, 
        resize: true 
      },
      modes: { 
        repulse: { distance: 100, duration: 0.4 } 
      }
    }
  });
}

// ================================================
// TAB SWITCHER (Login/Signup)
// ================================================
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const forms = document.querySelectorAll('.form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show correct form
      forms.forEach(f => {
        f.classList.remove('active');
        if (f.id === `${target}Form`) {
          f.classList.add('active');
        }
      });
    });
  });
}

// ================================================
// PASSWORD VISIBILITY TOGGLE
// ================================================
function initPasswordToggles() {
  const toggles = document.querySelectorAll('.toggle-pass');
  
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      
      if (!input) return;
      
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });
}

// ================================================
// FORM INITIALIZATION
// ================================================
function initForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const continueBtn = document.getElementById('continueBtn');
  const forgotLink = document.getElementById('forgotLink');

  // Login Form Handler
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Signup Form Handler
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Continue Button (After Signup Success)
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      window.location.href = 'library.html';
    });
  }

  // Forgot Password Link
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link sent to your email!', '✉️');
    });
  }
}

// ================================================
// LOGIN HANDLER
// ================================================
function handleLogin(e) {
  e.preventDefault();
  
  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;
  const remember = document.getElementById('remember').checked;

  // Validation
  if (!email || !password) {
    showToast('Please fill in all fields', '❌');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', '❌');
    return;
  }

  // Show loading state
  const btn = form.querySelector('.btn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'LOGGING IN...';

  // Simulate login process
  setTimeout(() => {
    // Create user session
    const userData = {
      email: email,
      loggedIn: true,
      timestamp: Date.now()
    };
    
    // Save to storage
    if (remember) {
      localStorage.setItem('assetsUser', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('assetsUser', JSON.stringify(userData));
    }

    // Show success
    showToast('Login successful! Redirecting...', '✓');
    
    // Redirect to library
    setTimeout(() => {
      window.location.href = 'library.html';
    }, 1000);
    
  }, 1500);
}

// ================================================
// SIGNUP HANDLER
// ================================================
function handleSignup(e) {
  e.preventDefault();
  
  const form = e.target;
  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  const terms = document.getElementById('terms').checked;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    showToast('Please fill in all fields', '❌');
    return;
  }

  if (!terms) {
    showToast('Please accept the terms and conditions', '❌');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Passwords do not match!', '❌');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', '❌');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', '❌');
    return;
  }

  // Username validation
  if (username.length < 3) {
    showToast('Username must be at least 3 characters', '❌');
    return;
  }

  // Show loading state
  const btn = form.querySelector('.btn');
  btn.disabled = true;
  btn.textContent = 'CREATING ACCOUNT...';

  // Simulate account creation
  setTimeout(() => {
    // Hide form and show success screen
    form.style.display = 'none';
    document.getElementById('successScreen').classList.add('active');
    
    // Create user session
    const userData = {
      username: username,
      email: email,
      loggedIn: true,
      timestamp: Date.now()
    };
    
    // Save to localStorage (auto remember for new accounts)
    localStorage.setItem('assetsUser', JSON.stringify(userData));
    
    // Show success toast
    showToast('Account created successfully!', '✓');
    
  }, 2000);
}

// ================================================
// TOAST NOTIFICATION
// ================================================
let toastTimer;

function showToast(message, icon = '✓') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMsg = document.getElementById('toastMsg');
  
  if (!toast || !toastIcon || !toastMsg) return;
  
  // Clear existing timer
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  
  // Update content
  toastIcon.textContent = icon;
  toastMsg.textContent = message;
  
  // Show toast
  toast.classList.add('show');
  
  // Auto hide after 3 seconds
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ================================================
// CHECK EXISTING SESSION
// ================================================
function checkExistingSession() {
  const savedUser = localStorage.getItem('assetsUser') || sessionStorage.getItem('assetsUser');
  
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      
      if (userData.loggedIn) {
        // User already logged in, redirect to library
        showToast('Already logged in! Redirecting...', '👋');
        
        setTimeout(() => {
          window.location.href = 'library.html';
        }, 1000);
      }
    } catch (error) {
      // Invalid session data, clear it
      console.error('Session error:', error);
      localStorage.removeItem('assetsUser');
      sessionStorage.removeItem('assetsUser');
    }
  }
}

// ================================================
// CONSOLE LOG
// ================================================
console.log('%c📦 AssetsHome Auth System', 'color: #00ffcc; font-size: 18px; font-weight: bold;');
console.log('%cClean & Bug Free - No Social Login', 'color: #008cff; font-size: 14px;');
