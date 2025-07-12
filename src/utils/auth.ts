import bcrypt from 'bcrypt';

export const hassPassword = async (pswd : string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pswd, salt);   
}