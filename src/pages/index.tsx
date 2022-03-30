import { useWeb3Context } from 'src/libs/web3-context';
import type { NextPage } from 'next';
import Home, { HomeProps } from 'src/components/templates/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNounInfo } from 'src/ducks/nouns/nouns.operations';
import Web3 from 'web3';
import { useRouter } from 'next/router';
const HomePage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const web3Context = useWeb3Context();
  const nounsSelector = useSelector((state) => state.nouns);
  const tokenId = router.query.tokenId as string;
  useEffect(() => {
    fetchNounInfo(
      dispatch,
      web3Context.bscWeb3 as Web3,
      parseInt(tokenId ? tokenId : '0'),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const homeProps: HomeProps = {
    name: nounsSelector.nounInfo?.name ?? '',
    description: nounsSelector.nounInfo?.description ?? '',
    imageSrc: nounsSelector.nounInfo?.imageSrc ?? '',
  };

  return <Home {...homeProps} />;
};

export default HomePage;
