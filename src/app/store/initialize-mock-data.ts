import type { AppThunk } from '@app/store/types';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from '@shared/mock';
import { setContactsItems } from '@entities/contact';
import { setGroupContactsItems } from '@entities/group';
import { setFavoriteContactIds } from '@entities/favorites';

export const initializeMockData = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.contacts.items.length === 0) {
      dispatch(setContactsItems(DATA_CONTACT));
    }

    if (state.groups.items.length === 0) {
      dispatch(setGroupContactsItems(DATA_GROUP_CONTACT));
    }

    if (state.favorites.ids.length === 0) {
      dispatch(
        setFavoriteContactIds([
          DATA_CONTACT[0].id,
          DATA_CONTACT[1].id,
          DATA_CONTACT[2].id,
          DATA_CONTACT[3].id,
        ]),
      );
    }
  };
};
