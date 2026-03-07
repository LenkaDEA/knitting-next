import Link from 'next/link';

import defaultImg from '@/public/default.jpg';
// import Button from '@/shared/components/Button';
import Card from '@/shared/components/Card';
// import EmptyStub from '@/shared/components/EmptyStub';
import PageLoader from '@/shared/components/PageLoader';
import type { MetaType } from '@/shared/config/meta';
import { Meta } from '@/shared/config/meta';
import type { PatternModel } from '@/shared/stores/models/patterns';

import styles from './Patterns.module.scss';

type PatternsProps = {
  patterns: PatternModel[];
  metaStore: MetaType;
};

const Patterns: React.FC<PatternsProps> = async ({ patterns, metaStore }) => {
  if (metaStore === Meta.loading) return <PageLoader />;
  // if (patternsStore.meta === Meta.success && patternsStore.data.data.length === 0)
  //   return (
  //     <EmptyStub
  //       text={`По вашему запросу ничего не нашлось`}
  //       action={
  //         <Button
  //           onClick={() => {
  //             //todo
  //           }}
  //         >
  //           Сбросить поиск
  //         </Button>
  //       }
  //     />
  //   );
  return (
    <>
      <div className={styles.patterns}>
        {patterns.map((pattern) => (
          <Link
            className="routLink"
            href={`/patterns/${pattern.documentId}`}
            key={pattern.documentId}
          >
            <Card
              image={pattern.cover?.url || defaultImg}
              title={pattern.title}
              subtitle={pattern.shortDescription}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Patterns;
