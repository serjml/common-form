class FormsValidation {
  selectors = {
    form: '[data-js-form]',
    firldErrors: '[data-js-form-field-errors]',
  };

  errorMessages = {
    valueMissing: () => 'Please fill in this field',
    patternMismatch: ({ title }) => title || 'The data does not match the format',
    tooShort: ({ minLength }) => `Value too short, minimum number of characters — ${minLength}`,
    tooLong: ({ maxLength }) => `Value too long, minimum number of characters — ${maxLength}`,
  };

  constructor() {
    this.bindEvents();
  }

  manageErrors(fieldControlElement, errorMessages) {
    const fieldErrorsElement = fieldControlElement.parentElement.querySelector(
      this.selectors.firldErrors,
    );

    fieldErrorsElement.innerHTML = errorMessages
      .map((message) => `<span class="field__error">${message}</span>`)
      .join('');
  }

  validateField(fieldControlElement) {
    const errors = fieldControlElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElement));
      }
    });

    this.manageErrors(fieldControlElement, errorMessages);
    fieldControlElement.ariaInvalid = errorMessages.length > 0;
  }

  onBlur(event) {
    const { target } = event;

    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required;

    if (isFormField && isRequired) {
      this.validateField(target);
    }
  }

  onChange(event) {
    const { target } = event;

    const isRequired = target.required;
    const isToggleType = ['radio', 'checkbox'].includes(target.type);

    if (isToggleType && isRequired) {
      this.validateField(target);
    }
  }

  bindEvents() {
    document.addEventListener(
      'blur',
      (event) => {
        this.onBlur(event);
      },
      { capture: true },
    );
    document.addEventListener('change', (event) => this.onChange(event));
  }
}

new FormsValidation();
