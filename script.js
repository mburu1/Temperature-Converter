// Get DOM elements
const temperatureInput = document.getElementById('temperatureInput');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertButton = document.getElementById('convertButton');
const result = document.getElementById('result');
const converterForm = document.getElementById('converterForm');

// Function to check if all fields are filled
function checkFields() {
    const tempValue = temperatureInput.value.trim();
    const fromValue = fromUnit.value;
    const toValue = toUnit.value;
    
    if (tempValue !== '' && fromValue !== '' && toValue !== '') {
        convertButton.disabled = false;
    } else {
        convertButton.disabled = true;
    }
}

// Add event listeners to input fields
temperatureInput.addEventListener('input', checkFields);
fromUnit.addEventListener('change', checkFields);
toUnit.addEventListener('change', checkFields);

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return ((fahrenheit - 32) * 5/9) + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5) + 32;
}

// Main conversion function
function convertTemperature(temp, from, to) {
    // If same unit, return as is
    if (from === to) {
        return parseFloat(temp).toFixed(2);
    }
    
    // Convert to Celsius first (as intermediate step)
    let celsius;
    if (from === 'Celsius') {
        celsius = parseFloat(temp);
    } else if (from === 'Fahrenheit') {
        celsius = fahrenheitToCelsius(parseFloat(temp));
    } else if (from === 'Kelvin') {
        celsius = kelvinToCelsius(parseFloat(temp));
    }
    
    // Convert from Celsius to target unit
    let result;
    if (to === 'Celsius') {
        result = celsius;
    } else if (to === 'Fahrenheit') {
        result = celsiusToFahrenheit(celsius);
    } else if (to === 'Kelvin') {
        result = celsiusToKelvin(celsius);
    }
    
    return result.toFixed(2);
}

// Handle form submission
converterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const temp = temperatureInput.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    
    if (temp && from && to) {
        const convertedTemp = convertTemperature(temp, from, to);
        result.textContent = `${temp} ${from} is ${convertedTemp} ${to}`;
    }
});

