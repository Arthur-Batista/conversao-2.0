const decimalInput = document.getElementById('decimal');
const binaryInput = document.getElementById('binary');
const bitsInput = document.getElementById('bits');
const errorMessage = document.getElementById('errorMessage');

function clearBinaryInput() {
    binaryInput.value = '';
}

function clearErrorMessage() {
    errorMessage.textContent = '';
}

function showError(message) {
    errorMessage.textContent = message;
}

function decimalToBinary(decimal, bits) {
    let binary = '';

    if (decimal < 0) {
        decimal = Math.abs(decimal) - 1;
        let complement = '';

        for (let i = 0; i < bits; i++) {
            if (decimal % 2 === 0) {
                complement = '1' + complement;
            } else {
                complement = '0' + complement;
            }
            decimal = Math.floor(decimal / 2);
        }

        binary = complement;
    } else {
        if (decimal >= Math.pow(2, bits - 1) || decimal < -Math.pow(2, bits - 1)) {
            return 'Overflow';
        }

        let absDecimal = decimal;

        for (let i = 0; i < bits; i++) {
            binary = (absDecimal % 2) + binary;
            absDecimal = Math.floor(absDecimal / 2);
        }
    }

    return binary;
}


function binaryToDecimal(binary, bits) {
    if (binary.charAt(0) === '1') {
        let complement = '';
        let carry = true;

        for (let i = binary.length - 1; i >= 0; i--) {
            if (carry) {
                if (binary.charAt(i) === '1') {
                    complement = '0' + complement;
                } else {
                    complement = '1' + complement;
                    carry = false;
                }
            } else {
                complement = binary.charAt(i) + complement;
            }
        }

        binary = complement;
    }

    let decimal = 0;

    for (let i = 0; i < bits; i++) {
        if (binary.charAt(i) === '1') {
            decimal += Math.pow(2, bits - 1 - i);
        }
    }

    return decimal;
}

function convert() {
    clearErrorMessage();
    clearBinaryInput();

    const decimal = parseInt(decimalInput.value);
    const binary = binaryInput.value;
    const bits = parseInt(bitsInput.value);

    if (!isNaN(decimal)) {
        binaryInput.value = decimalToBinary(decimal, bits);
    } else if (/^[01]+$/.test(binary)) {
        decimalInput.value = binaryToDecimal(binary, bits);
    } else {
        showError('Digite um número decimal ou binário válido');
    }
}

decimalInput.addEventListener('input', convert);
binaryInput.addEventListener('input', convert);
bitsInput.addEventListener('input', convert);
