import { Dispatch } from 'react';

export type NounsState = {
  nounInfo?: {
    name: string;
    description: string;
    imageSrc: string;
  };
};

export const NounsActionType = {
  setNounInfo: 'setNounInfo',
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
