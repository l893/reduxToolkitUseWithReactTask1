import type { GroupContactsDto } from './types';

export interface GroupsState {
  items: GroupContactsDto[];
}

const GROUPS_SET_ITEMS = 'groups/setItems' as const;

export const setGroupContactsItems = (items: GroupContactsDto[]) => {
  return {
    type: GROUPS_SET_ITEMS,
    payload: items,
  };
};

type GroupsAction = ReturnType<typeof setGroupContactsItems>;

const initialState: GroupsState = {
  items: [],
};

export const groupsReducer = (
  state: GroupsState = initialState,
  action: GroupsAction,
): GroupsState => {
  switch (action.type) {
    case GROUPS_SET_ITEMS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const selectGroupContactsItems = (state: { groups: GroupsState }) => {
  return state.groups.items;
};
