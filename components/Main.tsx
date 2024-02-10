'use client'

import MainResume from "./MainResume";
import OverviewCard from "./OverviewCard";
import LastExpenses from "./LastExpenses";
import LastIncome from "./LastIncomes";
import { auth } from '@/lib/auth'
import { useGetExpenses } from '@/utils/queries/get-expenses';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { Login } from "../utils/api";


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

export default function Main() {
  const { data, isLoading } = useGetExpenses();

  console.log("data", data);
  console.log("isLoading", isLoading);

  return (
    <main className="w-full">
      <MainResume />
      <div className="flex flex-col justify-center items-center">
      <LastExpenses expenses={data} />
      <LastIncome incomes={incomes} />
      <OverviewCard cardName="Visão geral" cardIncomeValue="1.424.90" cardExpenseValue="98.90" />
      </div>
    </main>
  )
}