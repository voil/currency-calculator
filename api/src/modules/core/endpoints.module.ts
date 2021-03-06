import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from './services/config.service';
import { ExceptionsHandler } from '../../support/handlers/exceptions.handler';

/**
 * EndpointsModule
 * Endpoints module to initizalize graphql.
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.register()],
      useFactory: async (configService: ConfigService) => {
        const checkErrorHandler = error => {
          return error.extensions
            ? error.extensions.exception.response
              ? error.extensions.exception.response.message.join(',')
              : error.extensions.exception.stacktrace[0].replace('Error: ', '')
            : error.message;
        };

        return {
          autoSchemaFile: true,
          typePaths: ['./**/*.graphql'],
          context: ({ req, res, connection }) => ({ req, res, connection }),
          installSubscriptionHandlers: true,
          cors: {
            credentials: true,
            origin: true,
          },
          debug: Boolean(configService.get('GRAPHQL_DEBUG')),
          playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
          formatError: error =>
            new ExceptionsHandler(checkErrorHandler(error)).handle(),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class EndpointsModule {}
