const TOKEN_CARDS = 'cards';
const TOKEY_WORD = 'keyWord';

export const setKeyWord = (keyWord) => {
    localStorage.setItem(TOKEY_WORD, keyWord);
}

export const getkeyWord = () => localStorage.getItem(TOKEY_WORD);

export const removekeyWord = () => {
    localStorage.removeItem(TOKEY_WORD)
}

export const setCards = (cards) => {
    localStorage.setItem(TOKEN_CARDS, cards);
}
  
export const getCards = () => localStorage.getItem(TOKEN_CARDS);
  
export const removeCards = () => {
    localStorage.removeItem(TOKEN_CARDS)
}