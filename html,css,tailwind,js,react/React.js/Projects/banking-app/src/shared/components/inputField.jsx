const Input = ({ label,errorMsg, ...props }) => {
  return (
    <>
      <p className="flex justify-between gap-5 my-2 text-xl items-center ">
        <label className="font-bold text-stone-200">{label}</label>
        <input
          {...props}
          className="p-1 w-64 bg-stone-200 text-stone-600 focus:outline-none rounded-md"
        />
      </p>
      {errorMsg && <p className="text-sm text-red-500 pb-1">{errorMsg}</p>}
    </>
  );
};
export default Input;