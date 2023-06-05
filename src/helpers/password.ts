import {compare as compareFn, hash as hashFn} from 'bcrypt'

export async function encrypt(data: string): Promise<string> {
    return hashFn(data, 10);
}

export async function compare(data: string, encrypted: string): Promise<boolean> {
    const result = await compareFn(data, encrypted);
    return result;
}
