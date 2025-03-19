const app = document.getElementById('app');

function showLoginForm() {
  app.innerHTML = '';
  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';

  const form = document.createElement('form');
  form.innerHTML = `
    <h2>Login</h2>
    <label>Email</label>
    <input type="email" id="email" required>
    <label>Password</label>
    <input type="password" id="password" required>
    <button type="submit">Login</button>
    <div class="link" id="toSignUp">Don't have an account? Sign up</div>
    <div class="error-message" id="errorMessage"></div>
  `;

  formContainer.appendChild(form);
  app.appendChild(formContainer);

  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const errorMessage = form.querySelector('#errorMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    const storedName = localStorage.getItem('userName');

    if (email === storedEmail && password === storedPassword) {
      const now = new Date();
      const timeString = now.toLocaleString();
      alert(`✅ Login successful!\nName: ${storedName}\nEmail: ${storedEmail}\nTime: ${timeString}`);
      localStorage.setItem('isLoggedIn', 'true');
      showWelcomeMessage(storedName, storedEmail);
    } else {
      errorMessage.textContent = 'Invalid login credentials.';
    }
  });

  form.querySelector('#toSignUp').addEventListener('click', showSignUpForm);
}

function showSignUpForm() {
  app.innerHTML = '';
  const formContainer = document.createElement('div');
  formContainer.className = 'form-container';

  const form = document.createElement('form');
  form.innerHTML = `
    <h2>Sign Up</h2>
    <label>Name</label>
    <input type="text" id="name" required>
    <label>Email</label>
    <input type="email" id="email" required>
    <label>Password</label>
    <input type="password" id="password" required>
    <label>Confirm Password</label>
    <input type="password" id="confirmPassword" required>
    <button type="submit">Sign Up</button>
    <div class="link" id="toLogin">Already have an account? Login</div>
    <div class="error-message" id="errorMessage"></div>
  `;

  formContainer.appendChild(form);
  app.appendChild(formContainer);

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const confirmInput = form.querySelector('#confirmPassword');
  const errorMessage = form.querySelector('#errorMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmInput.value.trim();

    [nameInput, emailInput, passwordInput, confirmInput].forEach(i => i.style.borderColor = '#ccc');
    errorMessage.textContent = '';

    if (!name || !email || !password || !confirmPassword) {
      errorMessage.textContent = 'Please fill in all fields.';
      [nameInput, emailInput, passwordInput, confirmInput].forEach(i => {
        if (!i.value.trim()) i.style.borderColor = 'red';
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage.textContent = 'Invalid email format.';
      emailInput.style.borderColor = 'red';
      return;
    }

    if (password.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters.';
      passwordInput.style.borderColor = 'red';
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      confirmInput.style.borderColor = 'red';
      return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    const now = new Date();
    const timeString = now.toLocaleString();
    alert(`✅ Sign up successful at: ${timeString}`);

    showLoginForm();
  });

  form.querySelector('#toLogin').addEventListener('click', showLoginForm);
}

function showWelcomeMessage(name, email) {
  app.innerHTML = '';
  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'welcome-message';

  const msg1 = document.createElement('h2');
  msg1.textContent = `✅ Welcome, ${name} (${email})`;

  const msg2 = document.createElement('p');
  msg2.textContent = '🏢 Welcome to Main Flow Service Technologies';

  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = 'Logout';
  logoutBtn.onclick = () => {
    localStorage.removeItem('isLoggedIn');
    showLoginForm();
  };

  welcomeDiv.appendChild(msg1);
  welcomeDiv.appendChild(msg2);
  welcomeDiv.appendChild(logoutBtn);
  app.appendChild(welcomeDiv);
}

window.onload = function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');

  if (isLoggedIn && name && email) {
    showWelcomeMessage(name, email);
  } else {
    showLoginForm();
  }
};
