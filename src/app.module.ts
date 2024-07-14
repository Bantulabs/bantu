import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [PostModule, TagsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
