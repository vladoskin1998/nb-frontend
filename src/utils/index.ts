export const removeFile = (obj: any): any => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        // Рекурсивно вызываем removeFile для вложенных объектов
        obj[key] = removeFile(obj[key]);
      } else if (key === 'file') {
        // Удаляем свойство 'file'
        delete obj[key];
      }
    }
    return obj;
  };