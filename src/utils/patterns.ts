// Паттерн для телефона
export const phonePattern = /^(?:\+?3?8?0?)?(\d{9})$/;

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

export const isPasswordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/

export const inNotEmpty = /^.+$/


export const isEmptyFiledsObject = (obj: any) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (!obj[key]) {
            return false;
          }
        }
      }
  
      return true;
}