import { createContext, useContext } from 'react';

const PreloadContext = createContext(null);

export default PreloadContext;

export const usePreloader = (resolve) => {
  const preloadContext = useContext(PreloadContext);

  console.log(preloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;

  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};