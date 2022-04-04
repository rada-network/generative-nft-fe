import React, { FunctionComponent, Fragment, useRef } from 'react';
import Button from '../atoms/Button';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { createBid } from 'src/ducks/wallets/wallets.operations';
import Input from '../atoms/Input';
import BigNumber from 'bignumber.js';
import { useWeb3Context } from 'src/libs/web3-context';

export type CreateBidFormProps = {
  tokenId: number;
};

const CreateBidForm: FunctionComponent<CreateBidFormProps> = ({ tokenId }) => {
  const dispatch = useDispatch();
  const web3Context = useWeb3Context();
  const walletsSelector = useSelector((state) => state.wallets);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const value = inputRef.current?.value ?? '0';
    const wei = new BigNumber(Web3.utils.toWei(value, 'ether'));
    createBid(
      dispatch,
      web3Context.bscWeb3 as Web3,
      tokenId,
      walletsSelector.walletInfo?.web3 as Web3,
      walletsSelector.walletInfo?.account as string,
      wei,
    );
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label>Amount</label>
        <Input type="text" innerRef={inputRef} />

        <Button type="submit">Create Bid</Button>
      </form>
    </Fragment>
  );
};

export default CreateBidForm;
