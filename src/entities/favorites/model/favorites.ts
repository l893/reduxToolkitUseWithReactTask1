import type { FavoriteContactsDto } from './types';
import type { ContactDto } from '@entities/contact';
import type { ContactsState } from '@entities/contact/model/contacts';

export interface FavoritesState {
  ids: FavoriteContactsDto;
}

const FAVORITES_SET_IDS = 'favorites/setIds' as const;
const FAVORITES_TOGGLE_ID = 'favorites/toggleId' as const;

export const setFavoriteContactIds = (ids: FavoriteContactsDto) => {
  return {
    type: FAVORITES_SET_IDS,
    payload: ids,
  };
};

export const toggleFavoriteContactId = (contactId: ContactDto['id']) => {
  return {
    type: FAVORITES_TOGGLE_ID,
    payload: contactId,
  };
};

type FavoritesAction =
  | ReturnType<typeof setFavoriteContactIds>
  | ReturnType<typeof toggleFavoriteContactId>;

const initialState: FavoritesState = {
  ids: [],
};

export const favoritesReducer = (
  state: FavoritesState = initialState,
  action: FavoritesAction,
): FavoritesState => {
  switch (action.type) {
    case FAVORITES_SET_IDS:
      return { ...state, ids: action.payload };
    case FAVORITES_TOGGLE_ID: {
      const contactId = action.payload;
      const isAlreadyFavorite = state.ids.includes(contactId);

      return {
        ...state,
        ids: isAlreadyFavorite
          ? state.ids.filter((favoriteId) => favoriteId !== contactId)
          : [...state.ids, contactId],
      };
    }
    default:
      return state;
  }
};

export const selectFavoriteContactIds = (state: {
  favorites: FavoritesState;
}) => {
  return state.favorites.ids;
};

export const selectIsFavorite = (contactId: ContactDto['id']) => {
  return (state: { favorites: FavoritesState }) => {
    return state.favorites.ids.includes(contactId);
  };
};

export const selectFavoriteContacts = (state: {
  favorites: FavoritesState;
  contacts: ContactsState;
}): ContactDto[] => {
  const favoriteContactIds = state.favorites.ids;
  const contacts = state.contacts.items;

  return contacts.filter((contact) => favoriteContactIds.includes(contact.id));
};
