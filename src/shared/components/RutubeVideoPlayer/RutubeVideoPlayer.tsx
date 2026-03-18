import Image from 'next/image';

import Text from '@/components/Text';
import imgCat from '@/public/NotFound-cat.png';

import styles from './RutubeVideoPlayer.module.scss';

type RutubeVideoPlayerType = {
  url: string;
};

const RutubeVideoPlayer: React.FC<RutubeVideoPlayerType> = ({ url }) => {
  if (!url)
    return (
      <div className={styles.video__empty}>
        <Image
          className={styles.video__img}
          src={imgCat}
          alt="Грустный котик"
          width={400}
          height={400}
        />
        <Text view="p-xl" color="accent" weight="medium">
          К сожалению, у урока нет видео
        </Text>
      </div>
    );

  const videoId: string = new URL(url).pathname
    .split('/')
    .filter((path) => path !== '' && path !== 'video')[0];
  const frameUrl = `https://rutube.ru/play/embed/${videoId}/?skinColor=8e24aa`;

  return (
    <iframe
      className={styles.video}
      src={frameUrl}
      title="Rutube Video Player"
      allow="clipboard-write; autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
};

export default RutubeVideoPlayer;
