import { CacheModule } from '@nestjs/common';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '../core/config.module';
import { ConversionService } from './conversion.service';
import { ConfigService } from '../core/services/config.service';
import { ConversionResolver } from './graphql/conversion.resolver';

/**
 * ConversionModule
 * Conversion module.
 */
@Module({
  imports: [
    HttpModule,
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
  ],
  providers: [ConfigService, ConversionService, ConversionResolver],
})
export class ConversionModule {}
