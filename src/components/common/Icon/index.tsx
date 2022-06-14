import { FC } from 'react';

import { BarsIcon } from './Bars';
import { ChevronDownIcon } from './ChevronDown';
import { ChevronRightIcon } from './ChevronRight';
import { CloseIcon } from './Close';
import { ExternalLinkIcon } from './ExternalLink';
import { GearIcon } from './Gear';
import { GitHubIcon } from './GitHub';
import { MoonIcon } from './Moon';
import { SunIcon } from './Sun';

export type IconName =
  | 'bars'
  | 'chevron-right'
  | 'chevron-down'
  | 'close'
  | 'external-link'
  | 'github'
  | 'sun'
  | 'moon'
  | 'gear';

const iconMap = {
  github: GitHubIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-down': ChevronDownIcon,
  close: CloseIcon,
  'external-link': ExternalLinkIcon,
  bars: BarsIcon,
  sun: SunIcon,
  gear: GearIcon,
  moon: MoonIcon,
};

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name];
  return <IconComponent />;
};
