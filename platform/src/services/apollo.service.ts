import {
  gql,
  FetchPolicy,
  ApolloClient,
  InMemoryCache,
  ApolloQueryResult,
  NormalizedCacheObject,
} from "@apollo/client";

export interface ParamsGraphQLInterface {
  [propName: string]: any;
}

export interface ApolloServiceInterface {
  query(
    query: string,
    params?: ParamsGraphQLInterface,
    isCacheDisactive?: boolean
  ): Promise<ApolloQueryResult<any>>;
}

class ApolloService implements ApolloServiceInterface {
  /**
   * @var String ApolloClient<NormalizedCacheObject>
   */
  private clientApollo: ApolloClient<NormalizedCacheObject>;

  /**
   * Constructor of class.
   */
  public constructor() {
    this.clientApollo = this.createApolloClient();
  }

  /**
   * Method to handle query apollo.
   *
   * @param String query
   * @param ParamsGraphQLInterface params
   * @return  Promise<ApolloQueryResult<any>>
   */
  public async query(
    query: string,
    params?: ParamsGraphQLInterface,
    isCacheDisactive?: boolean
  ): Promise<ApolloQueryResult<any>> {
    const response = await this.clientApollo.query({
      query: gql`
        ${query}
      `,
      variables: params,
      ...(isCacheDisactive
        ? {
            fetchPolicy: "network-only" as FetchPolicy,
          }
        : {}),
    });
    return response;
  }

  /**
   * Method to create apollo client.
   *
   * @return ApolloClient<NormalizedCacheObject>
   */
  private createApolloClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
      uri: process.env.REACT_APP_PUBLIC_URL,
      cache: new InMemoryCache(),
    });
  }
}

export default new ApolloService();
