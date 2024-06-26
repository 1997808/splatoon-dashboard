import dayjs from "dayjs";
import Image from "next/image";

interface Bills {
  logo: string;
  item: string;
  description: string;
  paymentMethod: number;
  lastCharge: string;
  dueDate: string;
  amount: number;
}

// create an array of 5 demo objects for BillsDemoData with monthly or yearly subscription logo, category, item, description amount, paymentMethod, lastCharge and dueDate. add some item like electric, internet, a laptop payment and renting apartments
const BillsDemoData: Bills[] = [
  {
    logo: "https://cdn-1.webcatalog.io/catalog/netflix/netflix-icon-filled-256.png?v=1714773003029",
    item: "Netflix",
    description: "I buy a monthly subscription for my family to watch movies and series. I love the content and the quality of the movies and series. I can watch it on my phone, laptop, TV and tablet. I can also download movies and series to watch offline. I can watch it in HD and Ultra HD. I can watch it on multiple devices at the same time. I can cancel it anytime. I can watch it without ads.",
    paymentMethod: 1,
    lastCharge: "2021-09-15",
    dueDate: "2021-10-15",
    amount: 15,
  },
  {
    logo: "https://cdn-1.webcatalog.io/catalog/spotify/spotify-icon-filled-256.webp?v=1714773009069",
    item: "Spotify",
    description: "This is for my music subscription. I can listen to music offline. I can listen to music without ads. I can listen to music on my phone, laptop, tablet and TV. I can listen to music in high quality. I can listen to music on multiple devices at the same time. I can cancel it anytime. I can listen to music from all over the world.",
    paymentMethod: 2,
    lastCharge: "2021-09-15",
    dueDate: "2021-10-15",
    amount: 10,
  },
  {
    logo: "https://cdn-1.webcatalog.io/catalog/airbnb/airbnb-icon-filled-256.webp?v=1717412895024",
    item: "Airbnb",
    description: "My family and I rent an apartment for our vacation. We love the location and the view. We love the design and the furniture. We love the facilities and the amenities. We love the price and the value. We love the host and the service. We love the cleanliness and the safety.",
    paymentMethod: 3,
    lastCharge: "2021-09-15",
    dueDate: "2022-09-15",
    amount: 120,
  },
  {
    logo: "https://cdn-1.webcatalog.io/catalog/spotify/spotify-icon-filled-256.webp?v=1714773009069",
    item: "Spotify",
    description: "This is for my music subscription. I can listen to music offline. I can listen to music without ads. I can listen to music on my phone, laptop, tablet and TV. I can listen to music in high quality. I can listen to music on multiple devices at the same time. I can cancel it anytime. I can listen to music from all over the world.",
    paymentMethod: 2,
    lastCharge: "2021-09-15",
    dueDate: "2021-10-15",
    amount: 10,
  },
  {
    logo: "https://cdn-1.webcatalog.io/catalog/airbnb/airbnb-icon-filled-256.webp?v=1717412895024",
    item: "Airbnb",
    description: "My family and I rent an apartment for our vacation. We love the location and the view. We love the design and the furniture. We love the facilities and the amenities. We love the price and the value. We love the host and the service. We love the cleanliness and the safety.",
    paymentMethod: 3,
    lastCharge: "2021-09-15",
    dueDate: "2022-09-15",
    amount: 120,
  },
];

const BillsTable = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white p-6">
      <div className="grid grid-cols-4 md:grid-cols-6 pb-5 font-bold">
        <div className="col-span-1 flex justify-start items-center">
          Due date
        </div>
        <div className="col-span-1 hidden md:flex justify-start items-center">
          Logo
        </div>
        <div className="col-span-2 flex justify-start items-center">
          Description
        </div>
        <div className="col-span-1 hidden md:flex justify-center items-center">
          Last charge
        </div>
        <div className="col-span-1 flex justify-end items-center">
          Amount
        </div>
      </div>

      {BillsDemoData.map((transaction, key) => (
        <>
          <div
            className="hidden md:grid grid-cols-6 border-t border-stroke py-5 dark:border-strokedark text-sm"
            key={key}
          >
            <div className="col-span-1 flex justify-start items-center">
              <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
                <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(transaction.dueDate).format("MMM")}</p>
                <p className="text-xl font-bold">{dayjs(transaction.dueDate).format("DD")}</p>
              </div>
            </div>
            <div className="col-span-1 flex justify-start items-center">
              <Image
                src={transaction.logo}
                width={48}
                height={48}
                alt="Product"
              />
            </div>
            <div className="col-span-2 flex flex-col justify-center items-start">
              <p className="font-bold">{transaction.item}</p>
              <p className="line-clamp-3">{transaction.description}</p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              {transaction.lastCharge}
            </div>
            <div className="col-span-1 flex justify-end items-center">
              ${transaction.amount}
            </div>
          </div>

          <div
            className="grid md:hidden grid-cols-4 border-t border-stroke py-6 dark:border-strokedark"
            key={key}
          >
            <div className="col-span-1 flex justify-start items-center">
              <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
                <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(transaction.dueDate).format("MMM")}</p>
                <p className="text-xl font-bold">{dayjs(transaction.dueDate).format("DD")}</p>
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-start gap-0.5">
              <p className="text-base font-bold">{transaction.item}</p>
              <p className="text-xs">Last Charge - {transaction.lastCharge}</p>
            </div>
            <div className="col-span-1 flex justify-end items-center font-bold">
              ${transaction.amount}
            </div>
          </div>
        </>
      ))}
      <div className="flex justify-center py-6">
        <button
          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-sm text-gray hover:bg-opacity-90"
          type="submit"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default BillsTable;
