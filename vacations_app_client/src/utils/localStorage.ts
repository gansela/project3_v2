export const saveToLocalStorage = (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value))
}