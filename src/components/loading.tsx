const Loading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-opacity-60 bg-white z-50">
      <div className="size-8 animate-loading inset-0 z-50">
        <div className="bg-transparent absolute size-8 flex flex-col gap-4 justify-center items-center">
          <div className="absolute top-0 w-3 h-1 bg-purple-100 rounded-full rotate-90 -translate-y-1/2"></div>
          <div className="absolute right-0 w-3 h-1 bg-purple-300 rounded-full translate-x-1/2"></div>
          <div className="absolute bottom-0 w-3 h-1 bg-purple-500 rounded-full rotate-90 translate-y-1/2"></div>
          <div className="absolute left-0 w-3 h-1 bg-purple-700 rounded-full -translate-x-1/2"></div>
        </div>
        <div className="bg-transparent absolute size-8 flex flex-col gap-4 justify-center items-center rotate-45">
          <div className="absolute top-0 w-3 h-1 bg-purple-200 rounded-full rotate-90 -translate-y-1/2"></div>
          <div className="absolute right-0 w-3 h-1 bg-purple-400 rounded-full translate-x-1/2"></div>
          <div className="absolute bottom-0 w-3 h-1 bg-purple-600 rounded-full rotate-90 translate-y-1/2"></div>
        </div>
      </div>
    </div>

    // <div className="absolute inset-0 flex justify-center items-center bg-white z-50">
    //   <div className="animate inset-0 z-50 bg-white">
    //     <Loader size={52} className="animate-loading2" />
    //   </div>
    // </div>
  );
};

export default Loading;
