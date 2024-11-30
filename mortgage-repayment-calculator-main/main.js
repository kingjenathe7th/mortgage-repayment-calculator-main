
// Adds an event listener to each radio input of class 'radio-type'
document.querySelectorAll('.radio-type').forEach(input => {
    input.addEventListener('change', function () {
        // Removes the 'selected' class from all elements with the 'radio-inputs' class
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected')
        })

        // Adds the 'selected' class to the closest grandparent container (with a specific class)
        if (this.checked) {
            const grandparent = this.closest('.radio-inputs'); // Use closest instead of parentElement.parentElement
            if (grandparent) {
                grandparent.classList.add('selected');
            }
        };
    });
});


// Selects the result text and calculation container elements
const resultText = document.querySelector('.result-text');
const calculationContainer = document.querySelector('.calculations-container');



// Adds an event listener to the calculate button
function calculateMortgage() {

    // Retrieves and parses the form input values
    const amount = parseFloat(document.querySelector('.mortage-amount').value)
    const term = parseFloat(document.querySelector('.mortage-term').value)
    const rate = parseFloat(document.querySelector('.interest-rate').value) / 100;
    const mortageType = document.querySelector('input[name = "mortage-type"]:checked');

    let isValid = true;

    // Removes the 'error' class from all elements with the 'form-flex' class
    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    });

    // Validates the amount input
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('amount-alert').style.display = 'block';
        document.getElementById('mortage-amount-main').classList.add('error');
        isValid = false
    } else {
        document.getElementById('amount-alert').style.display = 'none'
    }

    // Validates the term input
    if (isNaN(term) || term <= 0) {
        document.getElementById('term-alert').style.display = 'block';
        document.getElementById('mortage-term-main').classList.add('error');
        isValid = false
    } else {
        document.getElementById('term-alert').style.display = 'none';
    }

    // Validates the rate input
    if (isNaN(rate) || rate <= 0) {
        document.getElementById('rate-alert').style.display = 'block';
        document.getElementById('interest-rate-main').classList.add('error');
        isValid = false
    } else {
        document.getElementById('rate-alert').style.display = 'none';
    }

    // Validates the mortgage type input
    if (!mortageType) {
        document.getElementById('type-alert').style.display = 'block';
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error')
        })
        isValid = false;
    } else {
        document.getElementById('type-alert').style.display = 'none';
    }

    // If all inputs are valid, calculate and display the results
    if (isValid) {
        let monthlyPayment = 0;
        let totalRepayment = 0;

        resultText.classList.add('hide');
        calculationContainer.classList.add('show');

        // Calculates monthly payment and total repayment based on mortgage type
        if (mortageType.value === 'repayment') {
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), - n));
            totalRepayment = monthlyPayment * n;

        } else if (mortageType.value === 'interest-only') {
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * term * 12;
        };

        // Displays the calculation results
        document.querySelector('.monthly-results').innerText = `$${monthlyPayment.toFixed(2)}`;
        document.querySelector('.term-result').innerText = `$${monthlyPayment.toFixed(2)}`;

    } else {
        // Clears the calculation results if inputs are invalid
        document.querySelector(`.monthly-results`).innerText = '';
        document.querySelector(`.term-result`).innerText = '';

        resultText.classList.remove('hide');
        calculationContainer.classList.remove('show');

    };
};


// Event listener for the calculate button (runs on button click)
document.querySelector('.calculate-btn').addEventListener('click', (event) => {
    event.preventDefault();
    calculateMortgage();
});



// // Event listener for radio buttons to recalculate when mortgage type changes
// document.querySelectorAll('input[name="mortage-type"]').forEach(radio => {
//     radio.addEventListener('change', updateMortage);
// });


// Adds an event listener to the clear button to reset the form
document.querySelector('.clear-btn').addEventListener('click', () => {
    document.querySelector('.mortage-form').reset();
    document.querySelector('.monthly-results').innerText = '';
    document.querySelector('.term-result').innerText = '';
    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none';
    });

    resultText.classList.remove('hide');
    calculationContainer.classList.remove('show');

    document.querySelectorAll('input[name="mortage-type"]').forEach(input => {
        input.checked = false;
    });

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    });

    // Removes the 'selected' class from all elements with the 'radio-inputs' class
    document.querySelectorAll('.radio-inputs').forEach(div => {
        div.classList.remove('selected');
    })

    // Removes the 'error' class from all elements with the 'form-flex' class
    document.querySelectorAll('form-flex').forEach(el => {
        el.classList.remove('error');
    });

});

// Hides all alert elements on page load
document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none';
});
