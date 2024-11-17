/* eslint-disable no-var */
import { env } from "@/env";
import Redis from "ioredis";
declare global {
  var redis: Redis | undefined;
}

export function getRedisClient(): Redis {
  const redis = global.redis ?? new Redis(env.REDIS_URL);
  /** This prevents creating multiple instance of redis client in development mode */
  if (process.env.NODE_ENV === "development") {
    global.redis = redis;
  }

  return redis;
}

export const redisClient = getRedisClient();

// ref https://stackoverflow.com/questions/78540906/build-time-error-when-using-redis-inside-next-js