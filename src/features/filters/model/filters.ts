import type { FilterFormValues } from './types';
import type { ContactsState } from '@entities/contact/model/contacts';
import type { GroupsState } from '@entities/group/model/groups';
import { applyContactFilters } from '../lib/apply-contact-filters';

export interface FiltersState {
  nameQuery: string;
  groupId: string;
}

const FILTERS_SET = 'filters/set' as const;
const FILTERS_RESET = 'filters/reset' as const;

export const setFilters = (values: Partial<FilterFormValues>) => {
  return {
    type: FILTERS_SET,
    payload: {
      nameQuery: values.name ?? '',
      groupId: values.groupId ?? '',
    },
  };
};

export const resetFilters = () => {
  return {
    type: FILTERS_RESET,
  };
};

type FiltersAction =
  | ReturnType<typeof setFilters>
  | ReturnType<typeof resetFilters>;

const initialState: FiltersState = {
  nameQuery: '',
  groupId: '',
};

export const filtersReducer = (
  state: FiltersState = initialState,
  action: FiltersAction,
): FiltersState => {
  switch (action.type) {
    case FILTERS_SET:
      return action.payload;
    case FILTERS_RESET:
      return initialState;
    default:
      return state;
  }
};

export const selectFilters = (state: { filters: FiltersState }) => {
  return state.filters;
};

export const selectFilteredContacts = (state: {
  contacts: ContactsState;
  groups: GroupsState;
  filters: FiltersState;
}) => {
  return applyContactFilters({
    contacts: state.contacts.items,
    groupContactsList: state.groups.items,
    filters: state.filters,
  });
};
