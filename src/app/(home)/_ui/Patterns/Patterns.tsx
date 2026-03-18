'use client';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import defaultImg from '@/public/default.jpg';
import Card from '@/shared/components/Card';
import EmptyStub from '@/shared/components/EmptyStub';
import ToolDisplay from '@/shared/components/ToolDisplay';
import { Meta } from '@/shared/config/meta';
import { getPatternUrl } from '@/shared/config/routes';
import { useRootStore } from '@/shared/stores/context/RootContext';
import { AnalyticsEvent } from '@/shared/stores/models/analytics';

import { usePatternsStore } from '../../_model/PatternsContext';

import styles from './Patterns.module.scss';

const Patterns: React.FC = observer(() => {
  const patternsStore = usePatternsStore();
  const { analyticsStore } = useRootStore();

  if (patternsStore.meta === Meta.success && patternsStore.data.data.length === 0)
    return <EmptyStub text={`По вашему запросу ничего не нашлось`} />;
  return (
    <div className={styles.patterns}>
      {patternsStore.data.data.map((pattern) => (
        <Link
          className="routLink"
          href={getPatternUrl(pattern.documentId)}
          key={pattern.documentId}
          onClick={() => {
            analyticsStore.sendEvent(AnalyticsEvent.clickCardHome, {
              cardDocumentId: pattern.documentId,
              cardTitle: pattern.title,
            });
          }}
        >
          <Card
            image={pattern.cover?.url || defaultImg}
            title={pattern.title}
            subtitle={pattern.shortDescription}
            contentSlot={<ToolDisplay tool={pattern.tool} />}
          />
        </Link>
      ))}
    </div>
  );
});

export default Patterns;
