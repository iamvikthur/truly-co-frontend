import { Container, EmbedContainer } from './TextChapterCover.styles';

interface TextChapterCoverProps {
  bgColor?: string;
  bgImage?: string;
  children?: React.ReactNode;
  epigraph?: string;
  embed?: string;
  textColor?: string;
  title?: string;
}

const TextChapterCover = ({
  bgColor,
  bgImage,
  children,
  epigraph,
  embed,
  textColor,
  title,
}: TextChapterCoverProps) => {
  return (
    <Container bgColor={bgColor} bgImage={bgImage} embed={embed} textColor={textColor}>
      {bgImage && <img src={bgImage} alt={title} />}
      {title && <h2>{title}</h2>}
      {children && children}
      {epigraph && <p>{epigraph}</p>}
      {embed && <EmbedContainer dangerouslySetInnerHTML={{ __html: embed }} />}
    </Container>
  );
};

export default TextChapterCover;
