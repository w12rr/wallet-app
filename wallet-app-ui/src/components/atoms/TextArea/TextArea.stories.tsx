import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from './TextArea';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'orange',
  placeholder: 'This is textArea',
  onChange: (e) => {
    console.log(e);
  },
};
