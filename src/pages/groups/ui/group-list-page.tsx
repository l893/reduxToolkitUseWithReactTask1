import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard, selectGroupContactsItems } from '@entities/group';
import { useAppSelector } from '@app/store';

export const GroupListPage = (): React.JSX.Element => {
  const groupContactsList = useAppSelector(selectGroupContactsItems);

  return (
    <Row xxl={4}>
      {groupContactsList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
};
