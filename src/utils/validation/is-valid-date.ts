import { D } from "@faker-js/faker/dist/airline-BLb3y-7w";

export function isValidDate(dateString: Date): boolean {
    const date = new Date(dateString);
    return  !isNaN(date.getTime());
}