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
        if (data === '' || data === null) {
            year = ''
        } else {
            year = year + data[i];
        }
    }

    for (let i = 5; i < 7; i++) {
        if (data === '' || data === null) {
            mounth = ''
        } else {
            mounth = mounth + data[i];
        }
    }

    for (let i = 8; i < 10; i++) {
        if (data === '' || data === null) {
            day = ''
        } else {
            day = day + data[i];
        }
    }

    mounthWord = mounthConverter(mounth);
    dayWord = dayConverter(day);
    dataWord = dataWord + dayWord + ' ' + mounthWord + ', ' + year;

    return dataWord;
}

export const textTransform = (text) => {
    let textWord = '';

    if (text === null ) {
        textWord = 'Go to the resource to learn more';
    } else
    if (text === undefined) {
        textWord = 'Go to the resource to learn more';
    } else
    if (text.length >= 145) {
        textWord = textWord + text.substring(0, 140) + '...';
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

export const keyWordTransform = (word) => {
    return (word[0].toUpperCase() + word.substr(1));
}

export const endingTransform = (n) => {
    if (n < 10) {
        if (n === 1) {
            return "сохраненная статья";
        }
        if (n === 2 || n === 3 || n === 4) {
            return "сохраненных статьи";
        }
        if (n === 5 || n === 6 || n === 7 || n === 8 || n === 9 || n === 0) {
            return "сохраненных статей";
        }
    }
    if (n%10 === 1) {
        return "сохраненная статья";
    }
    if (n%10 === 2 || n%10 === 3 || n%10 === 4) {
        return "сохраненныx статьи";
    }
    if (n%10 === 5 || n%10 === 6 || n%10 === 7 || n%10 === 8 || n%10 === 9 || n%10 === 0) {
        return "сохраненных статей";
    }
}

