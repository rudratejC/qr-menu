import conf from "../conf/conf";
import { Client,ID,Account } from "appwrite";
import service from "./config";

class AuthService{
    client =new Client();
    account;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client);
    }

    //sign up method
    async createAccount({email, password, name}) {
        try {

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    //login method 
    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    //method for fetching current user
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error)
        }
        return null;
    }

    //logout the user
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error)
        }
    }
}

const authService=new AuthService();

export default authService