import "reflect-metadata";
import pg from "pg";
import { DataSource } from "typeorm";
import { DC_Role } from "./models/DC_Role";
import {DC_Server} from "./models/DC_Server";

class TypeOrm {
  private static instance: Promise<DataSource | undefined> | null = null;

  private constructor() {
    // Private constructor to prevent external instantiation
  }
  public static clean(data: any){
    return JSON.parse(JSON.stringify(data));
  }

  public static getDb(): Promise<DataSource | undefined> {
    if (!TypeOrm.instance) {
      TypeOrm.instance = new DataSource({
        type: 'postgres',
        driver: pg,
        entities: [DC_Role, DC_Server],
        synchronize: typeof process.env.SYNCDB !== 'undefined',

        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),

        database: process.env.DB,

        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }).initialize()
        .then((fulfilled) => {
          console.info('Data Source has been initialized!');
          return fulfilled;
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
          return undefined;
        });
    }
    return TypeOrm.instance;
  }
}

export default TypeOrm;

