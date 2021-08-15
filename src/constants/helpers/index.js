

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




export const priceRangeToDollars = (arg = 'cheap') => {
    const value = arg.toLowerCase();
    let priceRange = '$';
    switch (value) {
        case 'cheap':
            priceRange = '$';
            break;
        case 'moderate':
            priceRange = '$$';
            break;
        case 'expensive':
            priceRange = "$$$";
            break;
        case 'luxury':
            priceRange = "$$$$";
            break;
    }

    return priceRange;
}



export const getOpeningHoursSpecification = (businessHours) => {
    const openingHoursSpecification = [];

    const openHours = JSON.parse(businessHours.open);
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (const num in openHours) {
        if (!openHours[num]) delete openHours[num]
    }

    for (const num in openHours) {
        openingHoursSpecification.push({
            "@type": "OpeningHoursSpecification",
            "closes": openHours[num][1],
            "dayOfWeek": week[num],
            "opens": openHours[num][0],
        })
    }

    return openingHoursSpecification;

}

export const getMenuItems = (products) => {

    const menuItems = products.map(product => {
        return {
            "@type": "MenuItem",
            "name": product.name,
            "description": product.description,
            "image": product.image ? product.image.url : null,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": product.price ? product.price.toFixed(2) : null,
            }
        }
    })

    return menuItems;
}


export const getRestaurantStructuredData = ({ businessInfo, businessHours, siteURL = process.env.SITE_URL }) => {
    const structuredData = {
        "@context": "http://schema.org",
        "@type": "Restaurant",
        "@id": siteURL,
        "name": businessInfo.companyName,
        "image": businessInfo.companyImage ? businessInfo.companyImage.url : 'null',
        "acceptsReservations": `${siteURL}/contact`,
        "menu": `${siteURL}/menu`,
        "servesCuisine": businessInfo.servesCuisine,
        "telephone": businessInfo.phone,
        "priceRange": priceRangeToDollars(businessInfo.priceRange),
        "url": siteURL,
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "USD",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "2267 7th Ave",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "addressCountry": "US",
            "postalCode": "10030"
        },
        "openingHoursSpecification": getOpeningHoursSpecification(businessHours),
        "potentialAction": {
            "@type": "OrderAction",
            "target": [`${siteURL}/order`],
            "deliveryMethod": [`${siteURL}/order`],
        }
    }

    return structuredData;
}

export const getMenuSections = (categories) => {
    return categories.map(category => {
        return {
            "@type": "MenuSection",
            "name": category.title,
            "description": category.tagline,
            "hasMenuItem": getMenuItems(category.products),
        }
    })
}
