import Loader from '@/components/Loader';
import Text from '@/components/Text';

import styles from './RutubeVideoPlayer.module.scss';

type RutubeVideoPlayerType = {
  url: string;
};

const RutubeVideoPlayer: React.FC<RutubeVideoPlayerType> = ({ url }) => {
  if (!url)
    return (
      <div className={styles.video__loader}>
        <Loader />
        <Text view="p-m" color="accent" weight="medium">
          Загрузка видео
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
