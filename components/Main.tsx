import ValueLabels from "./ui/ValueLabels";

export default function Main() {
  return (
    <main className="">
      <section className="flex justify-center h-36 w-full bg-[#252628]">
        <div className="flex gap-4">
          <ValueLabels label="Inicial" value="10.000,00" className="transform scale-90 translate-y-0 text-white/70" />
          <ValueLabels label="Saldo" value="4.000,00" className="transform scale-100 translate-y-2 z-10 text-white" />
          <ValueLabels label="Previsto" value="2.000,00" className="transform scale-90 translate-y-0 text-white/70" />
        </div>
      </section>
      <section></section>
    </main>
  );
}
