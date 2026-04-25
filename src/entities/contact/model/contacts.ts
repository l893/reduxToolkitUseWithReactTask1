import type { ContactDto } from './types';

export interface ContactsState {
  items: ContactDto[];
}

const CONTACTS_SET_ITEMS = 'contacts/setItems' as const;

export const setContactsItems = (items: ContactDto[]) => {
  return {
    type: CONTACTS_SET_ITEMS,
    payload: items,
  };
};

type ContactsAction = ReturnType<typeof setContactsItems>;

const initialState: ContactsState = {
  items: [],
};

export const contactsReducer = (
  state: ContactsState = initialState,
  action: ContactsAction,
): ContactsState => {
  switch (action.type) {
    case CONTACTS_SET_ITEMS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const selectContactsItems = (state: { contacts: ContactsState }) => {
  return state.contacts.items;
};
