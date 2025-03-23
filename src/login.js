document.getElementById('signupTab').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginFormContainer').classList.add('hidden');
    document.getElementById('signupFormContainer').classList.remove('hidden');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupTab').classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  });
  
  document.getElementById('loginTab').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signupFormContainer').classList.add('hidden');
    document.getElementById('loginFormContainer').classList.remove('hidden');
    document.getElementById('signupTab').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('confirmPassword').style.border = '';
      document.getElementById('confirmPassword').style.color = '';
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

  function checkPassword(){
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if(password.length === 0 || confirmPassword.length === 0){
      document.getElementById('confirmPassword').style.border = '';
      document.getElementById('confirmPassword').style.color = '';
      return;
    }
    if(password !== confirmPassword){
      document.getElementById('confirmPassword').style.border = '1px solid red';
      document.getElementById('confirmPassword').style.color = 'red';
    } else {
      document.getElementById('confirmPassword').style.border = '';
      document.getElementById('confirmPassword').style.color = '';
    }
  }