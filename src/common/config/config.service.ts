import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { camelCase } from '../../utils/transform-case';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  public readonly app: { name: string; description: string; version: string };

  constructor() {
    super();
    const packageJson = fs.readFileSync('package.json', 'utf8');
    const { name, description, version } = JSON.parse(packageJson);
    this.app = { name: camelCase(name), description, version };
  }

  get node() {
    const nodeEnv = this.get<string>('NODE_ENV') || 'development';

    return {
      env: nodeEnv,
      isEnv: (env: string | string[]) =>
        typeof env === 'string' ? env === nodeEnv : env.includes(nodeEnv),
    };
  }

  get database() {
    const url = this.getOrThrow<string>('DATABASE_URL');
    const port = this.get<string>('DB_PORT');
    const password = this.get<string>('DB_PASSWORD');

    const parsedUrl = new URL(url);
    if (port) parsedUrl.port = port;
    if (password) parsedUrl.password = password;

    return {
      type: url.replace(/:.*$/, ''),
      url: parsedUrl.toString(),
    };
  }
}
