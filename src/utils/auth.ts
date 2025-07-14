import bcrypt from 'bcrypt';

// Hashear password
export const hassPassword = async (pswd : string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pswd, salt);   
}

// Comprobar password
export const checkPassword = async (pswd : string, hash : string) => {
    return await bcrypt.compare(pswd, hash);
}