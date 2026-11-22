
function timeConversion(s) {

    let period = s.slice(-2);
    let time = s.slice(0, 8);

    let hour = parseInt(time.slice(0, 2));

    if (period === "AM") {

        if (hour === 12) {
            hour = 0;
        }

    }
    else {

        if (hour !== 12) {
            hour = hour + 12;
        }

    }

    let result = String(hour).padStart(2, '0') + time.slice(2);

    return result;
}
