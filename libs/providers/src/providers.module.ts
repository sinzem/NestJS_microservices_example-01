import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { apolloDriverConfig } from './graphql';

@Module({
  providers: [],
  exports: [],
  imports: [
    TypeormModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig)
  ],
})
export class ProvidersModule {}
