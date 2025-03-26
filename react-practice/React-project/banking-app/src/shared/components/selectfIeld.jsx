const Select = ({ label, children, ...props }) => {
  return (
    <p className="flex justify-between gap-5 my-2 text-xl items-center">
      <label className="font-bold text-stone-200">{label}</label>
      <select
        {...props}
        className="p-1 w-64 bg-stone-200 text-stone-600 focus:outline-none rounded-md"
        
      >
        {children}
        
      </select>
    </p>
  );
};

export default Select;
