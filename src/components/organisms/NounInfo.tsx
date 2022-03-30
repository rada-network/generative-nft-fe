import Image from 'src/components/atoms/Image';
import Text from 'src/components/atoms/Text';
import Title from 'src/components/atoms/Title';
import React, { FunctionComponent, Fragment } from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { useRouter } from 'next/router';
import styles from './NounInfo.module.css';

export type NounInfoProps = {
  name: string;
  imageSrc: string;
  description: string;
};

const NounInfo: FunctionComponent<NounInfoProps> = (props) => {
  const router = useRouter();

  const tokenId = parseInt((router.query.tokenId as string) ?? 0);

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

  return (
    <Fragment>
      <div>
        <div className={styles['c-NounInfoImage']}>
          <Image src={props.imageSrc} />
        </div>
        <div>
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
          <Title>{props.name}</Title>
          <Text>{props.description}</Text>
        </div>
      </div>
    </Fragment>
  );
};

export default NounInfo;
