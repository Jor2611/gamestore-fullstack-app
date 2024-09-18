import { ConflictException, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager, Repository } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';


interface TransactionOptions {
  isolation?: IsolationLevel;
}

export function Transactional(options: TransactionOptions = { isolation: 'READ COMMITTED' }) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const repository: Repository<any> = this.repository;
      const configService: ConfigService = this.configService;

      if (!repository) {
        throw new Error('Repository not found in the service');
      }

      if (!configService) {
        throw new Error('ConfigService not found in the service');
      }

      const TRX_LOCK_TIMEOUT = configService.get<string>('PG_TRX_LOCK_TIMEOUT', '3s');

      try {
        return await repository.manager.transaction(
          options.isolation,
          async (entityManager: EntityManager) => {
            await entityManager.query(`SET LOCAL lock_timeout TO '${TRX_LOCK_TIMEOUT}'`);
            
            if (args[args.length - 1] === undefined) {
              args[args.length - 1] = entityManager;
            } else {
              args.push(entityManager);
            }
            return await originalMethod.apply(this, args);
          }
        );
      } catch (err) {
        console.log("Transaction error:", err);

        // Handle database-specific errors
        if (err.code === '23505') {
          throw new ConflictException('ALREADY_USED_INDENTIFIER');
        }
        if (err.code === '23503') {
          throw new ConflictException('FOREIGN_KEY_VIOLATION');
        }
        if (err.code === '40001' || err.code === '40P01') { // Serialization failure or deadlock detected
          throw new ConflictException('CONCURRENT_MODIFICATION_ERROR');
        }
        if (err.code === '55P03') {
          throw new RequestTimeoutException('ROW_LOCKED_FOR_TOO_LONG');
        }

        throw err;
      }
    };

    return descriptor;
  };
}