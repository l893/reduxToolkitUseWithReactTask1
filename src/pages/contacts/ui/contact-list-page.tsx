import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from '@entities/contact';
import {
  FilterForm,
  type FilterFormValues,
  resetFilters,
  selectFilteredContacts,
  selectFilters,
  setFilters,
} from '@features/filters';
import { useAppDispatch, useAppSelector } from '@app/store';
import { selectGroupContactsItems } from '@entities/group';
import {
  selectFavoriteContactIds,
  toggleFavoriteContactId,
} from '@entities/favorites';

export const ContactListPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const groupContactsList = useAppSelector(selectGroupContactsItems);
  const filters = useAppSelector(selectFilters);
  const filteredContacts = useAppSelector(selectFilteredContacts);
  const favoriteContactIds = useAppSelector(selectFavoriteContactIds);

  const filterFormInitialValues: Partial<FilterFormValues> = {
    name: filters.nameQuery,
    groupId: filters.groupId,
  };

  const handleFiltersSubmit = (filterValues: Partial<FilterFormValues>) => {
    dispatch(setFilters(filterValues));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleToggleFavorite = (contactId: string) => {
    dispatch(toggleFavoriteContactId(contactId));
  };

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupContactsList}
          initialValues={filterFormInitialValues}
          enableReinitialize
          onSubmit={handleFiltersSubmit}
          onResetFilters={handleResetFilters}
        />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {filteredContacts.map((contact) => (
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
    </Row>
  );
};
