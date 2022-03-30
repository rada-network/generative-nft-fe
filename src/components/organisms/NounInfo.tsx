import Image from 'src/components/atoms/Image';
import Text from 'src/components/atoms/Text';
import Title from 'src/components/atoms/Title';
import React, { FunctionComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

export type NounInfoProps = {
  name: string;
  imageSrc: string;
  description: string;
};

const NounInfo: FunctionComponent<NounInfoProps> = (props) => {
  return (
    <Fragment>
      <div>
        <div>
          <Image src={props.imageSrc} />
        </div>
        <div>
          <Title>{props.name}</Title>
          <Text>{props.description}</Text>
        </div>
      </div>
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default NounInfo;
