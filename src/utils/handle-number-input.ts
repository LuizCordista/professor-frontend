export const handleNumberInput = (
    value: string,
    setter: (value: string) => void,
    allowDecimals: boolean = false,
    maxLength: number = 3
) => {
    const normalizedValue = value.replace(/,/g, '.');
    
    const validInputRegex = allowDecimals ? /^[0-9.]*$/ : /^[0-9]*$/;
    const sanitizedValue = normalizedValue.replace(/[^0-9.]/g, '');

    if (!validInputRegex.test(sanitizedValue)) {
        return;
    }

    if (sanitizedValue === '') {
        setter('');
        return;
    }

    if (!allowDecimals) {
        const numberValue = sanitizedValue;
        if (numberValue.length <= maxLength) {
            setter(numberValue);
        }
        return;
    }

    const numberValue = sanitizedValue;

    if (/^\d{0,2}(\.\d{0,2})?$/.test(numberValue)) {
        const numValue = parseFloat(numberValue);
        if (!isNaN(numValue) && numValue <= 10) {
            setter(numberValue);
        }
    }
};