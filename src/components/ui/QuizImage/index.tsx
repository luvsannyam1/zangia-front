import { FC } from 'react'
import styled from 'styled-components'

interface QuizImageProps {
  image: string
}

const ImageStyle = styled.img`
  border-radius: 10px;
  height: 400px;
  max-width: 100%;
  box-shadow: 6px 6px 2px ${({ theme }) => theme.colors.themeColor};
  margin-bottom: 20px;
`

const QuizImage: FC<QuizImageProps> = ({ image }) => {
  const imgUrls = image.split('.')[1]
  if (imgUrls === 'mp4') {
    return (
      <video width="400" controls>
        <source src={'/server' + image} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }
  return <ImageStyle src={'/server' + image} alt="picture quiz" />
}
export default QuizImage
