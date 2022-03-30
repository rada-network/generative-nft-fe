import NounInfo from 'src/components/organisms/NounInfo';
import React, { FunctionComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

const styles = css`
  /* stylelint-disable */
`;

export type HomeProps = {
  name: string;
  imageSrc: string;
  description: string;
};

const Home: FunctionComponent<HomeProps> = (props) => {
  return (
    <Fragment>
      <NounInfo
        name={props.name}
        imageSrc={props.imageSrc}
        description={props.description}
      />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

export default Home;
