'use client'

import React, { useState, useEffect } from "react";
import { Loader2Icon } from 'lucide-react';
import { useUpdateExpense } from '@/utils/queries/update-expense';
import { useUpdateIncome } from '@/utils/queries/update-income';

interface TogglePaidStatusProps {
  id: string;
  initialIsPaid: boolean;
  billType: string;
}

export const TogglePaidStatus: React.FC<TogglePaidStatusProps> = ({ id, initialIsPaid, billType }) => {
  const [isPaid, setIsPaid] = useState(initialIsPaid);
  const [loading, setLoading] = useState(false);

  console.log('billType', billType);
  

  useEffect(() => {
    setIsPaid(initialIsPaid);
  }, [initialIsPaid]);

  const { updateExpense } = useUpdateExpense();
  const { updateIncome } = useUpdateIncome();



  const toggleIsPaid = async (id: string, newIsPaid: boolean) => {
    setLoading(true);
    if (billType === 'income') await updateIncome({ id, isPaid: newIsPaid });
    if (billType === 'expense') await updateExpense({ id, isPaid: newIsPaid });
    setLoading(false);
    setIsPaid(newIsPaid);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleClick} className="w-8 h-4">
      {loading ? (
        <Loader2Icon className="w-4 h-4 animate-spin" />
      ) : (
        <input
          type="checkbox"
          checked={isPaid}
          onChange={(e) => toggleIsPaid(id, e.target.checked)}
          className="form-checkbox h-4 w-4"
        />
      )}
    </div>
  );
};

export default TogglePaidStatus;
