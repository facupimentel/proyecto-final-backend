import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./src/data/fs/files/users.json";

class UsersManager {
  constructor() {
    this.path = path;
    this.init();
  }
  async init() {
    try {
      await fs.access(this.path);
    } catch (error) {
      await fs.writeFile(path, JSON.stringify([]));
    }
  }
  async readFile() {
    try {
      let data = await fs.readFile(this.path);
      data = JSON.parse(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async writeFile(data) {
    try {
      data = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, data);
    } catch (error) {
      throw error;
    }
  }
  async create(data) {
    try {
      const user = {
        _id: faker.database.mongodbObjectId(),
        ...data
      };
      //una vez contruido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo usuario
      dataOfFile.push(user);
      // se sobreescribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno del nuevo usuario al cliente
      return user;
    } catch (error) {
      throw error;
    }
  }
  async createMock () {
    try {
      const fullName = faker.person.fullName().toLowerCase().split(" ");
      const user = {
        _id: faker.database.mongodbObjectId(),
        name: fullName[0],
        lastName: fullName[1],
        email: fullName.join(".") + "@pimentel.com",
        password: "hola1234",
        age: faker.number.int({ min: 18, max: 85 }),
        avatar: faker.image.avatar(),
        role: faker.helpers.arrayElement(["user", "admin", "premium"]),
      };
      //una vez contruido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo usuario
      dataOfFile.push(user);
      // se sobreescribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno del nuevo usuario al cliente
      return user;
    } catch (error) {
      throw error;
    }
  }
  async readAll(role) {
    try {
      let all = await this.readFile()
      if(role){
        all = all.filter((each)=> each.role === role)
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const all = await this.readFile();
      const one = all.find((each) => each._id === id);
      if (!one) {
        const error = new Error(`User con id ${id} no encontrado`);
        error.status = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id, updatedData) {
    try {
      const all = await this.readFile();
      const index = all.findIndex((each) => each._id === id);
      if (index === -1) {
        const error = new Error(`User con id ${id} no encontrado`);
        error.status = 404;
        throw error;
      }
      all[index] = { ...all[index], ...updatedData };
      await this.writeFile(all);
      return all[index];
    } catch (error) {
      throw error;
    }
  }

  async destroyOne(id) {
    try {
      const all = await this.readFile();
      const index = all.findIndex((each) => each._id === id);
     if (index === -1) {
       const error = new Error(`User con id ${id} no encontrado`);
       error.status = 404;
       throw error;
     }
      const deletedUser = all.splice(index, 1)[0];
      await this.writeFile(all);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UsersManager();

export default usersManager;
