import React from "react";

import Image from "next/image";
import handleSub from "@/utilities/handleSub/handleSub";

const SubInfo = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8 pb-16">
        <div className="flex gap-8 justify-center items-center">
          <div>
            <Image
              src={"/images/sub/sub1.png"}
              width={200}
              height={200}
              quality={100}
              alt="info"
            />
          </div>
          <div className="text-[var(--text-color)] flex flex-col gap-2">
            <p className="font-bold text-[1.1rem]">Essential Membership</p>
            <p className="text-[0.9rem]">Cost: $10.00 / Month</p>
            <div>
              <ul className="list-none flex flex-col gap-[0.4rem] text-[0.8rem]">
                <li>
                  Early access to sales and discounts
                </li>
                <li>
                  Monthly newsletter with gaming and tech updates
                </li>
                <li>
                  Occasional free or discounted digital games/software downloads
                </li>
                <li>
                  Members-only online events or Q&A sessions
                </li>
              </ul>
            </div>
            <p className="text-[0.9rem]">
              Ideal for: Casual gamers and tech enthusiasts looking for
              exclusive perks without a big commitment.
            </p>
            <button
              onClick={() => handleSub("essential")}
              className="w-32 h-[1.8rem] rounded-[5px] border-[none] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[#efbf04]"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex gap-8 justify-center items-center flex-row-reverse text-right">
          <div>
            <Image
              src={"/images/sub/sub2.png"}
              width={200}
              height={200}
              quality={100}
              alt="info"
            />
          </div>
          <div className="text-[var(--text-color)] flex flex-col gap-2 items-end">
            <p className="font-bold text-[1.1rem]">Extra Membership</p>
            <p className="text-[0.9rem]">Cost: $20.00 / Month</p>
            <div>
              <ul className="list-none flex flex-col gap-[0.4rem] text-[0.8rem]">
                <li>
                  One free monthly game download (from a curated list)
                </li>
                <li>
                  10–20% discounts on games, tech hardware, and accessories
                </li>
                <li>
                  Exclusive in-game items or DLCs
                </li>
                <li>
                  Priority access to pre-orders and limited-stock items
                </li>
                <li>
                  Extended warranty for gaming gear
                </li>
                <li>
                  Participation in beta testing for new games and tech
                </li>
              </ul>
            </div>
            <p className="text-[0.9rem]">
              Ideal For: Dedicated gamers who want exclusive discounts, free
              games, and early access perks.
            </p>
            <button
              onClick={() => handleSub("extra")}
              className="w-32 h-[1.8rem] rounded-[5px] border-[none] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[#efbf04]"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex gap-8 justify-center items-center">
          <div>
            <Image
              src={"/images/sub/sub3.png"}
              width={200}
              height={200}
              quality={100}
              alt="info"
            />
          </div>
          <div className="text-[var(--text-color)] flex flex-col gap-2 ">
            <p className="font-bold text-[1.1rem]">Premium Membership</p>
            <p className="text-[0.9rem]">Cost: $30.00 / Month</p>
            <div>
              <ul className="list-none flex flex-col gap-[0.4rem] text-[0.8rem]">
                <li>
                  Includes all Premium Gamer features
                </li>
                <li>
                  Access to a cloud gaming service or game library
                </li>
                <li>
                  25% discount on high-end tech products
                </li>
                <li>
                  Free shipping on all orders
                </li>
                <li>
                  Personalized tech and gaming consultations
                </li>
                <li>
                  Invitations to VIP events, gaming tournaments, or private tech
                  previews
                </li>
              </ul>
            </div>
            <p className="text-[0.9rem]">
              Ideal For: Tech-savvy gamers and enthusiasts who want top-tier
              discounts, premium features, and personalized support.
            </p>
            <button
              onClick={() => handleSub("premium")}
              className="w-32 h-[1.8rem] rounded-[5px] border-[none] bg-[var(--text-color)] text-[var(--background-color)] font-bold cursor-pointer [transition:all_0.2s_ease-in-out] hover:bg-[#efbf04]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubInfo;
