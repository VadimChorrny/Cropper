import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../rootReducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const persistReducer_ = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistReducer_,
  composeWithDevTools(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);
