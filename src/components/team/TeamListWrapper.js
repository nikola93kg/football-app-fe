import React, { Suspense, lazy } from 'react';
import Loading from '../Loading';

const TeamListLazy = lazy(() => import('./TeamList')); 

const TeamListWrapper = () => (
  <Suspense fallback={<Loading />}>
    <TeamListLazy />
  </Suspense>
);

export default TeamListWrapper;
