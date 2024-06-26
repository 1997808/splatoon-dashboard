import React, { ReactElement } from "react";
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Link from "next/link";

type PropType = {
  slides: AccountProps[]
  options?: EmblaOptionsType
}

export interface AccountProps {
  id: string | number;
  title: string;
  accountNumber: string;
  totalAmount: string;
}

export interface TotalCardProps {
  title: string;
  data: AccountProps[];
}

const TotalCard: (props: TotalCardProps) => ReactElement = ({ title, data }: TotalCardProps) => {
  const OPTIONS: EmblaOptionsType = { loop: true }

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                  <p className="font-bold">{data.title || "Credit Card"}</p>
                </div>

                <div className="flex justify-between items-end w-full">
                  <p className="text-white text-sm opacity-80">
                    {data.accountNumber || "**** **** **** 1234"}
                  </p>
                  <p className="text-white font-bold">
                    {data.totalAmount || "$ 2500"}
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