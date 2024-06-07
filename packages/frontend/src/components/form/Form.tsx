import { Colors } from '@/styles/colors'
import { MediaQueries } from '@/styles/mediaQueries'
import styled from 'styled-components'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${Colors.Black};
`

export const FormHeading = styled.h2`
  color: ${Colors.Black};

  ${MediaQueries.medium} {
    font-size: 20px;
  }
`

export const FormSubHeading = styled.h3`
  color: ${Colors.Black};

  ${MediaQueries.medium} {
    font-size: 20px;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 82px 0 82px;
  width: 440px;

  ${MediaQueries.medium} {
    padding: 0;
    width: 100%;
    max-width: 440px;
  }
`

export const FormSectionWrapper = styled(FormWrapper)`
  justify-content: center;
  text-align: center;
  align-items: center;
`

export const FormWideWrapper = styled(FormSectionWrapper)`
  padding: 0;
`

export const FormText = styled.p`
  max-width: 440px;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
