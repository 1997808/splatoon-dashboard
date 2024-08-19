import React, { ReactElement } from "react";
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link";
import { formatMoney } from "@/lib/utils";

type PropType = {
  slides: AccountProps[]
  options?: EmblaOptionsType
}

export interface AccountProps {
  id: string | number;
  sourceName: string;
  accountNumber: string;
  balanceAmount: string;
}

export interface TotalCardProps {
  title: string;
  data: AccountProps[];
}

const TotalCard: (props: TotalCardProps) => ReactElement = ({ title, data }: TotalCardProps) => {
  const OPTIONS: EmblaOptionsType = { loop: true }

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6 pt-6 pb-4 dark:border-strokedark flex justify-between items-center">
        <h3 className="font-bold text-black dark:text-white text-lg">
          {title || "N/A"}
        </h3>
        <Link href="/balances">
          <p className="text-black dark:text-white text-sm">All Balances</p>
        </Link>
      </div>
      <div className="p-6 pt-4">
        <EmblaCarousel slides={data} options={OPTIONS} />
      </div>
    </div>
  );
};

export default TotalCard;

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((data, index) => (
            <div className="embla__slide" key={index}>
              <div className="flex flex-col items-start bg-primary p-4 rounded-lg text-white">
                <div className="flex flex-col">
                  <p className="text-sm opacity-80">Account type</p>
                  <p className="font-bold">{data.sourceName || "Credit Card"}</p>
                </div>

                <div className="flex justify-between items-end w-full">
                  {data.accountNumber && data.accountNumber !== 'null' ? (
                    <p className="text-white text-sm opacity-80">
                      {"**** **** **** " + data.accountNumber.slice(-4)}
                    </p>
                  ) : <p></p>}
                  <p className="text-white font-bold">
                    {formatMoney(parseInt(data.balanceAmount))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}