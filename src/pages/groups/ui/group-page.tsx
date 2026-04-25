import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard, selectGroupContactsItems } from '@entities/group';
import { Empty } from '@shared/ui/empty';
import { ContactCard, selectContactsItems } from '@entities/contact';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';

export const GroupPage = (): React.JSX.Element => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContactsItems);
  const groupContactsList = useAppSelector(selectGroupContactsItems);
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);

  const groupContacts = groupContactsList.find((currentGroup) => {
    return currentGroup.id === (groupId ?? '');
  });

  const groupContactsMembers = groupContacts
    ? contacts.filter((contact) =>
        groupContacts.contactIds.includes(contact.id),
      )
    : [];

  const handleToggleFavorite = (contactId: string) => {
    dispatch(toggleFavoriteContactId(contactId));
  };

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {groupContactsMembers.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard
                    contact={contact}
                    withLink
                    isFavorite={favoriteContactIds.includes(contact.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
};
