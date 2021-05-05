import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { CountriesModule } from './modules/countries/countries.module';
import { ConversionModule } from './modules/conversion/conversion.module';

@Module({
  imports: [CoreModule, CountriesModule, ConversionModule],
})
export class AppModule {}
