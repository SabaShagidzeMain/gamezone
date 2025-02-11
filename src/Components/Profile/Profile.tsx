import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

// Define the types for the props
interface UserData {
  username: string;
  email: string;
  plan: "basic" | "essential" | "extra" | "premium";
}

interface ProfileProps {
  userData: UserData | null;
  logOut: () => void;
  onEdit: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userData, logOut, onEdit }) => {
  const planAssets = {
    basic: {
      background: "/images/planBanners/plan-basic.jpg",
    },
    essential: {
      icon: "/images/sub/sub1.png",
      background: "/images/planBanners/plan-essential.jpg",
    },
    extra: {
      icon: "/images/sub/sub2.png",
      background: "/images/planBanners/plan-extra.avif",
    },
    premium: {
      icon: "/images/sub/sub3.png",
      background: "/images/planBanners/plan-premium.jpg",
    },
  };

  const currentPlan = planAssets[userData?.plan || "basic"];

  const backgroundStyle = {
    backgroundImage: `url(${currentPlan.background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="flex flex-col justify-start items-center h-full gap-8">
      <div className="justify-center bg-[var(--background-color)] items-center flex flex-col gap-[0.3rem] text-[var(--text-color)] rounded-[5px] p-4 shadow-[var(--box-shadow)]">
        <div
          style={backgroundStyle}
          className="w-full flex justify-between items-center h-20 mb-4 p-4 rounded-[5px]"
        ></div>
        <div className="w-24 h-24 rounded-[50%] bg-[var(--text-color)] flex justify-center items-center mb-4">
          <FaRegUserCircle className="w-16 h-16 text-[var(--background-color)]" />
        </div>
        <p>Hello!</p>
        <p>@{userData?.username || "Loading..."}</p>
        <p>
          <strong>Email:</strong> {userData?.email || "Loading..."}
        </p>
        <p>
          <strong>Subscription Plan:</strong> {userData?.plan || "Basic"}
        </p>
        <button
          onClick={onEdit}
          className="w-32 h-8 text-[0.9rem] bg-[var(--text-color)] text-[var(--background-color)] rounded-[5px] cursor-pointer [transition:all_0.2s_ease-in-out] font-bold hover:bg-[#9b2226]"
        >
          Edit Profile
        </button>
        <button
          className="w-32 h-8 text-[0.9rem] bg-[var(--text-color)] text-[var(--background-color)] rounded-[5px] cursor-pointer [transition:all_0.2s_ease-in-out] font-bold hover:bg-[#9b2226]"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
