import { FC } from 'react';

import { AddIcon } from './AddIcon';
import { CloseIcon } from './CloseIcon';
import { PlaylistIcon } from './PlaylistIcon';
import { PlaylistAddIcon } from './PlaylistAddIcon';

export type IconName = 'close' | 'add' | 'playlist' | 'playlist-add';

const iconMap = {
  close: CloseIcon,
  add: AddIcon,
  playlist: PlaylistIcon,
  'playlist-add': PlaylistAddIcon,
};

export const RaydiantIcon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name];
  return (
    // Negative margin ensures icon is vertically centered with text
    <span className="relative top-[6px] inline-flex">
      <IconComponent />
    </span>
  );
};
