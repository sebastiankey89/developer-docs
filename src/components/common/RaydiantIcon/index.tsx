import { FC } from 'react';

import { AddIcon } from './AddIcon';
import { CloseIcon } from './CloseIcon';

export type IconName = 'close' | 'add';

const iconMap = {
  close: CloseIcon,
  add: AddIcon,
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
