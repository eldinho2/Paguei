type ValueLabelsProps = {
  label: string;
  value: string;
  className?: string;
};

export default function ValueLabels({label, value, className}: ValueLabelsProps) {
  return (
    <>
      <span className={className}>
        <p className="">{label}</p>
        <strong className="">
          <span className="pr-1">R$</span>
          {value}
        </strong>
      </span>
    </>
  );
}
