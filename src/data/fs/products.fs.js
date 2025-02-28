import { faker } from "@faker-js/faker";
import { readFile } from "fs";
import fs from "fs/promises";

const path = "./src/data/fs/files/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
    this.init();
  }
  async init() {
    try {
      await fs.access(this.path);
    } catch (error) {
      await fs.writeFile(this.path, JSON.stringify([]));
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
  async createMock() {
    try {
      const _id = faker.database.mongodbObjectId();
      const title = faker.commerce.productName();
      const price = faker.commerce.price({ min: 10, max: 500, dec: 2 });
      const stock = faker.number.int({ min: 0, max: 1000 });
      const photo = faker.image.url();
      const category = faker.helpers.arrayElement([
        "ninguna",
        "celulares",
        "computadoras",
        "accesorios",
      ]);
      const newProduct = {
        _id,
        title,
        price,
        stock,
        photo,
        category,
      };
      //una vez contruido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo producto
      dataOfFile.push(newProduct);
      // se sobreescribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno del nuevo producto al cliente
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  async create(data) {
    try {
      const _id = faker.database.mongodbObjectId();
      const newProduct = {
        _id,
        ...data,
      };
      //una vez contruido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo producto
      dataOfFile.push(newProduct);
      // se sobreescribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno del nuevo producto al cliente
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  async readAll(category) {
    try {
      let all = await this.readFile();
      if (category) {
        all = all.filter((each) => each.category === category);
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
      if(!one){
        const error = new Error(`product con id ${id} no encontrado`);
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
        const error = new Error(`Producto con id ${id} no encontrado`);
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
      const index = all.findIndex((product) => product._id === id);
      if (index === -1) {
        const error = new Error(`Producto con id ${id} no encontrado`);
        error.status = 404;
        throw error;
      }
      const [deletedProduct] = all.splice(index, 1)[0];
      await this.writeFile(all);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();

export default productsManager;
