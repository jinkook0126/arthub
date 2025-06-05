import React from 'react';
import { useCreatorSignState } from './CreatorSignContext';
import CreatorInfoPage from './CreatorInfoPage';
import UserInfoPage from './UserInfoPage';

function CreatorSignRouter() {
  const { page } = useCreatorSignState();
  switch (page) {
    case 'creator-info':
      return <CreatorInfoPage />;
    case 'user-info':
      return <UserInfoPage />;
    default:
      return null;
  }
}

export default CreatorSignRouter;
