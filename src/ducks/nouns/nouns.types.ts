import { Dispatch } from 'react';
import BigNumber from 'bignumber.js';

export type NounsState = {
  nounInfo?: {
    name: string;
    description: string;
    imageSrc: string;
  };
  nounAuctionInfo?: {
    nftId: number;
    amount: BigNumber;
    startTime: Date;
    endTime: Date;
    bidder: string;
    settled: boolean;
  };
};

export const NounsActionType = {
  setNounInfo: 'setNounInfo',
  setNounAuctionInfo: 'setNounAuctionInfo',
};

export type NounsActionType =
  typeof NounsActionType[keyof typeof NounsActionType];
export type NounsAction = { type: NounsActionType; payload?: any };

declare module 'react-redux' {
  interface DefaultRootState {
    nouns: NounsState;
  }
  export function useDispatch<TDispatch = Dispatch<NounsAction>>(): TDispatch;
}
