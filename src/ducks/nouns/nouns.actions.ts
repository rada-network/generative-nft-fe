import { NounsActionType } from './nouns.types';

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
