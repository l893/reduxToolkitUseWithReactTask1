import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from '@entities/contact';
import { useAppDispatch, useAppSelector } from '@app/store';
import {
  selectFavoriteContacts,
  toggleFavoriteContactId,
} from '@entities/favorites';

export const FavoritListPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const favoriteContacts = useAppSelector(selectFavoriteContacts);

  const handleToggleFavorite = (contactId: string) => {
    dispatch(toggleFavoriteContactId(contactId));
  };

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard
            contact={contact}
            withLink
            isFavorite
            onToggleFavorite={handleToggleFavorite}
          />
        </Col>
      ))}
    </Row>
  );
};
