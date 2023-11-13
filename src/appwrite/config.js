import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create item
  async createItem({
    title,
    desc,
    featuredImage,
    isVeg,
    staus,
    userId,
    restName,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          desc,
          featuredImage,
          isVeg,
          staus,
          userId,
          restName,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createItem :: error", error);
    }
  }

  //update the item
  async updateItem(
    id,
    { title, desc, featuredImage, isVeg, staus, userId, restName }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        { title, desc, featuredImage, isVeg, staus, userId, restName }
      );
    } catch (error) {
      console.log("Appwrite Service :: updateItem :: error", error);
    }
  }

  //delete item
  async deleteItem(id) {
    try {
      await this.databases.deleteDocument(id);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteItem :: error", error);
      return false;
    }
  }

  //get item
  async getItem(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite Service :: getItem :: error", error);
      return false;
    }
  }

  //get items
  async getItems(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service :: getItems :: error", error);
      return false;
    }
  }

  //file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }

  //delete file
  async deleteFile(id) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, id);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  //getting preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(fileId);
  }

  //TODO: Restaurant Details service
  async createRest({userId,restName}) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteRestCollectionId,
        ID.unique(),
        {userId,restName}
      );
    } catch (error) {
      console.log("Appwrite Service :: createRest :: error", error);
    }
  }
  async updateRest(id, { city, img, userId, restName }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteRestCollectionId,
        id,
        { city, img, userId, restName }
      );
    } catch (error) {
      console.log("Appwrite Service :: updateRest :: error", error);
    }
  }
}

const service = new Service();
export default service;
