export type AddBillFormProps = {
  bill: "expense" | "income";
};

export type FormInputProps = {
  form?: any;
  fixed?: boolean;
  parcelaFormIsOpen?: boolean;
  setParcelaFormIsOpen?: any;
  bill?: "expense" | "income";
};