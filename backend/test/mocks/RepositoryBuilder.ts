import { 
  EntityManager, 
  EntityTarget, 
  FindOneOptions, 
  FindOptionsWhere, 
  ObjectLiteral, 
  SelectQueryBuilder
} from "typeorm";
import { Account } from "../../src/account/account.entity";
import { Game } from "../../src/game/game.entity";
import { Genre } from "../../src/genre/genre.entity";
import { Platform } from "../../src/platform/platform.entity";

type AppEntities = Account | Game | Genre | Platform; 

interface ICollections {
  accounts?: Account[];
  games?: Game [];
  genres?: Genre[];
  platforms?: Platform[];
}

const collectionMap = new Map<any, keyof ICollections>([
  [Game, 'games'],
  [Account, 'accounts'],
  [Genre, 'genres'],
  [Platform, 'platforms']
]);

interface IRepositoryMock {
  withEntityManager(): IRepositoryMock;
  withQueryBuilder(): IRepositoryMock;
  build(): IRepositoryMockBuild;
}

interface IRepositoryMockBuild {
  collections: jest.Mock<any, any, any>;
  collection: jest.Mock<any, any, any>;
  find: jest.Mock<any, any, any>;
  findBy: jest.Mock<any, any, any>;
  findOne: jest.Mock<any, any, any>;
  create: jest.Mock<any, any, any>;
  save: jest.Mock<any, any, any>;
  remove: jest.Mock<any, any, any>;
  manager?: { transaction: jest.Mock<any, any, any> };
  entityManagerMock?: Partial<EntityManager>;
  createQueryBuilder?: jest.Mock<any,any,any>;
  queryBuilderMock? : SelectQueryBuilder<any>;
  seedCollections: (collections: ICollections) => ICollections;
  resetData: () => void;
}

export class RepositoryMock<T extends AppEntities> implements IRepositoryMock {
  private collections: ICollections = {};
  private entityManagerMock: Partial<EntityManager>;
  private queryBuilderMock: SelectQueryBuilder<T>;
  private skipValue: number;
  private takeValue: number;

  get collection(): T[] {
    const collectionName = collectionMap.get(this.entityTarget);
    return this.collections[collectionName] as T[];
  }

  constructor(private entityTarget: EntityTarget<T>){
    const collectionName = collectionMap.get(entityTarget);
    this.collections[collectionName] = [];
  }

