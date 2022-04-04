import BigNumber from 'bignumber.js';
import { Dispatch } from 'react';
import {
  executeCreateBid,
  executeSettleCurrentAndCreateNewAuction,
} from 'src/contracts/RadaAuctionHouse';
import Web3 from 'web3';
import { fetchNounAuctionInfo, fetchNounInfo } from '../nouns/nouns.operations';
import * as actions from './wallets.actions';
import { WalletsAction } from './wallets.types';

export const connectWallet = (
  dispatch: Dispatch<WalletsAction>,
  provider: any,
  web3: Web3,
  account: string,
) => {
  dispatch(actions.connectWalletAction(provider, web3, account));
};

export const settleAuction = async (
  dispatch: Dispatch<WalletsAction>,
  contextWeb3: Web3,
  currentTokenId: number,
  walletWeb3: Web3,
  account: string,
) => {
  try {
    const result = await executeSettleCurrentAndCreateNewAuction(
      walletWeb3,
      account,
    );
    alert(`Transaction success. Hash: ${result.transactionHash}`);

    await fetchNounAuctionInfo(dispatch, contextWeb3);
    await fetchNounInfo(dispatch, contextWeb3, currentTokenId);
  } catch (e) {
    console.error(e);
  }
};

export const createBid = async (
  dispatch: Dispatch<WalletsAction>,
  contextWeb3: Web3,
  currentTokenId: number,
  walletWeb3: Web3,
  account: string,
  wei: BigNumber,
) => {
  try {
    const result = await executeCreateBid(
      walletWeb3,
      account,
      wei,
      currentTokenId,
    );
    alert(`Transaction success. Hash: ${result.transactionHash}`);

    await fetchNounAuctionInfo(dispatch, contextWeb3);
    await fetchNounInfo(dispatch, contextWeb3, currentTokenId);
  } catch (e) {
    console.error(e);
  }
};
