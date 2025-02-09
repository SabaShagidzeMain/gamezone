import React from "react";
import handleSub from "@/utilities/handleSub/handleSub";
import Image from "next/image";

const SubscriptionCards = () => {
  return (
    <div className="flex p-8 justify-center items-center gap-8 mt-4">
      <div className="flex flex-col justify-evenly items-center text-center p-[0.2rem] bg-[var(--background-color)] shadow-[var(--box-shadow)] w-72 h-[30rem] text-[var(--text-color)] rounded-[5px] gap-2 cursor-pointer [transition:all_0.2s_ease-in-out] hover:scale-[1.02]">
        <h2 className="text-[1.3rem]">
          ESSENTIAL <br /> <span className="text-[0.9rem]">Membership</span>
        </h2>
        <Image
          src="/images/sub/sub1.png"
          alt="essential"
          width={180}
          height={180}
          quality={100}
        />
        <p className="font-bold">$10.00 / Month</p>
        <p className="font-bold">Features:</p>
        <ul className="list-none flex flex-col gap-2 text-[0.8rem]">
          <li>Early access to discounts and sales</li>
          <li>Monthly gaming and tech newsletter</li>
          <li>discounted digital downloads</li>
        </ul>
        <span className="h-[0.02rem] w-[90%] bg-[var(--text-color)]" />
        <button
          onClick={() => handleSub("essential")}
          className="h-8 w-40 rounded-[5px] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] border-[none] hover:bg-[#efbf04]"
        >
          Subscribe
        </button>
      </div>
      <div className="flex flex-col justify-evenly items-center text-center p-[0.2rem] bg-[var(--background-color)] shadow-[var(--box-shadow)] w-72 h-[30rem] text-[var(--text-color)] rounded-[5px] gap-2 cursor-pointer [transition:all_0.2s_ease-in-out] hover:scale-[1.02]">
        <h2 className="text-[1.3rem]">
          EXTRA <br /> <span className="text-[0.9rem]">Membership</span>
        </h2>
        <Image
          width={180}
          height={180}
          quality={100}
          src="/images/sub/sub2.png"
          alt="essential"
        />
        <p className="font-bold">$20.00 / Month</p>
        <p className="font-bold">Features:</p>
        <ul className="list-none flex flex-col gap-2 text-[0.8rem]">
          <li>One free monthly game download</li>
          <li>15% discount on games</li>
          <li>Exclusive in-game items or DLCs</li>
        </ul>
        <span className="h-[0.02rem] w-[90%] bg-[var(--text-color)]" />
        <button
          onClick={() => handleSub("extra")}
          className="h-8 w-40 rounded-[5px]  bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] border-[none] hover:bg-[#efbf04]"
        >
          Subscribe
        </button>
      </div>
      <div className="flex flex-col justify-evenly items-center text-center p-[0.2rem] bg-[var(--background-color)] shadow-[var(--box-shadow)] w-72 h-[30rem] text-[var(--text-color)] rounded-[5px] gap-2 cursor-pointer [transition:all_0.2s_ease-in-out] hover:scale-[1.02]">
        <h2 className="text-[1.3rem]">
          PREMIUM <br /> <span className="text-[0.9rem]">Membership</span>
        </h2>
        <Image
          src="/images/sub/sub3.png"
          alt="essential"
          width={180}
          height={180}
          quality={100}
        />
        <p className="font-bold">$30.00 / Month</p>
        <p className="font-bold">Features:</p>
        <ul className="list-none flex flex-col gap-2 text-[0.8rem]">
          <li>Access to a cloud gaming library</li>
          <li>25% discount on high-end tech</li>
          <li>Personalized tech consultations</li>
        </ul>
        <span className="h-[0.02rem] w-[90%] bg-[var(--text-color)]" />
        <button
          onClick={() => handleSub("premium")}
          className="h-8 w-40 rounded-[5px]  bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] border-[none] hover:bg-[#efbf04]"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCards;
