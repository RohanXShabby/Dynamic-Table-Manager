import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createTransform, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { enableMapSet } from 'immer';
import tableReducer from './tableSlice';
import { TableState } from '@/types/table';

// Enable Immer MapSet plugin for Set/Map support
enableMapSet();

// Transform to handle Set serialization/deserialization
const SetTransform = createTransform<TableState, TableState>(
  // Transform state on its way to being serialized and persisted
  (inboundState) => {
    return {
      ...inboundState,
      editingRows: Array.from(inboundState.editingRows || []) as any,
    };
  },
  // Transform state being rehydrated
  (outboundState) => {
    return {
      ...outboundState,
      editingRows: new Set(outboundState.editingRows || []),
    };
  },
  // Define which reducers this transform gets called for
  { whitelist: ['table'] }
);

const rootReducer = combineReducers({
  table: tableReducer,
});

type RootReducerState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['table'], // Only persist table state
  transforms: [SetTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['table.editingRows'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
