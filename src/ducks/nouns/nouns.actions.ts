import { NounsActionType } from './nouns.types';
import BigNumber from 'bignumber.js';

export const setNounInfoAction = (
  name: string,
  description: string,
  imageSrc: string,
) => {
  return {
    type: NounsActionType.setNounInfo,
    payload: {
      name,
      description,
      imageSrc,
    },
  };
};

export const setNounAuctionAction = (
  nftId: number,
  amount: BigNumber,
  startTime: Date,
  endTime: Date,
  bidder: string,
  settled: boolean,
) => {
  return {
    type: NounsActionType.setNounAuctionInfo,
    payload: {
      nftId,
      amount,
      startTime,
      endTime,
      bidder,
      settled,
    },
  };
};
