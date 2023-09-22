import { Redis } from '@upstash/redis'
import { getUpstashUrl, getUpstashToken } from '../secrets'

export const redis = new Redis({
  url: getUpstashUrl(),
  token: getUpstashToken(),
})