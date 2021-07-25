import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
import { AppResolver } from './resolvers/app.resolver';
import { ConfigModule } from '@nestjs/config';
import config from './configs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CrawlerModule } from './resolvers/crawler/crawler.module';
import { CrawlerVersionModule } from './resolvers/crawlerVersion/crawlerVersion.module';
import { CrawlerStartUrlModule } from './resolvers/crawlerStartUrl/crawlerStartUrl.module';
import { SpiderModule } from './resolvers/spider/spider.module';
import { CompileModule } from './resolvers/compile/compile.module';

@Module({
  imports: [
    NestjsFormDataModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRoot({
      autoSchemaFile: "./src/schema.gql",
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    AuthModule,
    UserModule,
    CrawlerModule,
    CrawlerVersionModule,
    CrawlerStartUrlModule,
    SpiderModule,
    CompileModule
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule { }
