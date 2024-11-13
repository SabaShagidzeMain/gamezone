export default function handler(req, res) {
  const blogs = [
    {
      image: "/images/blog/sea-of-stars.webp",
      title:
        "Sea of Stars Dawn of Equinox: devs deep dive into 3-player co-op and Combat 2.0, live today",
      text: "Hey everyone, Thierry here speaking for Sabotage. Our friends at PlayStation extended an invitation to share more about everything that has happened since the launch of Sea of Stars, and how that led our team to work full-time for the better part of a year on a major free update called Dawn of Equinox.",
    },
    {
      image: "/images/blog/forever-skies.webp",
      title: "Forever Skies PS5 demo out today",
      text: "Hi everyone! The Forever Skies team just surprise-released a PlayStation 5 exclusive demo, and it’s available today! The demo is specially designed for our PlayStation fans so we’ve made sure it’s got a lot to offer.",
    },
    {
      image: "/images/blog/lego-horizon.webp",
      title:
        "How LEGO Horizon Adventures was built with real LEGO bricks, out Nov 14",
      text: "LEGO Horizon Adventures, launching on PS5 and PC November 14, brings about a new take on Aloy’s story from her first adventure. Guerrilla and Studio Gobo met with The LEGO Group at their headquarters in Billund, and shared a few behind-the-scenes insights on creating the game. Watch the full video here and continue reading to find out how they built Aloy’s world, one brick at a time!",
    },
    {
      image: "/images/blog/horizon-zero-dawn.webp",
      title: "Share of the Week: Horizon Zero Dawn Remastered",
      text: "Last week, we asked you grab your bows and set off on Aloy’s original journey in Horizon Zero Dawn Remastered, sharing epic moments using #PSshare #PSBlog. Here are this week’s highlights.",
    },
    {
      image: "/images/blog/no-mans-sky.webp",
      title: "No Man’s Sky PS5 Pro update, new cross-save support detailed",
      text: "This year has already been a very busy one for No Man’s Sky, with 6 updates already this year, including the huge Worlds Update. Our last update, The Cursed, dropped just a couple of weeks ago, and players have been loving the spooky Halloween vibe.",
    },
  ];

  res.status(200).json(blogs);
}
