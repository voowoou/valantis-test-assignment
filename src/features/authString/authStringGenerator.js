import md5 from 'md5';

// Получаем полную дату по iso, отделяя всё, что связано со временем, и убираем дефисы между числами
const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
const password = 'Valantis';
const authString = md5(`${password}_${timeStamp}`);

export default authString;
