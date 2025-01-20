import { FC } from 'react'
import styled from 'styled-components'

import { Flex } from '../../../../styles/Global'
import { device } from '../../../../styles/BreakPoints'

const TimerStyle = styled.span<{ isCritical: boolean }>`
  min-width: 60px;
  font-size: clamp(16px, 5vw, 24px);
  font-weight: 500;
  margin-left: 8px;
  color: ${({ theme, isCritical }) => (isCritical ? 'red' : theme.colors.themeColor)};
  @media ${device.md} {
    margin-left: 5px;
    min-width: 55px;
  }
`

interface CounterProps {
  time: string
}

const Counter: FC<CounterProps> = ({ time }) => {
  // Convert the time to seconds and check if it's below 10 seconds
  const timeInSeconds = time.split(':').reduce((acc, val, index) => {
    return acc + (index === 0 ? parseInt(val) * 60 : parseInt(val))
  }, 0)

  const isCritical = timeInSeconds < 10

  return (
    <Flex center>
      <TimerStyle isCritical={isCritical}>{time}</TimerStyle>
    </Flex>
  )
}

export default Counter
