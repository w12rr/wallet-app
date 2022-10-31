import InputField from '../../molecules/InputField/InputField';
import AvatarPicker from '../../molecules/avatarPicker/AvatarPicker';
import messages from '../../../i18n/messages';
import Typography from '../../atoms/Typography/Typography';
import { FormattedMessage } from 'react-intl';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import {
  StyledButtonWrapper,
  StyledFormItem,
  Wrapper,
} from './RegisterForm.styles';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { registerUser } from '../../../redux/slices/auth.slice';

export type TSelectedIcon = 0 | 1 | 2 | 3 | 4;

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const initialValues = useMemo(
    () => ({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      iconId: 0 as TSelectedIcon,
    }),
    [],
  );
  const { values, handleChange } = useForm<typeof initialValues>(initialValues);

  const onSubmit = useCallback(async () => {
    dispatch(registerUser(values));
  }, [values]);

  return (
    <Wrapper>
      <StyledFormItem>
        <InputField
          label={{ ...messages.username }}
          variant={'light'}
          name={'username'}
          onChange={(e) => handleChange(e, 'username')}
        />
      </StyledFormItem>
      <StyledFormItem>
        <InputField
          label={{ ...messages.email }}
          variant={'light'}
          name={'email'}
          type={'email'}
          onChange={(e) => handleChange(e, 'email')}
        />
      </StyledFormItem>
      <StyledFormItem>
        <InputField
          label={{ ...messages.password }}
          variant={'light'}
          type={'password'}
          name={'password'}
          onChange={(e) => handleChange(e, 'password')}
        />
      </StyledFormItem>
      <StyledFormItem>
        <InputField
          label={{ ...messages.confirmPassword }}
          variant={'light'}
          name={'confirmPassword'}
          type={'password'}
          onChange={(e) => handleChange(e, 'confirmPassword')}
        />
      </StyledFormItem>
      <StyledFormItem>
        <AvatarPicker selected={values.icon} onClick={handleChange} />
      </StyledFormItem>
      <StyledFormItem>
        <Typography size={'xs'} underline color={'lightBlue'}>
          <FormattedMessage {...messages.redirectLogin} />
        </Typography>
      </StyledFormItem>
      <StyledButtonWrapper>
        <Button type={'button'} disabled={false} onClick={onSubmit}>
          <FormattedMessage {...messages.register} />
        </Button>
      </StyledButtonWrapper>
    </Wrapper>
  );
};

export default RegisterForm;