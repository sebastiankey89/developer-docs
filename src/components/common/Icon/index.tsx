import { FC } from 'react';
import { BarsIcon } from './Bars';
import { ChevronDownIcon } from './ChevronDown';

import { ChevronRightIcon } from './ChevronRight';
import { CloseIcon } from './Close';
import { ExternalLinkIcon } from './ExternalLink';
import { GitHubIcon } from './GitHub';

export type IconName =
  | 'github'
  | 'chevron-right'
  | 'chevron-down'
  | 'close'
  | 'bars'
  | 'external-link';

const iconMap = {
  github: GitHubIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-down': ChevronDownIcon,
  close: CloseIcon,
  'external-link': ExternalLinkIcon,
  bars: BarsIcon,
};

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name];
  return <IconComponent />;
};
