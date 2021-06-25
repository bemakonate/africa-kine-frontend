

export const formatNumber = (num) => {
    if (!num) {
        num = 0;
    }
    return parseFloat(num).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export const updatedObj = (oldObj, updatedValues) => {
    return {
        ...oldObj,
        ...updatedValues,
    }
}



export const formatPhoneNum = (phoneNumberString, returnBasic = false) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match && returnBasic) {
        return match[2] + '-' + match[3] + '-' + match[4];
    }
    else if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }

    return null
}



export const shortenText = (str, max) => {
    if (!str) {
        return null;
    }
    else if (str.length > max) {
        return `${str.substring(0, max)}...`;
    }
    return str;

}
