import { combineReducers } from 'redux';
import { contactsReducer } from '@entities/contact/model/contacts';
import { groupsReducer } from '@entities/group/model/groups';
import { favoritesReducer } from '@entities/favorites/model/favorites';
import { filtersReducer } from '@features/filters/model/filters';

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  favorites: favoritesReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
