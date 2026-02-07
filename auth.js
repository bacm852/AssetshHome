// =========================================
// ASSETSHOME AUTH SYSTEM v1.0
// =========================================

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTabSwitcher();
  initPasswordToggles();
  initForms();
  initSocialButtons();
});

// =========================================
// PARTICLES INITIALIZATION
// =========================================

function initParticles() {
  if (typeof particlesJS !== 'undefined') {
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
}

// =========================================
// TAB SWITCHER
// =========================================

function initTabSwitcher() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.auth-form');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Update active tab button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active form
      forms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${targetTab}Form`) {
          form.classList.add('active');
        }
      });

      showToast(`Switched to ${targetTab === 'login' ? 'Login' : 'Sign Up'}`, '🔄');
    });
  });
}

// =========================================
// PASSWORD TOGGLES
// =========================================

function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.password-toggle');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);

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

// =========================================
// FORM HANDLERS
// =========================================

function initForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const continueBtn = document.getElementById('continueBtn');

  // Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Signup Form
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Continue Button
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      // Redirect to library page
      window.location.href = 'library.html';
    });
  }

  // Forgot Password Link
  const forgotLink = document.querySelector('.forgot-link');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link sent to your email!', '✉️');
    });
  }
}

// =========================================
// LOGIN HANDLER
// =========================================

function handleLogin(e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector('input[type="text"]').value;
  const password = form.querySelector('input[type="password"]').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Validation
  if (!email || !password) {
    showToast('Please fill in all fields', '❌');
    return;
  }

  // Show loading
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> LOGGING IN...';

  // Simulate API call
  setTimeout(() => {
    // Success
    showToast('Login successful! Welcome back! 🎉', '✓');

    // Save session
    if (rememberMe) {
      localStorage.setItem('assetsHomeUser', JSON.stringify({
        email: email,
        loggedIn: true,
        timestamp: Date.now()
      }));
    } else {
      sessionStorage.setItem('assetsHomeUser', JSON.stringify({
        email: email,
        loggedIn: true
      }));
    }

    // Redirect to library
    setTimeout(() => {
      window.location.href = 'library.html';
    }, 1500);
  }, 2000);
}

// =========================================
// SIGNUP HANDLER
// =========================================

function handleSignup(e) {
  e.preventDefault();

  const form = e.target;
  const username = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('#signupPassword').value;
  const confirmPassword = form.querySelector('#confirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    showToast('Please fill in all fields', '❌');
    return;
  }

  if (!agreeTerms) {
    showToast('You must agree to the terms and conditions', '❌');
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

  // Show loading
  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> CREATING ACCOUNT...';

  // Simulate API call
  setTimeout(() => {
    // Success - Show success screen
    form.style.display = 'none';
    const successScreen = document.getElementById('successScreen');
    successScreen.classList.add('active');

    // Save user data
    localStorage.setItem('assetsHomeUser', JSON.stringify({
      username: username,
      email: email,
      loggedIn: true,
      timestamp: Date.now()
    }));

    showToast('Account created successfully! 🎉', '✓');
  }, 2500);
}

// =========================================
// SOCIAL LOGIN
// =========================================

function initSocialButtons() {
  const socialBtns = document.querySelectorAll('.social-btn');

  socialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.textContent.includes('Google') ? 'Google' : 'Discord';
      
      showToast(`Connecting to ${provider}...`, '🔄');

      // Simulate social login
      setTimeout(() => {
        showToast(`${provider} login successful! 🎉`, '✓');
        
        // Save session
        localStorage.setItem('assetsHomeUser', JSON.stringify({
          provider: provider,
          loggedIn: true,
          timestamp: Date.now()
        }));

        // Redirect
        setTimeout(() => {
          window.location.href = 'library.html';
        }, 1500);
      }, 2000);
    });
  });
}

// =========================================
// TOAST NOTIFICATION
// =========================================

let toastTimeout;

function showToast(message, icon = '✓') {
  const toast = document.getElementById('toast');
  const toastIcon = toast.querySelector('.toast-icon');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast) return;

  // Clear existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Update content
  toastIcon.textContent = icon;
  toastMessage.textContent = message;

  // Show toast
  toast.classList.add('show');

  // Auto hide
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// =========================================
// CHECK EXISTING SESSION
// =========================================

window.addEventListener('load', () => {
  const savedUser = localStorage.getItem('assetsHomeUser') || sessionStorage.getItem('assetsHomeUser');

  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      if (userData.loggedIn) {
        // User is already logged in, redirect to library
        showToast('Welcome back! Redirecting...', '👋');
        setTimeout(() => {
          window.location.href = 'library.html';
        }, 1500);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
});

// =========================================
// UTILITY FUNCTIONS
// =========================================

// Spinner CSS (added dynamically if needed)
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-top: 3px solid #000;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

console.log('%c📦 AssetsHome Auth System v1.0', 'color: #00ffcc; font-size: 18px; font-weight: bold;');
console.log('%cAuthentication system loaded successfully', 'color: #008cff; font-size: 14px;');
