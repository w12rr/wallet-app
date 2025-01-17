import CardWrapper from '../../atoms/CardWrapper/CardWrapper';
import InputField from '../../molecules/InputField/InputField';
import SelectField from '../../molecules/SelectField/SelectField';
import Button from '../../atoms/Button/Button';
import { FormattedMessage } from 'react-intl';
import messages from '../../../i18n/messages';
import Typography from '../../atoms/Typography/Typography';
import AvatarPicker from '../../molecules/avatarPicker/AvatarPicker';
import { FormWrapper } from './CreateGroupForm.styles';
import { TSelectItem } from '../../atoms/Select/Select';
import useForm from '../../../hooks/useForm';
import { useEffect, useState } from 'react';
import { CurrencyDto } from '../../../models/dtos/currencyDto';
import { CurrencyApi } from '../../../api/currency.api';
import { parseDataToSelect } from '../../../helpers/parseDataToSelect.helper';
import { GroupApi } from '../../../api/group.api';
import { useNavigate } from 'react-router-dom';
import { RoutesName } from '../../../const/routesName';

const maxGroupMember: TSelectItem[] = [
  {
    key: 2,
    description: '2',
  },
  {
    key: 3,
    description: '3',
  },
  {
    key: 5,
    description: '5',
  },
  {
    key: 10,
    description: '10',
  },
];

const CreateGroupForm = () => {
  const [currencies, setCurrencies] = useState<CurrencyDto[]>([]);
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    maxMembers: 2,
    icon: 1,
    currencyId: '',
  };

  const { values, handleChange } = useForm<typeof initialValues>(initialValues);

  useEffect(() => {
    (async () => {
      const data = await CurrencyApi.getCurrency();
      setCurrencies(data.data);
    })();
  }, []);

  const onSubmit = async () => {
    const data = await GroupApi.createGroup(values);
    localStorage.setItem('groupId', data.data.groupId.toString());
    localStorage.setItem('userRole', data.data.role);
  };

  return (
    <CardWrapper
      gradientColor
      close={() => navigate(RoutesName.CREATE_FIND_GROUP)}
    >
      <FormWrapper>
        <InputField
          label={{ ...messages.createGroupFormName }}
          variant={'dark'}
          name={'name'}
          onChange={(e) => handleChange(e, 'name')}
        />

        <Typography size={'m'} weight={700}>
          <FormattedMessage {...messages.createGroupFormGroupIcon} />
        </Typography>

        <AvatarPicker
          selected={values.icon}
          onClick={handleChange}
          variant={'group'}
        />

        <SelectField
          selectItems={maxGroupMember}
          label={{ ...messages.createGroupFormMaxMembers }}
          name={'maxMember'}
          onChange={handleChange}
        />
        <SelectField
          selectItems={parseDataToSelect(currencies)}
          label={{ ...messages.createGroupFormDefaultCurrencies }}
          name={'currencyId'}
          onChange={handleChange}
        />
        <Button color={'darkBlue'} onClick={onSubmit}>
          <FormattedMessage {...messages.buttonCreate} />
        </Button>
      </FormWrapper>
    </CardWrapper>
  );
};

export default CreateGroupForm;
