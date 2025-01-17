import {
  ButtonWrapper,
  FirstRow,
  SecondRow,
  StyledEditIcon,
  Wrapper,
} from './SavedTransaction.styles';
import Typography from '../../atoms/Typography/Typography';
import { cutString } from '../../../utils/utils';
import Button from '../../atoms/Button/Button';
import { Currency } from '../../../models/resources/currency';
import { FormattedMessage } from 'react-intl';
import messages from '../../../i18n/messages';
import { Category } from '../../../models/resources/category';

export type TProps = {
  id: string;
  title: string;
  category: Category;
  price: number;
  currency: Currency;
  backgroundColor?: string;
  textColor?: string;
  description?: string;
  addTransaction: (id: string) => void;
};

const SavedTransaction = (props: TProps) => {
  return (
    <Wrapper backgroundColor={props.backgroundColor}>
      <FirstRow>
        <Typography customColor={props.textColor} size={'l'} weight={700}>
          {props.title}
        </Typography>
      </FirstRow>
      <SecondRow>
        <Typography
          customColor={props.textColor}
          weight={700}
          size={'m'}
          uppercase
        >
          {props.category.name}
        </Typography>
        <Typography customColor={props.textColor} size={'m'} weight={700}>
          {props.price}
          {props.currency.mark}
        </Typography>
      </SecondRow>
      {props.description && (
        <div>
          <Typography customColor={props.textColor} size={'s'} weight={700}>
            {cutString(props.description, 200)}
          </Typography>
        </div>
      )}
      <ButtonWrapper>
        <StyledEditIcon onClick={() => {}} />
        <Button
          customColor={props.textColor}
          type={'button'}
          onClick={() => props.addTransaction(props.id)}
        >
          <FormattedMessage {...messages.buttonAdd} />
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SavedTransaction;
