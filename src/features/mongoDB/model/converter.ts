import { ObjectId } from "mongodb";

export function convertObjectIdToString(obj) {
    if (Array.isArray(obj)) {
        return obj.map((item) => convertObjectIdToString(item));
    } else if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            if (obj[key] instanceof ObjectId) {
                newObj[key] = obj[key].toString(); // Конвертируем ObjectId в строку
            } else {
                newObj[key] = convertObjectIdToString(obj[key]); // Рекурсивно обрабатываем вложенные объекты
            }
        }
        return newObj;
    }
    return obj; // Возвращаем значение, если это не объект или массив
}