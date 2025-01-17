import Select, { TSelectItem } from '../../atoms/Select/Select';
import { TFormattedMessage } from '../../../types/types';
import Typography from '../../atoms/Typography/Typography';
import { FormattedMessage } from 'react-intl';

export type TProps = {
  selectItems: TSelectItem[];
  label: TFormattedMessage;
  name: string;
  onChange?: any;
};

const SelectField = (props: TProps) => {
  return (
    <div>
      <label>
        <Typography size={'m'} weight={700}>
          <FormattedMessage {...props.label} />
        </Typography>
      </label>
      <Select
        items={props.selectItems}
        onChange={props.onChange}
        isRounded
        name={props.name}
      />
    </div>
  );
};

export default SelectField;
