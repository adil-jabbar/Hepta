// SoundManager.js

import Sound from 'react-native-sound';

let likeSound;

export const playLikeSound = () => {
  if (!likeSound) {
    likeSound = new Sound('like.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Failed to load sound', error);
        return;
      }
      playSound();
    });
  } else {
    playSound();
  }
};

const playSound = () => {
  likeSound.play(success => {
    if (success) {
      console.log('Sound played successfully');
    } else {
      console.error('Failed to play sound');
    }
  });
};
