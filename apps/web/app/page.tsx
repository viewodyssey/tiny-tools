import AppSection from "@/components/AppSection";
import LandingSection from "@/components/LandingSection";

export default function Page() {
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="flex justify-center w-full px-6 py-2">
        <div className="w-full max-w-[1000px]">
          <LandingSection />
          <AppSection />
        </div>
      </div>
    </div>
  );
}
