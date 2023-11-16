export const success = (): void => {
  // Создаем элемент img
  const imageElement = document.createElement('img');

  // Устанавливаем атрибут src
  imageElement.src = '/Images/logo.png'; // Замените на реальный путь к изображению

  // Добавляем класс и стили (ваш код)
  imageElement.classList.add('success-message');
  imageElement.style.position = 'fixed';
  imageElement.style.top = '50%';
  imageElement.style.left = '50%';
  imageElement.style.transform = 'translate(-50%,-50%)';
  imageElement.style.width = '214px';
  imageElement.style.height = '59px';
  // imageElement.style.backgroundColor = 'rgb(125 143 179 / 66%)';
  imageElement.style.zIndex = '9999';

  // Добавляем элемент в body
  document.body.appendChild(imageElement);

  // Устанавливаем таймер для удаления изображения через 750 миллисекунд
  setTimeout(() => {
      document.body.removeChild(imageElement);
  }, 1000);
}
