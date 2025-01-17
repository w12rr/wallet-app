import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Typography from '../../atoms/Typography/Typography';
import { FormattedMessage } from 'react-intl';
import messages from '../../../i18n/messages';
import Chart from '../../atoms/Chart/Chart';
import { ChartTypeEnum } from '../../../types/enums/chartType.enum';
import TransactionItem from '../../molecules/TransactionItem/TransactionItem';
import { useContext, useEffect, useState } from 'react';
import {
  lineChartMapper,
  pieChartMapper,
} from '../../../helpers/chartDataMapper.helper';
import { TransactionApi } from '../../../api/transaction.api';
import { Transaction } from '../../../models/resources/transaction';
import { ToMoneyChartDto } from '../../../models/dtos/toMoneyChartDto';
import { ToPieChartDto } from '../../../models/dtos/toPieChartDto';
import { UserApi } from '../../../api/user.api';
import ApplicationContext from '../../../contexts/application.context';
import { getApplicationType } from '../../../helpers/checkIsGroup.helper';

type TActualMoney = {
  money: number;
  currencyMark: string;
};
interface IState {
  lastTransactions: Array<Transaction>;
  moneyChart: Array<ToMoneyChartDto>;
  incomeChart: Array<ToPieChartDto>;
  costChart: Array<ToPieChartDto>;
  actualMoney: TActualMoney;
}

const HomePage = () => {
  const appContext = useContext(ApplicationContext);
  const [state, setState] = useState<IState>({
    lastTransactions: [],
    moneyChart: [],
    incomeChart: [],
    costChart: [],
    actualMoney: {
      money: 0,
      currencyMark: '',
    },
  });

  async function getActualMoney() {
    const actualMoney = await UserApi.getActualMoney();
    setState((prev) => ({
      ...prev,
      actualMoney: {
        ...prev.actualMoney,
        currencyMark: actualMoney.data.currencyName,
        money: actualMoney.data.actualMoney,
      },
    }));
  }

  async function getLastTransactions() {
    const lastTransactions = await TransactionApi.getLastTransactions(
      getApplicationType(appContext.state.type),
    );
    setState((prev) => ({
      ...prev,
      lastTransactions: lastTransactions.data.items,
    }));
  }

  async function getMoneyChartData() {
    const moneyChartData = await TransactionApi.getMoneyChartData(
      getApplicationType(appContext.state.type),
    );
    setState((prev) => ({
      ...prev,
      moneyChart: moneyChartData.data,
    }));
  }

  async function getIncomeChartData() {
    const incomeChartData = await TransactionApi.getIncomeChartData(
      getApplicationType(appContext.state.type),
    );
    setState((prev) => ({
      ...prev,
      incomeChart: incomeChartData.data,
    }));
  }

  async function getCostChartData() {
    const costChartData = await TransactionApi.getCostChartData(
      getApplicationType(appContext.state.type),
    );
    setState((prev) => ({
      ...prev,
      costChart: costChartData.data,
    }));
  }

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        await Promise.all([
          getActualMoney(),
          getLastTransactions(),
          getMoneyChartData(),
          getIncomeChartData(),
          getCostChartData(),
        ]);
      }
    })();
  }, [localStorage.getItem('token')]);

  return (
    <MainTemplate>
      <Typography
        size={'l'}
        uppercase
        weight={700}
        color={'lightBlue'}
        letterSpacing={1.2}
      >
        <FormattedMessage {...messages.mainPageAllPrices} />
      </Typography>
      <Typography
        size={'xxl'}
        uppercase
        weight={700}
        color={'orange'}
        letterSpacing={1.6}
      >
        {state.actualMoney.money}
        {state.actualMoney.currencyMark}
      </Typography>
      <Typography size={'l'} uppercase weight={700} color={'lightBlue'}>
        <FormattedMessage {...messages.mainPageLastTransactions} />
      </Typography>
      {state.lastTransactions.slice(0, 2).map((t: any) => (
        <TransactionItem data={t} />
      ))}

      {state.moneyChart.length && (
        <>
          <Typography size={'l'} uppercase weight={700} color={'lightBlue'}>
            <FormattedMessage {...messages.mainPageMoneyChart} />
          </Typography>
          <Chart
            data={lineChartMapper(state.moneyChart).data}
            options={lineChartMapper(state.moneyChart).options}
            type={ChartTypeEnum.LINE}
          />
        </>
      )}

      {state.incomeChart.length && (
        <>
          <Typography size={'l'} uppercase weight={700} color={'lightBlue'}>
            <FormattedMessage {...messages.mainPageIncomeChart} />
          </Typography>
          <Chart
            data={pieChartMapper(state.incomeChart)}
            type={ChartTypeEnum.PIE}
          />
        </>
      )}

      {state.costChart.length && (
        <>
          <Typography size={'l'} uppercase weight={700} color={'lightBlue'}>
            <FormattedMessage {...messages.mainPageCostChart} />
          </Typography>
          <Chart
            data={pieChartMapper(state.costChart)}
            type={ChartTypeEnum.PIE}
          />
        </>
      )}
    </MainTemplate>
  );
};

export default HomePage;
