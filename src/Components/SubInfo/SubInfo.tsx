import React from "react";
import Image from "next/image";
import handleSub from "@/utilities/handleSub/handleSub";

// Define the type for the handleSub function
type Plan = "essential" | "extra" | "premium";

const SubInfo: React.FC = () => {
  return (
    <div className="flex text-center md:text-left flex-col justify-center items-center gap-8 pb-16 px-4 md:px-8">
      {/* Essential Membership */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center w-full max-w-4xl">
        <div className="w-full md:w-1/3 max-w-[200px]">
          <Image
            src={"/images/sub/sub1.png"}
            width={200}
            height={200}
            quality={100}
            alt="info"
            className="w-full h-auto"
          />
        </div>
        <div className="text-[var(--text-color)] flex flex-col gap-2 w-full md:w-2/3">
          <p className="font-bold text-lg md:text-xl">Essential Membership</p>
          <p className="text-base md:text-lg">Cost: $10.00 / Month</p>
          <ul className="list-none flex flex-col gap-1 text-sm md:text-base">
            <li>Early access to sales and discounts</li>
            <li>Monthly newsletter with gaming and tech updates</li>
            <li>
              Occasional free or discounted digital games/software downloads
            </li>
            <li>Members-only online events or Q&A sessions</li>
          </ul>
          <p className="text-base md:text-lg mt-2">
            Ideal for: Casual gamers and tech enthusiasts looking for exclusive
            perks without a big commitment.
          </p>
          <button
            onClick={() => handleSub("essential" as Plan)}
            className="w-full md:w-32 h-10 rounded-md bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[#efbf04] mt-4"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Extra Membership */}
      <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-8 justify-center items-center w-full max-w-4xl">
        <div className="w-full md:w-1/3 max-w-[200px]">
          <Image
            src={"/images/sub/sub2.png"}
            width={200}
            height={200}
            quality={100}
            alt="info"
            className="w-full h-auto"
          />
        </div>
        <div className="text-[var(--text-color)] flex flex-col gap-2 w-full md:w-2/3 md:text-right">
          <p className="font-bold text-lg md:text-xl">Extra Membership</p>
          <p className="text-base md:text-lg">Cost: $20.00 / Month</p>
          <ul className="list-none flex flex-col gap-1 text-sm md:text-base">
            <li>One free monthly game download (from a curated list)</li>
            <li>10–20% discounts on games, tech hardware, and accessories</li>
            <li>Exclusive in-game items or DLCs</li>
            <li>Priority access to pre-orders and limited-stock items</li>
            <li>Extended warranty for gaming gear</li>
            <li>Participation in beta testing for new games and tech</li>
          </ul>
          <p className="text-base md:text-lg mt-2">
            Ideal For: Dedicated gamers who want exclusive discounts, free
            games, and early access perks.
          </p>
          <button
            onClick={() => handleSub("extra" as Plan)}
            className="w-full md:w-32 h-10 rounded-md bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[#efbf04] mt-4 md:ml-auto"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Premium Membership */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center w-full max-w-4xl">
        <div className="w-full md:w-1/3 max-w-[200px]">
          <Image
            src={"/images/sub/sub3.png"}
            width={200}
            height={200}
            quality={100}
            alt="info"
            className="w-full h-auto"
          />
        </div>
        <div className="text-[var(--text-color)] flex flex-col gap-2 w-full md:w-2/3">
          <p className="font-bold text-lg md:text-xl">Premium Membership</p>
          <p className="text-base md:text-lg">Cost: $30.00 / Month</p>
          <ul className="list-none flex flex-col gap-1 text-sm md:text-base">
            <li>Includes all Premium Gamer features</li>
            <li>Access to a cloud gaming service or game library</li>
            <li>25% discount on high-end tech products</li>
            <li>Free shipping on all orders</li>
            <li>Personalized tech and gaming consultations</li>
            <li>
              Invitations to VIP events, gaming tournaments, or private tech
              previews
            </li>
          </ul>
          <p className="text-base md:text-lg mt-2">
            Ideal For: Tech-savvy gamers and enthusiasts who want top-tier
            discounts, premium features, and personalized support.
          </p>
          <button
            onClick={() => handleSub("premium" as Plan)}
            className="w-full md:w-32 h-10 rounded-md bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer transition-all hover:bg-[#efbf04] mt-4"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubInfo;
