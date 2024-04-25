import { Colors } from '@/styles/colors'
import styled from 'styled-components'
import { CrossIcon } from '../icons'

interface StepContent {
  name: string
  description?: string
}

type StepDescription = 'default' | 'failed'

type Step = Record<StepDescription, StepContent>

type Steps = Step[]

type StepType = 'neutral' | 'success' | 'failure'

interface StepperProps {
  steps: Steps
  currentStep: number
  isFailed: boolean
}

export const Stepper = ({ currentStep, isFailed, steps }: StepperProps) => (
  <StepperList>
    {steps.map((item, index) => {
      const isCurrent = index === currentStep
      const status = isCurrent ? 'current' : index < currentStep ? 'completed' : 'next'
      const { step, type } = pickStepVersion(item, isFailed && isCurrent, isCurrent)
      return <StepperListItem key={index} step={step} status={status} type={type} />
    })}
  </StepperList>
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
      {type === 'failure' && <CrossIcon size={16} color={Colors.Red} />}
    </StepperBullet>
    <StepperItemName next={status === 'next'}>{step.name}</StepperItemName>
    <StepperItemDescription current={status === 'current'}>{step.description}</StepperItemDescription>
  </StepperListItemContainer>
)

const StepperList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`

function getItemColor(props: DisplayTypeProps) {
  switch (props.status) {
    case 'current':
      return typeToItemColor[props.type]
    default:
      return Colors.Black
  }
}

const typeToItemColor: Record<StepType, string> = {
  neutral: Colors.Black,
  success: Colors.Black,
  failure: Colors.Red,
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
        return typeToBulletBackground[type]
      case 'completed':
        return Colors.Black
      default:
        return Colors.White
    }
  }};

  color: ${({ type, status }) => {
    switch (status) {
      case 'current':
        return typeToBulletColor[type]
      case 'completed':
        return Colors.Black
      default:
        return Colors.Black
    }
  }};
`

const typeToBulletBackground: Record<StepType, string> = {
  neutral: Colors.White,
  failure: Colors.White,
  success: Colors.Black,
}

const typeToBulletColor: Record<StepType, string> = {
  neutral: Colors.Black,
  failure: Colors.Red,
  success: Colors.Black,
}

interface ItemNameProps {
  next?: boolean
}

const StepperItemName = styled.span<ItemNameProps>`
  grid-area: header;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: inherit;
  opacity: ${(props) => (props.next ? 0.7 : 1)};
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
