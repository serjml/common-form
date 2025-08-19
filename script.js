class FormsValidation {
  selectors = {
    form: '[data-js-form]',
    firldErrors: '[data-js-form-field-errors]',
  };

  constructor() {
    this.bindEvents();
  }

  validateField(fieldControlElement) {}

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
