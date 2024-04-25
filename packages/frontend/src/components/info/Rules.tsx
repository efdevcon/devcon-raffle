import { ReactNode } from 'react'
import styled from 'styled-components'
import { Colors } from '@/styles/colors'

interface RuleProps {
  heading: string
  rule: string | ReactNode
  example?: string | ReactNode
}

export const Rule = ({ heading, rule, example }: RuleProps) => {
  return (
    <RuleWrapper>
      <RuleHeading>{heading}</RuleHeading>
      <RuleText>
        {rule}
        {example && <p>Example: {example}</p>}
      </RuleText>
    </RuleWrapper>
  )
}

const RuleWrapper = styled.div`
  width: 100%;
`

const RuleHeading = styled.h4`
  font-size: 18px;
  line-height: 1.5;
`

export const RuleText = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.Black};
`
