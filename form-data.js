const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);

  console.log('Name value:', formData.get('example'));
  formData.delete('example');

  console.log(Object.fromEntries(formData));
});
