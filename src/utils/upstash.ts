import { Ratelimit } from "@upstash/ratelimit"; 
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
// console.log('UPSTASH_REDIS_REST_URL:', process.env.UPSTASH_REDIS_REST_URL ? 'Found' : 'Not found');
// console.log('UPSTASH_REDIS_REST_TOKEN:', process.env.UPSTASH_REDIS_REST_TOKEN ? 'Found' : 'Not found');
// Create a new ratelimiter, that allows 10 requests per 10 seconds
 const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
redis:new Redis({
    url:process.env.UPSTASH_REDIS_REST_URL,
    token:process.env.UPSTASH_REDIS_REST_TOKEN
}),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
//   prefix: "@upstash/ratelimit",
});

export default ratelimit;