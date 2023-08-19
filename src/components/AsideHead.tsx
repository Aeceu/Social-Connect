import { Satisfy } from "next/font/google";
const inter = Satisfy({ subsets: ["latin"], weight: "400" });

export default function AsideHead() {
  return (
    <div className="mb-4">
      <h1 className={`${inter.className} text-emerald-600 text-2xl font-bold`}>
        Social Media
      </h1>
    </div>
  );
}
