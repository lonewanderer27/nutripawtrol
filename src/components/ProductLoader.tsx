const ProductLoader = () => {
  return (
    <div className="card card-bordered card-compact border-black border-2 text-primary-content w-48 h-auto mr-3 mb-2 rounded-lg">
      <figure className="h-[250px]">
        <div className="skeleton w-full h-full rounded-lg"></div>
      </figure>
      <div className="card-body bg-[#3a619c] w-48 rounded-lg rounded-t-none m-[-2px]">
        <div className="skeleton w-24 h-6 mb-2"></div>
        <div className="skeleton w-full h-4 mb-2"></div>
        <div className="skeleton w-20 h-8  m-2 absolute bottom-0 right-0 mb-32"></div>
      </div>
    </div>
  );
};

export default ProductLoader;
