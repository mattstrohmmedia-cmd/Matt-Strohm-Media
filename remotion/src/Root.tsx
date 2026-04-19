import React from 'react';
import { Composition } from 'remotion';
import { Showreel, SHOWREEL_DURATION_FRAMES } from './Showreel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Showreel"
        component={Showreel}
        durationInFrames={SHOWREEL_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
