import useCounterStore from "../store";

const Counter: React.FC = () => {
  const { counter, increment, reset } = useCounterStore();
  return (
    <div className="m-4">
      Counter ({counter})
      <button
        className="ml-4 text-white bg-gray-800 hover:bg-gray-900   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={increment}
      >
        Increment
      </button>
      <button
        className="text-white bg-gray-800 hover:bg-gray-900   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
