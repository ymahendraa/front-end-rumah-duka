import Redis, { RedisOptions } from "ioredis";
import { configuration } from "./configuration";

function getRedisConfiguration(): {
  port: number | undefined;
  host: string | undefined;
  password: string | undefined;
} {
  const { port, host, password } = configuration.redis || {};
  return {
    port: port ? parseInt(port) : undefined,
    host,
    password,
  };
}

export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 1) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }
        return Math.min(times * 200, 1000);
      },
    };

    if (config.port) {
      options.port = config.port;
    }

    if (config.password) {
      options.password = config.password;
    }

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (error) {
    console.error("[Redis] Error creating instance", error);
    throw error;
  }
}
