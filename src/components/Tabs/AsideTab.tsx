import AsideHead from "../AsideHead";
import AsideInfo from "../AsideInfo";
import Logout from "../Logout";

export default function AsideTab() {
  return (
    <div
      className="w-auto lg:w-1/4 h-screen p-1 lg:p-4 text-white border-r-[1px] border-white/10
flex flex-col justify-between py-4 "
    >
      <div className="border-b-[1px] border-white/10">
        <AsideHead />
        <AsideInfo />
      </div>
      <Logout />
    </div>
  );
}
