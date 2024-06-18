'use client'

import React, { useState, useEffect } from "react";
import { Loader2Icon } from 'lucide-react';
import { useUpdateExpense } from '@/utils/queries/update-expense';

interface TogglePaidStatusProps {
  id: string;
  initialIsPaid: boolean;
}

export const TogglePaidStatus: React.FC<TogglePaidStatusProps> = ({ id, initialIsPaid }) => {
  const [isPaid, setIsPaid] = useState(initialIsPaid);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsPaid(initialIsPaid);
  }, [initialIsPaid]);

  useEffect(() => {
    console.log(isPaid);
  }, [isPaid]);

  const { updateExpense } = useUpdateExpense();

  const toggleIsPaid = async (id: string, newIsPaid: boolean) => {
    setLoading(true);
    await updateExpense({ id, isPaid: newIsPaid });
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
