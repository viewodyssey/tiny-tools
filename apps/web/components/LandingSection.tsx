import { Button } from "ui";

const LandingSection = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[900px] text-center flex flex-col items-center my-[160px]">
        <h1 className="font-medium text-[72px] leading-[72px] w-full tracking-tight">
          View Your Digital Odyssey
        </h1>
        <p className="py-6 w-8/12 text-lg">
          Corporations own lots of data about your online activity. Gather and
          visualize your digital footprint in a beautiful way.{" "}
        </p>
        <Button>Get started</Button>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-2xl">Tiny digital delights. </h2>
        <div className="flex text-textSecondary gap-6">
          <p className="w-1/2">
            The GDPR states that an application or a website that collects
            personal data must ensure the users are in a position to give or
            withold their informed consent.{" "}
          </p>
          <p className="w-1/2">
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
