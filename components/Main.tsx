import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { auth } from '@/lib/auth'

const expenses = [
  {
    id: 1,
    name: 'Aluguel',
    value: '1200.00',
    date: '2021-10-10',
    fixed: true,
    fixedDate: '12:45'
  },
  {
    id: 2,
    name: 'Mercado',
    value: '98.90',
    date: '2021-10-10',
    fixed: false,
    fixedDate: '12:45'
  },
  {
    id: 3,
    name: 'Luz',
    value: '98.90',
    date: '2021-10-10',
    fixed: true,
    fixedDate: '12:45'
  },
  {
    id: 4,
    name: 'Água',
    value: '98.90',
    date: '2021-10-10',
    fixed: false,
    fixedDate: '12:45'
  
  },
  {
    id: 5,
    name: 'Internet',
    value: '98.90',
    date: '2021-10-10',
    fixed: true,
    fixedDate: '12:45'
  },
  {
    id: 6,
    name: 'Telefone',
    value: '98.90',
    date: '2021-10-10',
    fixed: false,
    fixedDate: '12:45'
  
  }
]

const incomes = [{
  id: 1,
  name: 'Salário',
  value: '1200.00',
  date: '2021-10-10',
  fixed: true,
  fixedDate: '12:45'
},
{
  id: 2,
  name: 'Freelancer',
  value: '98.90',
  date: '2021-10-10',
  fixed: false,
  fixedDate: '12:45'
},
{
  id: 3,
  name: 'Investimento',
  value: '98.90',
  date: '2021-10-10',
  fixed: true,
  fixedDate: '12:45'
},
{
  id: 4,
  name: 'Venda de objetos',
  value: '98.90',
  date: '2021-10-10',
  fixed: false,
  fixedDate: '12:45'

},
{
  id: 5,
  name: 'Renda extra',
  value: '98.90',
  date: '2021-10-10',
  fixed: true,
  fixedDate: '12:45'
},
{
  id: 6,
  name: 'Bônus',
  value: '98.90',
  date: '2021-10-10',
  fixed: false,
  fixedDate: '12:45'
}]

export default async function Main() {
  const session = await auth()


  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <h1>
        {session?.user.accessToken}
      </h1>
      <LastExpenses expenses={expenses} />
      <LastIncome incomes={incomes} />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      </div>
    </main>
  )
}