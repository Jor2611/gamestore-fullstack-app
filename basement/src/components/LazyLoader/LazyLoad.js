import React, { useEffect, useState } from 'react';
import GamesTableRowSkeleton from '../../components/Skeletons/GamesTableRowSkeleton';

const LazyLoad = ({ children, delay }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout;

    if(delay > 0){
      setShowLoader(true);
      timeout = setTimeout(() => setShowLoader(false), delay);
    }

    return () => clearInterval(timeout);
  },[delay]);

  if(showLoader) return Array.from({ length: 7 }).map((_,i) => (
    <GamesTableRowSkeleton lastItem={i === 6}/>
  ));

  return children;
}

export default LazyLoad;