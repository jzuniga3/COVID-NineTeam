export = RudderStackNode.RudderStackClient;

declare namespace RudderStackNode {
  // defaults are appended as comments
  type RedisOptions = {
    port?: number; // 6379
    host?: string; // 'localhost'
    db?: number; // 0
    password?: string;
  };

  // defaults are appended as comments
  type JobOptions = {
    maxAttempts?: number; // 10
  };

  type QueueOptions = {
    queueName?: string;
    isMultiProcessor?: boolean;
    prefix?: string;
    redisOptions: RedisOptions;
    jobOptions?: JobOptions;
  };

  type Identity =
    | { userId: string | number }
    | { userId?: string | number; anonymousId: string | number };

  type EventContext = {
    app?: {
      build?: string;
      name?: string;
      namespace?: string;
      version?: string;
    };
    device?: {
      id?: string;
      manufacturer?: string;
      model?: string;
      name?: string;
      type?: string;
    };
    library?: {
      name?: string;
      version?: string;
    };
    locale?: string;
    network?: {
      carrier?: string;
      bluetooth?: boolean;
      cellular?: boolean;
      wifi?: boolean;
    };
    campaign?: {
      source?: string;
      medium?: string;
      term?: string;
      content?: string;
      name?: string;
    };
    os?: {
      name?: string;
      version?: string;
    };
    screen?: {
      density?: number;
      height?: number;
      width?: number;
    };
    timezone?: string;
    traits?: {
      anonymousId?: string;
    };
    userAgent?: string;
  };

  type IntegrationValue = boolean | { [integration_key: string]: any };

  type Integrations = {
    [integration_name: string]: IntegrationValue;
  };

  class RudderStackClient {
    constructor(
      writeKey: string,
      dataPlaneURL: string,
      options?: {
        flushAt?: number; // queue size
        flushInterval?: number; // ms
        // the max number of elements that the SDK can hold in memory,
        // this is different than the Redis list created when persistence is enabled
        maxInternalQueueSize?: number;
      }
    );
    createPersistenceQueue(
      queueOptions: QueueOptions,
      // createPersistenceQueue calls this with error or nothing(in case of success),
      // user should retry in case of error
      callback: (error?: Error) => void
    ): any;
    track(
      params: Identity & {
        event: string;
        properties?: any;
        context?: EventContext;
        integrations?: Integrations;
        timestamp?: Date;
      },
      callback?: (err: Error) => void
    ): void;
    identify(
      params: Identity & {
        traits?: any;
        context?: EventContext;
        integrations?: Integrations;
        timestamp?: Date;
      },
      callback?: (err: Error) => void
    ): void;
    flush(callback?: (err?: Error, data?: any) => void): void;
    logger: { silent: boolean }; // winston logger
    // TODO: other methods
  }
}
