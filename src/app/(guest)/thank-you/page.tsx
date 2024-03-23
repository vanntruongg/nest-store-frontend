import Image from "next/image";
import ThankYouImage from "../../../public/assets/thankyou.svg";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ThankYouPage = ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          src={"/assets/thanhyou.svg"}
          fill
          className="size-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-32 xl:gapx-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-600">
              Order successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight  text-gray-900 sm:text-5xl">
              Thanks for ordering
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
