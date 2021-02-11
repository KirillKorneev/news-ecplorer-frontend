function mounthConverter(mounth) {
    let mounthWord = '';
    switch(mounth) {
        case '01':  
            mounthWord = 'января';
            break;
        case '02':  
            mounthWord = 'февраля';
            break;
        case '03':
            mounthWord = 'марта';
            break;
        case '04':
            mounthWord = 'апреля';
            break;
        case '05':
            mounthWord = 'мая';
            break;
        case '06':
            mounthWord = 'июня';
            break;
        case '07':
            mounthWord = 'июля';
            break;
        case '08':
            mounthWord = 'августа';
            break;
        case '09':
            mounthWord = 'сентября';
            break;
        case '10':
            mounthWord = 'октября';
            break;
        case '11':
            mounthWord = 'ноября';
            break;
        case '12':
            mounthWord = 'декабря';
            break;
      }

      return mounthWord;
}

function dayConverter(day) {
    let dayWord = '';

    if (day[0] === '0') {
        dayWord = day[1];
    }
    else {
        dayWord = day;
    }

    return dayWord;
}

export const dataTransform = (data) => {
    let year = '';
    let mounth = '';
    let day = '';

    let mounthWord = '';
    let dayWord = '';

    let dataWord = '';

    for (let i = 0; i < 4; i++) {
        year = year + data[i];
    }

    for (let i = 5; i < 7; i++) {
        mounth = mounth + data[i];
    }

    for (let i = 8; i < 10; i++) {
        day = day + data[i];
    }

    mounthWord = mounthConverter(mounth);
    dayWord = dayConverter(day);
    dataWord = dataWord + dayWord + ' ' + mounthWord + ', ' + year;

    return dataWord;
}

export const textTransform = (text) => {
    let textWord = '';

    if (text.length >= 145) {
        textWord = textWord + text.substring(0, 145) + '...';
    }
    else {
        textWord = text;
    }

    return textWord;
}

export const titleTransform = (text) => {
    let textWord = '';

    if (text.length >= 55) {
        textWord = textWord + text.substring(0, 45) + '...';
    }
    else {
        textWord = text;
    }

    return textWord;
}


