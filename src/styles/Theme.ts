import { Theme } from './styled'

export const themes: Record<string, Theme> = {
  light: {
    colors: {
      outerBackground: '#010409',
      primaryText: '#ffffff', // question text color
      secondaryText: '#edeced', // answer text color
      themeText: '#000000',
      themeColor: '#ffffff',
      themeGradient: '#ffffff',
      background: '#151b23',
      cardBackground: '#151b23',
      selectTopicBg: '#151b23',
      appLogo: '#000000',
      buttonText: '#FFFFFF',
      outlineButtonText: '#800080',
      buttonBackground: '#3685f3',
      selectedAnswer: '#262c36',
      infoText: '#FF783F', // skip tag text
      infoBackground: '#ffb23f26', // skip tag background
      border: '#EAEAEA',
      answerBg: '#ffffff',
      disabledCard: '#fbf4ecbc',
      disabledButton: '#e7e8e9',
      success: '#12B40E',
      successLight: '#DDFFDC',
      danger: '#FF143E',
      dangerLight: '#FFD7DE',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#282526',
      darkGray: '#9fa3a9',
      darkerGray: '#817a8e',
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)',
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
  dark: {
    colors: {
      outerBackground: '#010409',
      primaryText: '#FFFFFF', // question text color
      secondaryText: '#FFFFFF', // answer text color
      themeText: '#FFFFFF',
      themeColor: '#ffffff',
      themeGradient: '#0e050e',
      background: '#0e050e',
      cardBackground: '#241a1a',
      selectTopicBg: '#21191C',
      appLogo: '#FFFFFF',
      buttonText: '#fff',
      outlineButtonText: '#ffffff',
      buttonBackground: '#0e050e',
      selectedAnswer: '#151113',
      infoText: '#FF783F', // skip tag text
      infoBackground: '#ffb23f26', // skip tag background
      border: 'transparent',
      answerBg: '#151113',
      disabledCard: '#00000080',
      disabledButton: '#181214',
      success: '#12B40E',
      successLight: '#151113',
      danger: '#FF143E',
      dangerLight: '#151113',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#282526',
      darkGray: '#9fa3a9',
      darkerGray: '#817a8e',
    },
    fonts: {
      anekMalayalam: 'Anek Malayalam',
    },
    shadows: {
      activeButton: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)',
    },
    paddings: {
      container: '15px',
      pageTop: '30px',
    },
    margins: {
      pageTop: '30px',
    },
  },
}
