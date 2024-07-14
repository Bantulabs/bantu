import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.config.database.type as TypeOrmModuleOptions['type'],
      url: this.config.database.url,
      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
      synchronize: true,
      logging: true,
    };
  }
}
