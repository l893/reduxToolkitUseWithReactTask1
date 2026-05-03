export type { FavoriteContactsDto } from './model/types';
export {
  favoritesReducer,
  selectFavoriteContactIds,
  selectIsFavorite,
  setFavoriteContactIds,
  toggleFavoriteContactId,
} from './model/favorites';
