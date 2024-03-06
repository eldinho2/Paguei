import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Skeleton1() {
  return (
    <div className="flex items-center justify-center h-full p-6 animate-pulse">
      <div className="h-20 rounded-3xl bg-gray-200 dark:bg-gray-700 w-[100px]"></div>

      <div className="pl-5">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[80px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[50px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[80px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px]"></div>
      </div>
    </div>
  );
}

export function Skeleton2() {
  return (
    <div className="flex justify-center gap-2 flex-col p-6 animate-pulse">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[235px] mb-1.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[230px] mb-1.5"></div>
    </div>
  );
}
