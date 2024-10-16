import FullScreenLayout from "@/components/Layouts/FullScreenLayout";
import Poi from "@/components/Poi";
import "@/css/poi.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const PoiPage = () => {
  return (
    <FullScreenLayout>
      <Poi />
    </FullScreenLayout>
  );
};

export default PoiPage;
