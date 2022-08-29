const getDataForm = (options) => {

    var selectorRules = {};

    const checkValid = (inputElement, rule) => {
        var errorMessage;
        var rules = selectorRules[rule.selector];

        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
        return !errorMessage;
    }

    // get element FormData

    var formElement = document.querySelector(options.form);
    if(formElement) {
        // onsubmit
        formElement.onsubmit = (e) => {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = checkValid(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        values[input.name] = input.value;
                        return values;
                    }, {
                        MAC_Address: '00:1B:44:11:3A:B8',
                        Create_Date: '2021-05-31'
                    });

                    options.onSubmit(formValues, enableInputs);

                    // focus
                }
                // TH submit voi hanh vi mac dinh
                else {
                    formElement.submit();
                }
            }
        }

        options.rules.forEach((rule) => {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
        });
    }
}



// define rules
getDataForm.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message;
        }
    };
}
