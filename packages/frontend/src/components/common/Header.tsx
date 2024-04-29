import { Colors } from '@/styles/colors'
import styled, { css } from 'styled-components'
import { renderToStaticMarkup } from 'react-dom/server'
import { DotsIcon } from '../icons'

export const headerBackgroundStyles = css`
  ${() => {
    const svg = encodeURIComponent(renderToStaticMarkup(<DotsIcon />))
    return `
          background: url("data:image/svg+xml,${svg}") no-repeat;
          background-size: cover;
        `
  }};
`

export const HeaderBar = styled.header`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  width: 100%;
  background: ${Colors.White};
  position: relative;
  ${headerBackgroundStyles}
`
