import brcypt from "bcryptjs";

import {User,School,Subject,Grade} from "../models/schemas.js";

export class UsersController {
    async getAll(){
        return await User.findAll({});

    }
    async getAllUsersByRole(role){
        return await User.findAll({
            where: {
                role
            }
        });
    }

    async createUser(userData, schoolDb) {
        const salt = await brcypt.genSalt(10);
        userData.password = await brcypt.hash(userData.password, salt);

        const userDb = await User.create(userData);

        if (schoolDb) {
            await userDb.setSchool(schoolDb);
        }

        return userDb;
    }

    async validPassword(password,userDb){
        try{
            return await brcypt.compare(password,userDb.password);
        }catch(err){
            throw new Error(err);
        }
    }

    async setSchool(userDb,schoolDb){
        if(userDb && schoolDb){
            await userDb.setSchool(schoolDb);
            return true;
        }
        return false;
    }

    async getById(id){
        return await User.findByPk(id);
    }

    async updateById(id,userData){
        const updateUser = await User.update({
            ...userData
        },{
            where: {
                id
            }
        });

        return updateUser
    }

    async getUserByEmail(email){
        return await User.findOne({
            where: {
                email
            }
        })
    }
}