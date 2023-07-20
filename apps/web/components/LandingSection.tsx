import Link from "next/link";
import { buttonVariants } from "ui";

const LandingSection = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[900px] md:text-center flex flex-col items-start md:items-center my-[160px]">
        <h1 className="font-medium text-4xl md:text-[72px] md:leading-[72px] w-full tracking-tight">
          View Your Digital Odyssey
        </h1>
        <p className="py-6 md:w-8/12 text-base md:text-lg">
          Corporations own lots of data about your online activity. Gather and
          visualize your digital footprint in a beautiful way.{" "}
        </p>
        <Link className={buttonVariants()} href="/tools">
          Get started
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-xl md:text-2xl">
          Tiny digital delights.{" "}
        </h2>
        <div className="flex flex-col md:flex-row text-textSecondary gap-2 md:gap-6">
          <p className="w-full md:w-1/2">
            The GDPR states that an application or a website that collects
            personal data must ensure the users are in a position to give or
            withold their informed consent.{" "}
          </p>
          <p className="w-full md:w-1/2">
            The GDPR states that an application or a website that collects
            personal data must ensure the users are in a position to give or
            withold their informed consent.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
