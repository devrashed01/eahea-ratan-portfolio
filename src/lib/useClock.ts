import { useEffect, useState } from 'react'

function format(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date())
}

/** Live HH:MM in the given IANA time zone, refreshed every 15s. */
export function useClock(timeZone: string) {
  const [time, setTime] = useState(() => format(timeZone))
  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 15_000)
    return () => clearInterval(id)
  }, [timeZone])
  return time
}
