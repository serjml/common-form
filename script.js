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

  validateField(fieldControlElement) {
    const errors = fieldControlElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElement));
      }
    });
  }

  onBlur(event) {
    const { target } = event;

    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required;

    if (isFormField && isRequired) {
      validateField(target);
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
  }
}

new FormsValidation();
