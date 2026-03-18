'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useAnimate } from 'motion/react';

import LikeIcon from '@/shared/components/icons/LikeIcon';
import { useRootStore } from '@/shared/stores/context/RootContext';
import { AnalyticsEvent } from '@/shared/stores/models/analytics';

import { usePatternDetails } from '../../_model/PatternDetailsContext';

import styles from './LikeAction.module.scss';

const LikeAction: React.FC<{ documentId: string }> = observer(({ documentId }) => {
  const { userStore, analyticsStore } = useRootStore();
  const patternDetailsStore = usePatternDetails();
  const isFavorite = userStore.isFavorite(documentId || '');
  const [scope, animate] = useAnimate();

  const handleLike = () => {
    if (!isFavorite) {
      animate(
        scope.current,
        { scale: [1, 1.45, 0.9, 1.1, 1] },
        { duration: 0.45, ease: 'easeOut' }
      );
    } else {
      animate(scope.current, { scale: [1, 0.75, 1] }, { duration: 0.3, ease: 'easeOut' });
    }
    userStore.likePattern({ pattern: patternDetailsStore.shortData });
    analyticsStore.sendEvent(AnalyticsEvent.clickLike, {
      cardDocumentId: documentId,
      isFavorite: !isFavorite,
    });
  };

  return (
    <span ref={scope} style={{ display: 'inline-flex' }}>
      <LikeIcon
        className={classNames(styles.like, { [styles.like__noLike]: !isFavorite })}
        width={50}
        height={50}
        color="accent"
        onClick={handleLike}
      />
    </span>
  );
});

export default LikeAction;
