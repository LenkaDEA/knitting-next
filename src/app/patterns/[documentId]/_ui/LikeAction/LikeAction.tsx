'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import LikeIcon from '@/shared/components/icons/LikeIcon';
import { useRootStore } from '@/shared/stores/context/RootContext';

import { usePatternDetails } from '../../_model/PatternDetailsContext';

import styles from './LikeAction.module.scss';

const LikeAction: React.FC<{ documentId: string }> = observer(({ documentId }) => {
  const { userStore } = useRootStore();
  const patternDetailsStore = usePatternDetails();
  const isFavorite = userStore.isFavorite(documentId || '');

  const handleLike = () => {
    userStore.likePattern({ pattern: patternDetailsStore.shortData });
  };
  return (
    <LikeIcon
      className={classNames(styles.like, { [styles.like__noLike]: !isFavorite })}
      width={50}
      height={50}
      color="accent"
      onClick={handleLike}
    />
  );
});

export default LikeAction;
