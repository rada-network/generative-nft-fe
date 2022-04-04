import {
  callCurrentNftId,
  callDataUri,
  callOwnerOf,
} from 'src/contracts/RadaToken';
import { Dispatch } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import * as actions from './nouns.actions';
import { NounsAction } from './nouns.types';
import { callAuction } from 'src/contracts/RadaAuctionHouse';
import { fromUnixTime } from 'date-fns';

export const fetchCurrentTokenId = async (
  dispatch: Dispatch<NounsAction>,
  web3: Web3,
) => {
  try {
    const data = await callCurrentNftId(web3);
    const currentTokenId = parseInt(data);

    dispatch(actions.setCurrentTokenId(currentTokenId));
  } catch (e) {
    console.error(e);
  }
};

export const fetchNounInfo = async (
  dispatch: Dispatch<NounsAction>,
  web3: Web3,
  tokenId: number,
) => {
  try {
    const data = await callDataUri(web3, tokenId);
    const buffer = Buffer.from(
      data.replace(/^data:\w+\/\w+;base64,/, ''),
      'base64',
    );
    const parsedData = JSON.parse(buffer.toString('utf-8'));

    const ownerAddress = await callOwnerOf(web3, tokenId);

    dispatch(
      actions.setNounInfoAction(
        parsedData.name,
        parsedData.description,
        parsedData.image,
        ownerAddress,
      ),
    );
  } catch (e) {
    dispatch(
      actions.setNounInfoAction(
        'unknown',
        'unknown',
        'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif',
        '',
      ),
    );
  }
};

export const fetchNounAuctionInfo = async (
  dispatch: Dispatch<NounsAction>,
  web3: Web3,
) => {
  try {
    const data = await callAuction(web3);
    const nftId = parseInt(data.nftId);
    const amount = new BigNumber(data.amount);
    const startTime = fromUnixTime(parseInt(data.startTime));
    const endTime = fromUnixTime(parseInt(data.endTime));
    const bidder = data.bidder;
    const settled = data.settled;

    dispatch(
      actions.setNounAuctionAction(
        nftId,
        amount,
        startTime,
        endTime,
        bidder,
        settled,
      ),
    );
  } catch (e) {
    console.error('Error fetchNounAuctionInfo: ', e);
  }
};
