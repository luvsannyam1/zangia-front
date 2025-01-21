import styled, { createGlobalStyle, css } from 'styled-components'
import { device } from './BreakPoints'
import fontsCss from './fonts.module.css'

export const GlobalStyles = createGlobalStyle`
 ${fontsCss} // this works as a normal styled css
 
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  font-family: ${({ theme }) => theme.fonts.anekMalayalam}, sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.themeText};
  background: ${({ theme }) => theme.colors.background};
  line-height: 1;
  overflow-x: hidden;
  position: relative;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
figure,
blockquote,
dl,
caption,
dd {
  padding: 0;
  margin: 0;
  color: white;
}
h3{
  font-size: 1.25rem;
}
div{
  font-size: 0.875rem;
}
button {
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-weight:500;
  padding: 0;
  cursor: pointer;
}
/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
li {
  list-style-type: none;
}
/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}
/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
  font-size: 0.875rem;
}
input{
  min-width: 500px;
    padding: 5px 12px;
    font-size: 0.875rem;
    line-height: 20px;
    color: #f0f6fc;
    vertical-align: middle;
    background-color:#0d1117; 
    background-repeat: no-repeat;
    background-position: right 8px center;
    border: 1px solid #3d444d;
    border-radius: 6px;
    box-shadow: var(--shadow-inset, var(--color-primer-shadow-inset));
    transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
    transition-property: color, background-color, box-shadow, border-color;
}
}
/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

export const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.paddings.container};
`

interface BoxStyleTypes {
  mt?: number
  flxRight?: boolean
}

export const Box = styled.div<BoxStyleTypes>`
  margin-top: calc(${({ mt }) => mt} * 1px);
  ${({ flxRight }) =>
    flxRight &&
    css`
      display: flex;
      justify-content: flex-end;
    `}
`

interface PageCenterTypes {
  light?: boolean
  justifyCenter?: boolean
}

export const PageCenter = styled.div<PageCenterTypes>`
  background: ${({ light, theme }) =>
    light ? `${theme.colors.background}` : `${theme.colors.background}`};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 50px;
  ${({ justifyCenter }) =>
    justifyCenter &&
    css`
      justify-content: center;
    `}
`

interface FlexProps {
  center?: boolean
  spaceBetween?: boolean
  flxEnd?: boolean
  gap?: string
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ center }) =>
    center &&
    css`
      justify-content: center;
      align-items: center;
    `}
  ${({ spaceBetween }) =>
    spaceBetween &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${({ flxEnd }) =>
    flxEnd &&
    css`
      justify-content: flex-end;
      align-items: center;
    `}
  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap};
    `}
`

export const CenterCardContainer = styled.div`
  border-radius: 4px;
  min-width: 773px;
  min-height: 620px;
  padding: 50px 10px 60px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${device.md} {
    min-width: 100%;
  }
`

export const HighlightedText = styled.span<{ themeText?: boolean }>`
  color: #fff;
`

export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  svg {
    width: 220px;
    rect {
      stroke: ${({ theme }) => theme.colors.appLogo};
    }
    path {
      fill: ${({ theme }) => theme.colors.appLogo};
    }
  }
`

interface ResizableBoxProps {
  width: string | number
}

export const ResizableBox = styled.div<ResizableBoxProps>`
  width: ${(props) =>
    typeof props.width === 'string' ? props.width : `${props.width}px`};
`

export const CenterContainer = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.paddings.container};
`

interface SelectButtonProps {
  active: boolean
  disabled?: boolean
}

export const SelectButton = styled.div<SelectButtonProps>`
  background-color: ${({ disabled, theme }) =>
    disabled ? `${theme.colors.disabledCard}` : `${theme.colors.selectTopicBg}`};
  transition: background-color 0.4s ease-out;
  border: 1px solid;
  border: ${({ active }) => (!active ? `2px solid #3d444d` : `1px solid #ffffff`)};
  border-radius: 9px;
  height: 26.7px;
  color: white;
  text-align: center;
  font-size: 0.875rem;
  display: flex;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  @media ${device.md} {
    padding: 10px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
`
