import parse from 'html-react-parser';
import type { Metadata } from 'next';
import Image from 'next/image';
import React, { cache } from 'react';

import GoBack from '@/components/GoBack';
import PageLoader from '@/components/PageLoader';
import RutubeVideoPlayer from '@/components/RutubeVideoPlayer';
import Text from '@/components/Text';
import { Meta } from '@/config/meta';
import defaultImg from '@/public/default.jpg';
import ToolDisplay from '@/shared/components/ToolDisplay';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import { PatternDetailsProvider } from './_model/PatternDetailsContext';
import PatternDetailsStore from './_model/PatternDetailsStore';
import LikeAction from './_ui/LikeAction';
import styles from './page.module.scss';

export const getCachedPatternDetails = cache(async (documentId: string) => {
  const patternDetailsStore = new PatternDetailsStore(initializeStore().apiStore);
  await patternDetailsStore.getPatternDetails({ documentId });

  return {
    data: patternDetailsStore.data,
    meta: patternDetailsStore.meta,
  };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ documentId: string }>;
}): Promise<Metadata> {
  const documentId = (await params).documentId;
  const { data } = await getCachedPatternDetails(documentId);

  return {
    title: `${data.title} | Knitting`,
    description: data.description,
    openGraph: {
      images: [{ url: data.cover?.url || defaultImg.src }],
    },
  };
}

const PatternDetails: React.FC<{ params: Promise<{ documentId: string }> }> = async ({
  params,
}) => {
  const documentId = (await params).documentId;
  const { data, meta } = await getCachedPatternDetails(documentId);

  if (meta === Meta.error) throw new Error('Урок не найден');
  if (meta === Meta.loading) return <PageLoader />;
  return (
    <div className={styles.patternDetails}>
      <GoBack />
      <div className={styles.patternDetails__body}>
        <Image
          src={data.cover?.url || defaultImg}
          className={styles.patternDetails__cover}
          loading="eager"
          width={400}
          height={400}
          alt="Фотография изделия"
        />
        <div className={styles.patternDetails__content}>
          <div className={styles.patternDetails__header}>
            <Text view="title" weight="bold">
              {data.title}
            </Text>
            <PatternDetailsProvider initialData={data}>
              <div className={styles.patternDetails__actions}>
                <LikeAction documentId={documentId} />
              </div>
            </PatternDetailsProvider>
          </div>
          <Text view="p-xl" color="secondary">
            {data.shortDescription}
          </Text>
          <div className={styles.patternDetails__widgets}>
            <ToolDisplay tool={data.tool} />
            <div className={styles.patternDetails__author}>
              <Text color="secondary" view="p-s">
                Автор
              </Text>
              <Text color="accent" view="p-l">
                {data.author ? data.author.username : 'Команда-Knitting'}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Text className={styles.patternDetails__description} tag="div">
        {parse(data.description)}
      </Text>

      <RutubeVideoPlayer url={data.videoUrl} />
    </div>
  );
};

export default PatternDetails;
