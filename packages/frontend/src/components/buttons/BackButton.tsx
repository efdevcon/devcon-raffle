import { useCallback } from 'react'
import styled from 'styled-components'
import { ArrowLeftIcon } from '@/components/icons'
import { Colors } from '@/styles/colors'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  view?: number
  setView?: (view: number) => void
  url?: string
  resetState?: () => void
}

export function BackButton({ view, setView, url, resetState }: BackButtonProps) {
  const router = useRouter()

  const goBack = useCallback(() => {
    if (view && setView) {
      setView(view - 1)
    }
    if (url) {
      router.push(`${url}`)
    }
    if (resetState) {
      resetState()
    }
  }, [setView, view, router, url, resetState])

  return (
    <BackBtn onClick={goBack}>
      <ArrowLeftIcon />
      Back
    </BackBtn>
  )
}

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  width: 84px;
  height: 32px;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background-color: ${Colors.Transparent};
  color: ${Colors.GreenLight};
  border: 1px solid ${Colors.GreenLight};
  padding: 0;

  &:hover,
  &:focus-visible,
  &:active {
    background-color: ${Colors.GreenLight};
    color: ${Colors.Black};
  }
`
