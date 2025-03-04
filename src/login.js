document.getElementById('signupTab').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginFormContainer').classList.add('hidden');
    document.getElementById('signupFormContainer').classList.remove('hidden');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupTab').classList.add('active');
  });
  
  document.getElementById('loginTab').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signupFormContainer').classList.add('hidden');
    document.getElementById('loginFormContainer').classList.remove('hidden');
    document.getElementById('signupTab').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
  });

  function loginUser(e){
    e.preventDefault();
    // Handle login logic here
    localStorage.setItem('loggedIn', true);
    window.location.href = 'index.html';
  }

  function signupUser(e){
    e.preventDefault();
    // Handle signup logic here
    localStorage.setItem('loggedIn', true);
    window.location.href = 'index.html';
  }

  document.getElementById('loginForm').addEventListener('submit', loginUser);
  document.getElementById('signupForm').addEventListener('submit', signupUser);