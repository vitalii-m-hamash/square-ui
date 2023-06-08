import React from 'react';
import './Notifications.scss';
import { TNotification } from '../Square/types';

const Notifications: React.FC<{ notifications: TNotification[] }> = ({
  notifications,
}) => {
  return (
    <section className='notificationsContainer'>
      {notifications.length !== 0
        ? notifications.map((notification, index) => (
            <section className='notificationsSection' key={index}>
              row {notification.row} col {notification.col}
            </section>
          ))
        : null}
    </section>
  );
};

export default Notifications;