  withQueryBuilder(): IRepositoryMock {
    this.queryBuilderMock = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      skip: jest.fn().mockImplementation((value: number) => {
        this.skipValue = value;
        return this.queryBuilderMock;
      }),
      take: jest.fn().mockImplementation((value: number) => {
        this.takeValue = value;
        return this.queryBuilderMock;
      }),
      getMany: jest.fn().mockImplementation(() => {
        return Promise.resolve(this.collection.slice(this.skipValue, this.skipValue + this.takeValue));
      }),
      getCount: jest.fn().mockImplementation(() => {
        return Promise.resolve(this.collection.length);
      }),
    } as unknown as SelectQueryBuilder<T>;
    return this;
  }

  withEntityManager(): IRepositoryMock {
    this.entityManagerMock = {
      query: jest.fn(),
      findOne: jest.fn().mockImplementation(async<T extends AppEntities>(target: EntityTarget<T>, opts: FindOneOptions<T>): Promise<T | null> => {
        const collectionName = collectionMap.get(target);
        if(!collectionName || !this.collections[collectionName]) return null;
        const [[key,value]]= Object.entries(opts.where);
        return this.collections[collectionName].find((_entity) => _entity[key] === value) as T || null;
      }),
      findOneBy: jest.fn().mockImplementation(async <T extends AppEntities>(target: EntityTarget<T>, where: FindOptionsWhere<T>): Promise<T | null> => {
        const collectionName = collectionMap.get(target);
        if(!collectionName || !this.collections[collectionName]) return null;
        const [[key,value]]= Object.entries(where);
        return this.collections[collectionName].find((_entity) => _entity[key] === value) as T || null; 
      }), 
      findBy: jest.fn().mockImplementation(async <T extends AppEntities>(target: EntityTarget<T>, where: FindOptionsWhere<T>): Promise<T[]> => {
        const collectionName = collectionMap.get(target);
        if(!collectionName || !this.collections[collectionName]) return [];
        const ids = (where.id as any)._value; 
        return this.collections[collectionName].filter(_entity => ids.includes(_entity.id)) as T[]; 
      }),
      create: jest.fn().mockImplementation(<T extends AppEntities>(_: EntityTarget<T>, entityData: Object): T => ({ ...entityData } as T)),
      save: jest.fn().mockImplementation(async<T extends AppEntities>(target: EntityTarget<T>, entityData: T): Promise<T> => {
        const collectionName = collectionMap.get(target);
        if(!collectionName || !this.collections[collectionName]) return null;
        const collection = this.collections[collectionName] as T[];
  
        const entityIndex = collection.indexOf(entityData);
        const processDate = new Date();
        if(entityIndex > -1){
          Object.assign(collection[entityIndex], { ...entityData, updatedAt: processDate });
          return collection[entityIndex];
        } else {
          const newGame = { id: Math.floor(Math.random() * 10000) + 31, ...entityData, createdAt: processDate, updatedAt: processDate };
          collection.push(newGame);
          return newGame;
        }
      })
    }
    return this;
  }

  build(): IRepositoryMockBuild {
    let repositoryMockBuild: IRepositoryMockBuild = {
      collections: jest.fn().mockImplementation(async(): Promise<ICollections> => this.collections), 
      collection: jest.fn().mockImplementation(async(): Promise<T[]> => this.collection),
      find: jest.fn().mockImplementation(async(): Promise<T[]> => this.collection),
      findOne: jest.fn().mockImplementation(async(opts: FindOneOptions<T>): Promise<T | null> => {
        const [[key,value]]= Object.entries(opts.where);
        let entity = this.collection.find(_entity => _entity[key] === value) || null;

        if(entity && opts.relations){
          /*If relations provided forcing dev to provide as an array of strings only*/
          if(!Array.isArray(opts.relations)) throw new Error("Please provide relations as an Array of strings!");
          
          opts.relations.forEach((_rel: string) => {
            if(this.collections[_rel]) entity = {...entity, [_rel]: this.collections[_rel]};
          });
        }

        return entity;
      }),
      findBy: jest.fn().mockImplementation(async(where: FindOptionsWhere<T>): Promise<T[]> => {
        const ids = (where.id as any)._value; 
        return this.collection.filter(_entity =>  ids.includes(_entity.id)); 
      }),
      create: jest.fn().mockImplementation((entityData: ObjectLiteral): T => entityData as T),
      save: jest.fn().mockImplementation(async(entityData: T): Promise<T> => {
        const entityIndex = this.collection.indexOf(entityData);
        const processDate = new Date();
        if(entityIndex > -1){
          Object.assign(this.collection[entityIndex], { ...entityData, updatedAt: processDate });
          return this.collection[entityIndex];
        } else {
          const newGame = { id: Math.floor(Math.random() * 10000), ...entityData, createdAt: processDate, updatedAt: processDate };
          const entityCollection = this.collections[collectionMap.get(this.entityTarget)] as T[]
          entityCollection.push(newGame);
          return newGame;
        }
      }),
      remove:  jest.fn().mockImplementation(async(entity: T): Promise<T> => {
        const collectionName = collectionMap.get(this.entityTarget);
        let entityCollection = this.collections[collectionName] as T[];
        const entityIndex = entityCollection.indexOf(entity);
        if(entityIndex > -1){
          entityCollection.splice(entityIndex, 1);
        }
        return entity; /*Actually don't need this, just trying to do close mock to Typeorm interface*/
      }),
      seedCollections: (collections: ICollections): ICollections => { 
        this.collections = collections
        return this.collections;
      },
      resetData: (): void => {
        this.collections = {};
        this.skipValue = undefined;
        this.takeValue = undefined;
      }
    };

    if(this.entityManagerMock) {
      repositoryMockBuild.manager = { transaction: jest.fn().mockImplementation(cb => cb(this.entityManagerMock)) }
      repositoryMockBuild.entityManagerMock = this.entityManagerMock;
    }

    if(this.queryBuilderMock) {
      repositoryMockBuild.createQueryBuilder = jest.fn().mockImplementation((_: string) => this.queryBuilderMock);
      repositoryMockBuild.queryBuilderMock = this.queryBuilderMock;
    }

    return repositoryMockBuild;
  }
} 


