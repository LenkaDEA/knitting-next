import parse from 'html-react-parser';
import Image from 'next/image';
import React from 'react';

import GoBack from '@/components/GoBack';
import PageLoader from '@/components/PageLoader';
import RutubeVideoPlayer from '@/components/RutubeVideoPlayer';
import Text from '@/components/Text';
import { Meta } from '@/config/meta';
import defaultImg from '@/public/default.jpg';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import { PatternDetailsProvider } from './_model/PatternDetailsContext';
import PatternDetailsStore from './_model/PatternDetailsStore';
import LikeAction from './_ui/LikeAction';
import styles from './page.module.scss';

const PatternDetails: React.FC<{ params: Promise<{ documentId: string }> }> = async ({
  params,
}) => {
  const patternDetailsStore = new PatternDetailsStore(initializeStore().apiStore);
  const documentId = (await params).documentId;

  await patternDetailsStore.getPatternDetails({ documentId });

  //   if (patternDetailsStore.meta === Meta.error) return <Navigate to="/404" replace />;
  if (patternDetailsStore.meta === Meta.loading) return <PageLoader />;
  return (
    <div className={styles.patternDetails}>
      <GoBack />
      <div className={styles.patternDetails__body}>
        <Image
          src={patternDetailsStore.data.cover?.url || defaultImg}
          className={styles.patternDetails__cover}
          width={300}
          height={300}
          alt="Фотография изделия"
        />
        <div className={styles.patternDetails__content}>
          <div className={styles.patternDetails__header}>
            <Text view="title" weight="bold">
              {patternDetailsStore.data.title}
            </Text>
            <Text view="p-xl" color="secondary">
              {patternDetailsStore.data.shortDescription}
            </Text>
          </div>
          <div className={styles.patternDetails__widgets}>
            <Text view="p-xl" weight="bold" color="accent">
              {patternDetailsStore.data.tool}
            </Text>{' '}
            {/* TODO: icons */}
            <PatternDetailsProvider initialData={patternDetailsStore.data}>
              <div className={styles.patternDetails__actions}>
                <LikeAction documentId={documentId} />
              </div>
            </PatternDetailsProvider>
          </div>
        </div>
      </div>

      <Text className={styles.patternDetails__description} tag="div">
        {parse(patternDetailsStore.data.description)}
      </Text>

      <RutubeVideoPlayer url={patternDetailsStore.data.videoUrl} />
    </div>
  );
};

export default PatternDetails;
