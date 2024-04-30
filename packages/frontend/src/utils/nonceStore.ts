import { environment } from '@/config/environment'
import ExpirySet from 'expiry-set'

export const nonceStore = new ExpirySet<string>(environment.nonceExpiry)
