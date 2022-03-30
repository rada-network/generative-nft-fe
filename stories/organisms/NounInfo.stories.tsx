import { Story, Meta } from '@storybook/react';
import React from 'react';
import { imageBase64Src } from 'stories/assets/base64Image';

import NounInfo, {
  NounInfoProps,
} from '../../src/components/organisms/NounInfo';

export default {
  title: 'Organisms/NounInfo',
  component: NounInfo,
} as Meta;

const Template: Story<NounInfoProps> = (args) => <NounInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'NFT 0',
  imageSrc: imageBase64Src,
  description: 'NFT 0 is a member of the NFT RADA',
};
