import { useEffect, useState } from 'react';

interface key {
  key: any;
}

const useKeyPress = (targetKey: any) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: key) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }: key) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
};
export default useKeyPress;
