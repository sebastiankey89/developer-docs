// Modified from: https://github.com/contentlayerdev/website/blob/main/src/components/landing-page/Video.tsx
import { FC } from 'react';
import { Card } from './Card';

interface VideoProps {
  videoId: string;
  title: string;
}

export const Video: FC<VideoProps> = ({ videoId, title }) => {
  return (
    <Card shadow className="w-full">
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          loading="lazy"
          allowFullScreen
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        />
      </div>
    </Card>
  );
};
