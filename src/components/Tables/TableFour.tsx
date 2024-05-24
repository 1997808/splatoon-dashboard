import Image from "next/image";
import { Product } from "@/types/product";

const productData: Product[] = [
  {
    image: "/images/product/product-01.png",
    name: "Chrome",
    value: 300,
    percent: 60,
  },
  {
    image: "/images/product/product-02.png",
    name: "Mobile Safari",
    value: 120,
    percent: 24,
  },
  {
    image: "/images/product/product-03.png",
    name: "Mobile Chrome",
    value: 60,
    percent: 12,
  },
  {
    image: "/images/product/product-04.png",
    name: "Firefox",
    value: 20,
    percent: 4,
  },
];

const TableFour = () => {
  return (
    <div className="h-full rounded-sm border pb-4 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 pt-6 pb-2 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Devices
        </h4>
      </div>

      <div className="grid grid-cols-6 px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-6 flex items-center">
          <p className="font-medium">Browser</p>
        </div>
        <div className="col-span-1 flex justify-end items-center">
          <p className="font-medium">Amount</p>
        </div>
        <div className="col-span-1 flex justify-end items-center">
          <p className="font-medium">%</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 px-4 py-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-6 flex items-center">
            <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center">
              {/* <div className="h-12.5 w-15 rounded-sm">
                <Image
                  src={product.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div> */}
              <div className="w-full h-full relative min-h-8">
                <div className="absolute top-0 left-0 h-full bg-blue-100 dark:bg-gray-500 dark:bg-opacity-15 z-0 rounded" style={{ "width": product.percent + "%" }}></div>
                <div className="absolute top-0 left-0 h-full px-2 py-1 z-10"> {product.name}</div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-end items-center">
            <p className="text-sm text-black dark:text-white">
              {product.value}
            </p>
          </div>
          <div className="col-span-1 flex justify-end items-center">
            <p className="text-sm text-black dark:text-white">{product.percent}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableFour;
