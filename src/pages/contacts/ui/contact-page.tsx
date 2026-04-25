import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard, selectContactsItems } from '@entities/contact';
import { Empty } from '@shared/ui/empty';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';

export const ContactPage = (): React.JSX.Element => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContactsItems);
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);
  const contact = contacts.find((currentContact) => {
    return currentContact.id === (contactId ?? '');
  });

  const handleToggleFavorite = (selectedContactId: string) => {
    dispatch(toggleFavoriteContactId(selectedContactId));
  };

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? (
          <ContactCard
            contact={contact}
            isFavorite={favoriteContactIds.includes(contact.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
};
