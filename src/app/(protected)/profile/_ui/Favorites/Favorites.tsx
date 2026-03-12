'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import Card from '@/components/Card';
import EmptyStub from '@/components/EmptyStub';
import Text from '@/components/Text';
import defaultPattern from '@/public/default.jpg';
import ToolDisplay from '@/shared/components/ToolDisplay';
import type { PatternModel } from '@/stores/models/patterns';

import styles from './Favorites.module.scss';

export type FavoritesProps = {
  patterns?: PatternModel[];
};

const Favorites: React.FC<FavoritesProps> = ({ patterns = [] }) => {
  const route = useRouter();
  return (
    <div className={styles.favorites}>
      <Text view="title" color="accent" weight="medium">
        Любимые уроки
      </Text>
      {!patterns.length ? (
        <EmptyStub
          text="У вас пока нет любимых уроков"
          action={<Button onClick={() => route.push('/')}>Найти любимые уроки</Button>}
        />
      ) : (
        <div className={styles.favorites__container}>
          {patterns.map((pattern) => (
            <Link
              className="routLink"
              href={`/patterns/${pattern.documentId}`}
              key={pattern.documentId}
            >
              <Card
                image={pattern.cover?.url || defaultPattern}
                title={pattern.title}
                subtitle={pattern.shortDescription}
                actionSlot={<ToolDisplay tool={pattern.tool} />}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Favorites;
