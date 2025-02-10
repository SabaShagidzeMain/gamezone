"use client";

import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbMessage2Share } from "react-icons/tb";
import { GoUnlock } from "react-icons/go";
import SubscriptionCards from "@/Components/SubscriptionCards/SubscriptionCards";
import SubInfo from "@/Components/SubInfo/SubInfo";

const SubPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[var(--text-color)] text-[var(--background-color)] w-full h-60 p-4 flex justify-start items-center text-center mt-16">
        <div className="flex h-full w-full flex-col justify-center items-center gap-4">
          <h2 className="text-[1rem] md:text-[1.7rem]">
            Unlock Exclusive Benefits with Our Membership Subscriptions!
          </h2>
          <p className="w-[80%] text-[0.6rem] md:w-[60%] md:text-[0.8rem]">
            Join our community and get access to exclusive discounts, free
            games, early releases, and more. Whether you`re a casual gamer or a
            tech enthusiast, we have a subscription tailored to suit your needs.{" "}
            <br />
            From monthly game downloads to personalized consultations and VIP
            events, our tiers offer something special for everyone. Choose the
            plan that fits you and elevate your gaming and tech experience
            today!
          </p>
        </div>
      </div>

      {/* Subscription Cards */}
      <SubscriptionCards />

      {/* Features Section */}
      <div className="text-[var(--text-color)] flex justify-center items-center m-4 p-4 flex-col gap-8">
        <h2 className="font-bold text-center md:text-left text-[0.9rem] md:text-[1.2rem]">
          Join the #1 Gaming & Tech Subscription Service Today And Unlock
          Exclusive Perks
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Feature 1 */}
          <div className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
            <div className="bg-[var(--text-color)] text-[var(--background-color)] w-28 h-28 rounded-[50%] flex justify-center items-center text-[4rem] font-bold">
              <FaRegHandshake />
            </div>
            <p className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
              Thousands Of Happy Gamers Served
            </p>
            <p className="text-[0.8rem]">
              We`ve delivered over 10,000 subscription packs filled with games,
              discounts, and exclusive perks to passionate gamers nationwide.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
            <div className="bg-[var(--text-color)] text-[var(--background-color)] w-28 h-28 rounded-[50%] flex justify-center items-center text-[4rem] font-bold">
              <IoMdCheckmarkCircleOutline />
            </div>
            <p className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
              Always Fresh Content
            </p>
            <p className="text-[0.8rem]">
              With our subscriptions, you’ll discover new games, exclusive
              deals, and innovative tech every month—no repeats, just fresh,
              exciting experiences tailored for you.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Feature 3 */}
          <div className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
            <div className="bg-[var(--text-color)] text-[var(--background-color)] w-28 h-28 rounded-[50%] flex justify-center items-center text-[4rem] font-bold">
              <TbMessage2Share />
            </div>
            <p className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
              Exclusive Community Access
            </p>
            <p className="text-[0.8rem]">
              Be part of a thriving community of like-minded gamers and tech
              lovers. Share your experiences, join events, and connect with
              others who share your passion for gaming.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
            <div className="bg-[var(--text-color)] text-[var(--background-color)] w-28 h-28 rounded-[50%] flex justify-center items-center text-[4rem] font-bold">
              <GoUnlock />
            </div>
            <p className="text-[var(--text-color)] w-full md:w-80 text-center flex flex-col gap-[0.8rem] justify-center items-center">
              No Lock-In Contracts
            </p>
            <p className="text-[0.8rem]">
              Enjoy the freedom of Pay-By-The-Month with no strings attached.
              You can cancel or pause your subscription anytime, giving you
              complete control over your membership.
            </p>
          </div>
        </div>
      </div>

      {/* Divider Section */}
      <div className="flex flex-col justify-center items-center mx-[0] my-8 text-[var(--text-color)] gap-[0.8rem]">
        <span className="h-[0.08rem] w-[90%] bg-[var(--text-color)]" />
        <h3>Learn More</h3>
        <span className="h-[0.08rem] w-[90%] bg-[var(--text-color)]" />
      </div>

      {/* Additional Info Section */}
      <SubInfo />
    </div>
  );
};

export default SubPage;
