const Loading = () => {
  return (
    <div className="flex-center min-h-96">
      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Outer glow */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/20 blur-xl" />

        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600 dark:border-green-800 dark:border-t-green-500" />

        {/* Center dot */}
        <div className="absolute h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400" />
      </div>
    </div>
  );
};

export default Loading;
