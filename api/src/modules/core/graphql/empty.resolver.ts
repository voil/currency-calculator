import { Query, Resolver } from '@nestjs/graphql';

/**
 * EmptyResolver
 * Empty resolver to start graphql scheme.
 */
@Resolver()
export class EmptyResolver {
  @Query(() => String)
  empty(): string {
    return 'Hello World!';
  }
}
