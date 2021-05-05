import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { EndpointsModule } from './endpoints.module';
import { EmptyResolver } from './graphql/empty.resolver';

/**
 * CoreModule
 * Core module.
 */
@Module({
  imports: [
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
    EndpointsModule,
  ],
  providers: [EmptyResolver],
})
export class CoreModule {}
