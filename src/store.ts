import { WritableDraft } from 'immer/dist/internal';
import produce from 'immer';

type RootState = {
  source: string | null;
  targets: Array<string>;
};

type Store = {
  state: RootState;
};

const store: Store = {
  state: {
    source: null,
    targets: [],
  },
};

export const setState = (cb: (draft: WritableDraft<RootState>) => void) => {
  store.state = produce(store.state, (draft) => cb(draft));
};

export default store;

export const selectState = (state: RootState) => state;

export const selectTargets = (state: RootState) => state.targets;

export const selectSource = (state: RootState) => state.source;

export const useSelector = <R>(cb: (state: RootState) => R) => {
  return cb(store.state);
};
