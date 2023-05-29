const toLocaleIsoString = (datetime) => {
    var date = toLocalIsoDate(datetime);
    var time = toLocalTime(datetime);
    return date + "T" + time;
}

const toLocalTime = (datetime) => {
    var utcDatetime = new Date(datetime);
    const timeOptions = {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    };
    return utcDatetime
        .toLocaleTimeString("it-IT", timeOptions);
}

const toLocalDate = (datetime) => {
    return  new Date(datetime).toLocaleDateString();
}

const toLocalDatetime = (datetime) => {
    return  toLocalDate(datetime) + ", " + toLocalTime(datetime);
}

const toLocalIsoDate = (datetime) => {
    var utcDatetime = new Date(datetime);

    const dateOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };

    return utcDatetime
        .toLocaleDateString("en-CA", dateOptions);
}


export { toLocaleIsoString, toLocalTime, toLocalIsoDate, toLocalDate, toLocalDatetime }