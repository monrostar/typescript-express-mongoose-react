import * as nconf from "nconf";
import * as path from "path";
import * as winston from "winston";
import Container = require("../../container");

let ConsoleLogger = Container.ConsoleLogger;
let envConfig = process.env.NODE_ENV || "development";

const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, `./config.${envConfig}.json`)
  }
});

ConsoleLogger.log("info", `Worker use ${envConfig} configurations`);

// interfaces
export interface IServerConfigurations {
  cpuCores: any;
  port : number;
  schema : string;
  url : string;
  plugins : Array<string>;
  jwtSecret : string;
  jwtExpiration : string;
  credit: Array<number>;
}

export interface IDataSession {
  secret : string;
  key : string;
  cookie : Array<any>;
  proxy : boolean;
  resave : boolean;
  saveUninitialized : boolean;
}

export interface IDataConfiguration {
  mongodb : {connectionString};
  pg      : {user, database, password, host, port, max, idleTimeoutMillis};
}

export interface IDataMemcached {
  hosts : Array<string>;
  prefix : string;
}

export interface IDataAuth {
  fb : Object;
  vk : Object;
}
//end interfaces

// methods
export function getDatabaseConfig() : IDataConfiguration {
  return configs.get("database");
}

export function getSessionConfigs() : IDataSession {
  return configs.get("session");
}

export function getServerConfigs() : IServerConfigurations {
  return configs.get("app");
}

export function getMemcachedConfigs() : IDataMemcached {
  return configs.get("memcached");
}

export function getAuthConfigs() : IDataMemcached {
  return configs.get("auth");
}