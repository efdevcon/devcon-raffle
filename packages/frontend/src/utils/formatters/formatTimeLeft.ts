import moment from 'moment'
import { padZeroes } from './padZeroes'

export function formatTimeLeft(timestamp: bigint | undefined, now = Date.now()) {
  if (!timestamp) {
    return '-'
  }

  const date = moment.unix(Number(timestamp))
  const difference = date.diff(now) > 0 ? date.diff(now) : 0
  const duration = moment.duration(difference)

  const days = padZeroes(Math.floor(duration.asDays()))
  const hours = padZeroes(duration.hours())
  const minutes = padZeroes(duration.minutes())

  return `${days}d:${hours}h:${minutes}m`
}
