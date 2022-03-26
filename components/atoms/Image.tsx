import React, { FunctionComponent, ImgHTMLAttributes, Fragment } from 'react';

type ImageShapeType = 'circle' | 'square';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  imageShapeType?: ImageShapeType;
};

const getClassName = (imageShapeType: ImageShapeType = 'square') => {
  switch (imageShapeType) {
    case 'circle':
      return 'circle';
    case 'square':
      return 'square';
  }
};

const Image: FunctionComponent<ImageProps> = ({ imageShapeType, ...props }) => (
  <Fragment>
    <img className={getClassName(imageShapeType)} {...props} />
  </Fragment>
);

export default Image;
