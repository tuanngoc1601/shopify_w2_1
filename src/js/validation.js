const Validator = (options) => {
    const getParent = (element, selector) => {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Ham thuc hien validate
    const validate = (inputElement, rule) => {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lay rules tu selector
        var rules = selectorRules[rule.selector];

        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lay element form can validate
    var formElement = document.querySelector(options.form);
    if(formElement) {
        // Khi submit
        formElement.onsubmit = (e) => {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach( (rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if(isFormValid) {
                // TH submit voi javascript
                if(typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    options.onSubmit(formValues);

                    // focus
                }
                // TH submit voi hanh vi mac dinh
                else {
                    formElement.submit();
                }
            }


        }

        // L???p qua m???i rule v?? x??? l?? (l???ng nghe s??? ki???n blur, input, ...)
        options.rules.forEach( (rule) => {

            // L??u l???i c??c rules cho m???i input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach( (inputElement) => {
               // X??? l?? tr?????ng h???p blur kh???i input
                inputElement.onblur = () => {
                    validate(inputElement, rule);
                }

                // X??? l?? m???i khi ng?????i d??ng nh???p v??o input
                inputElement.oninput = () => {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }
}


Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Please enter your account name'
        }
    };
}

Validator.minLength = (selector, min, message) => {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Please enter at least ${min} characters`;
        }
    };
}