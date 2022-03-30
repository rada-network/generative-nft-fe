import { Story, Meta } from '@storybook/react';
import React from 'react';
import { imageBase64Src } from 'stories/assets/base64Image';

import Home, { HomeProps } from '../../src/components/templates/Home';

export default {
  title: 'Templates/Home',
  component: Home,
} as Meta;

const Template: Story<HomeProps> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'NFT 0',
  imageSrc: imageBase64Src,
  description: 'NFT 0 is a member of the NFT RADA',
};
