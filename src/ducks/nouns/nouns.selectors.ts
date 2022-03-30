import { createSelector } from 'reselect';
import { NounsState } from './nouns.types';

////////
// Selectors
////////

const nounInfoSelector = (state: NounsState) => state.nounInfo;

////////
// Create selectors
////////

// common
export const getNounInfo = createSelector(
  nounInfoSelector,
  (nounInfo) => nounInfo,
);
