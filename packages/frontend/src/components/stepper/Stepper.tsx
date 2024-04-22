import { Colors } from '@/styles/colors'
import styled from 'styled-components'
import { ClockIcon, CrossIcon } from '../icons'

interface StepContent {
  name: string
  description?: string
}

type StepDescription = 'default' | 'failed'

type Step = Record<StepDescription, StepContent>

type Steps = Step[]

const stepsDefault: Steps = [
  {
    default: {
      name: `test`,
      description: `desc`,
    },
    failed: {
      name: 'Failed',
      description: 'fail.',
    },
  },
  {
    default: {
      name: 'Finalized',
    },
    failed: {
      name: 'Failed',
      description: 'Transaction failed.',
    },
  },
  {
    default: {
      name: 'third',
      description: 'The transaction has been confirmed on the blockchain.',
    },
    failed: {
      name: 'Failed',
      description: 'Transaction failed.',
    },
  },
  {
    default: {
      name: 'quatro',
      description: 'The transaction has been confirmed on the blockchain.',
    },
    failed: {
      name: 'Failed',
      description: 'Transaction failed.',
    },
  },
]

type StepType = 'neutral' | 'success' | 'failure'

export interface StepperProps {
  steps?: Steps
  currentStep: number
  isFailed: boolean
}

export const TransactionStepper = ({ currentStep, isFailed, steps = stepsDefault }: StepperProps) => (
  <StepperContainer>
    <Row>
      <ClockIcon size={38} />
      <StepperHeader>Checking your score</StepperHeader>
    </Row>

    <StepperList>
      {steps.map((item, index) => {
        const isCurrent = index === currentStep
        const status = isCurrent ? 'current' : index < currentStep ? 'completed' : 'next'
        const { step, type } = pickStepVersion(item, isFailed && isCurrent, isCurrent)
        return <StepperListItem key={index} step={step} status={status} type={type} />
      })}
    </StepperList>
  </StepperContainer>
)

function pickStepVersion(item: Step, IsFailed: boolean, isCurrent: boolean) {
  const [step, type]: [StepContent, StepType] =
    item.failed && IsFailed ? [item.failed, 'failure'] : [item.default, isCurrent ? 'neutral' : 'success']
  return { step, type }
}

type StepStatus = 'current' | 'completed' | 'next'

interface ListItemProps {
  step: StepContent
  status: StepStatus
  type: StepType
}

const StepperListItem = ({ step, status, type }: ListItemProps) => (
  <StepperListItemContainer type={type} status={status}>
    <StepperBullet type={type} status={status}>
      {type === 'failure' && <CrossIcon size={16} color={Colors.RedDark} />}
    </StepperBullet>
    <StepperItemName>{step.name}</StepperItemName>
    <StepperItemDescription current={status === 'current'}>{step.description}</StepperItemDescription>
  </StepperListItemContainer>
)

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`

const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 82px 20px 82px 0;
`
const StepperHeader = styled.h3`
  color: ${Colors.Black};
`

const StepperList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`

function getItemColor(props: DisplayTypeProps) {
  switch (props.status) {
    case 'current':
      switch (props.type) {
        case 'neutral':
          return Colors.Black
        case 'success':
          return Colors.Black
        case 'failure':
          return Colors.RedDark
      }
    default:
      return Colors.Black
  }
}

const StepperListItemContainer = styled.li<DisplayTypeProps>`
  display: grid;
  position: relative;
  grid-template-areas:
    'icon header'
    'icon description';
  grid-template-columns: 18px auto;
  grid-column-gap: 12px;
  grid-row-gap: 4px;
  margin-top: 36px;
  color: ${getItemColor};
  transition: all 0.25s ease;

  &:before {
    content: '';
    position: absolute;
    left: 9px;
    top: 17px;
    width: 0px;
    border-left: 2px ${({ status }) => (status === 'completed' ? 'solid' : 'dashed')} ${Colors.Black};
    height: calc(100% + 19px);
    transform: translateX(-50%);
    pointer-events: none;
  }

  &:first-child {
    margin-top: 0px;
  }

  &:last-child {
    &:before {
      content: unset;
    }
  }
`
interface DisplayTypeProps {
  type: StepType
  status: StepStatus
}

const StepperBullet = styled.div<DisplayTypeProps>`
  grid-area: icon;
  display: flex;
  align-items: center;
  width: 17px;
  height: 17px;
  border: 2px solid currentColor;
  border-radius: 50%;
  background-color: ${({ type, status }) => {
    switch (status) {
      case 'current':
        switch (type) {
          case 'neutral':
            return Colors.Black
          case 'failure':
            return Colors.White
          case 'success':
            return Colors.Black
        }
      case 'completed':
        return Colors.Black
      default:
        return Colors.White
    }
  }};

  color: ${({ type, status }) => {
    switch (status) {
      case 'current':
        switch (type) {
          case 'neutral':
            return Colors.Black
          case 'failure':
            return Colors.RedDark
          case 'success':
            return Colors.Black
        }
        break
      case 'completed':
        return Colors.Black
      default:
        return Colors.Black
    }
  }};
`

const StepperItemName = styled.span`
  grid-area: header;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: inherit;
`

interface ItemDescriptionProps {
  current?: boolean
}

const StepperItemDescription = styled.span<ItemDescriptionProps>`
  grid-area: description;
  color: ${Colors.Black};
  opacity: ${(props) => (props.current ? 1 : 0.7)};
  transition: all 0.25s ease;
`
