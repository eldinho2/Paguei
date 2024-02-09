import { XIcon, AlignLeft } from "lucide-react";

export default function AddNewIncome() {
  return (
    <>
    <header className="fixed z-30 w-full flex justify-between items-center bg-[#252628]">
      <div className="flex items-center gap-3">
        <button className="p-4">
          <XIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-lg font-bold">Nova Receita</h1>
      </div>
      <button className="p-4">
        Salvar
      </button>
    </header>
    <main className="pt-14">
      
    </main>
    </>
  );
}