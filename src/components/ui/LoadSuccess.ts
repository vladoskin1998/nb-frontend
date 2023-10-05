export const success = (): void => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Success';

    messageDiv.classList.add('success-message');

    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '0';
    messageDiv.style.left = '0';
    messageDiv.style.fontSize = '25px';
    messageDiv.style.width = '100%';
    messageDiv.style.height = '100%';
    messageDiv.style.backgroundColor = 'rgb(125 143 179 / 66%)';
    messageDiv.style.color = 'green';
    messageDiv.style.display = 'flex';
    messageDiv.style.alignItems = 'center';
    messageDiv.style.justifyContent = 'center';
    messageDiv.style.zIndex = '9999';

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 1500);
  }
  