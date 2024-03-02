interface DataItem {
  createdAt: string;
  amount: number;
}

interface FilterByMonthProps {
  data: DataItem[];
  month: number;
}

export const FilterByMonth = ({ data, month }: FilterByMonthProps): number => {  
  const result = data?.reduce((acc, data) => {

    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(
      new Date().getFullYear(),
      month,
      0,
      23,
      59,
      59,
      999,
    );
    
    const date = new Date(data.createdAt);
    if (date >= startDate && date <= endDate) {
      return acc + data.amount;
    }
  
    return acc;
  } , 0);

  return result;
}