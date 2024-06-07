import { breakPoints } from '@/styles/mediaQueries'
import { useEffect, useState } from 'react'

export function useResponsiveHelpers() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  const isMobileWidth = windowWidth <= breakPoints.medium

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    windowWidth,
    windowHeight,
    isMobileWidth,
  }
}
