import { NounsAction, NounsActionType, NounsState } from './nouns.types';

export const initialState: NounsState = {};

const reducer = (
  state: NounsState = initialState,
  action: NounsAction,
): NounsState => {
  switch (action.type) {
    case NounsActionType.setNounInfo:
      return {
        ...state,
        nounInfo: action.payload,
      };
    case NounsActionType.setNounAuctionInfo:
      return {
        ...state,
        nounAuctionInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
