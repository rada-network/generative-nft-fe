import BigNumber from 'bignumber.js';
import Image from 'src/components/atoms/Image';
import Text from 'src/components/atoms/Text';
import Title from 'src/components/atoms/Title';
import React, { FunctionComponent, Fragment } from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { useRouter } from 'next/router';
import styles from './NounInfo.module.css';
import Web3 from 'web3';
import { formatISO, isAfter, isBefore } from 'date-fns';
import ConnectWallet from './ConnectWallet';
import { getCurrentTime } from 'src/libs/dateUtil';
import { useDispatch, useSelector } from 'react-redux';
import { settleAuction } from 'src/ducks/wallets/wallets.operations';
import { useWeb3Context } from 'src/libs/web3-context';
import CreateBidForm from './CreateBidForm';

export type NounInfoProps = {
  nounInfo: {
    name: string;
    description: string;
    imageSrc: string;
  };
  nounAuctionInfo: {
    nftId: number;
    amount: BigNumber;
    startTime: Date;
    endTime: Date;
    bidder: string;
    settled: boolean;
  };
};

const NounInfo: FunctionComponent<NounInfoProps> = ({
  nounInfo,
  nounAuctionInfo,
}) => {
  const router = useRouter();
  const web3Context = useWeb3Context();

  const tokenId = parseInt((router.query.tokenId as string) ?? 0);
  const now = getCurrentTime();
  const walletsSelector = useSelector((state) => state.wallets);
  const dispatch = useDispatch();

  const goLeft: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (
    event,
  ) => {
    event.preventDefault();
    if (tokenId === 0) {
      return;
    }

    router.push({
      pathname: router.pathname,
      query: { ...router.query, tokenId: (tokenId - 1).toString() },
    });
  };

  const goRight: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void = (event) => {
    event.preventDefault();

    router.push({
      pathname: router.pathname,
      query: { ...router.query, tokenId: (tokenId + 1).toString() },
    });
  };

  const settleAuctionClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void = (event) => {
    event.preventDefault();

    settleAuction(
      dispatch,
      web3Context.bscWeb3 as Web3,
      tokenId,
      walletsSelector.walletInfo?.web3 as Web3,
      walletsSelector.walletInfo?.account as string,
    );
  };

  return (
    <Fragment>
      <div className="container mx-auto">
        <div className="flex m-8 ">
          <ConnectWallet />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex m-8">
          <div className={`${styles['c-NounInfoImage']} flex-1 w-64`}>
            <Image src={nounInfo.imageSrc} />
          </div>
          <div className={`flex-1 w-32 ml-8`}>
            <div>
              <Button
                className={styles['btn-blue']}
                onClick={goLeft}
                disabled={tokenId <= 0}
              >
                <Icon className="fas fa-angle-left" />
              </Button>
              <Button className={styles['btn-blue']} onClick={goRight}>
                <Icon className="fas fa-angle-right" />
              </Button>
            </div>
            <Title className="size-medium">{nounInfo.name}</Title>
            <Text>{nounInfo.description}</Text>

            {tokenId === nounAuctionInfo.nftId && !nounAuctionInfo.settled && (
              <Fragment>
                <div>
                  <Title className="size-small">Current Bid</Title>
                  <Text>
                    {Web3.utils.fromWei(
                      nounAuctionInfo.amount.toString(),
                      'ether',
                    )}
                  </Text>
                </div>
                <div>
                  <Title className="size-small">Auction end in</Title>
                  {/* TODO: use countdown component */}
                  <Text>{formatISO(nounAuctionInfo.endTime)}</Text>
                </div>

                {isAfter(now, nounAuctionInfo.endTime) &&
                  !nounAuctionInfo.settled &&
                  walletsSelector.walletInfo && (
                    <div className="mt-8">
                      <Button
                        className={styles['btn-blue']}
                        onClick={settleAuctionClick}
                      >
                        Settle auction
                      </Button>
                    </div>
                  )}

                {isBefore(now, nounAuctionInfo.endTime) &&
                  nounAuctionInfo.endTime &&
                  walletsSelector.walletInfo && (
                    <CreateBidForm tokenId={tokenId} />
                  )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NounInfo;
