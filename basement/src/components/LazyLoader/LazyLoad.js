import { useEffect, useState } from 'react';

const LazyLoad = ({ loaderComponent, componentCount, children, delay }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout;

    if(delay > 0){
      setShowLoader(true);
      timeout = setTimeout(() => setShowLoader(false), delay);
    }

    return () => clearInterval(timeout);
  },[delay]);

  if(showLoader) return Array.from({ length: componentCount }).map((_,i) => (
    loaderComponent
  ));

  return children;
}

export default LazyLoad;