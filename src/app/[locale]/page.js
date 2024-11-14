import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import styles from "./page.module.css";
import FeaturedGames from "@/Components/FeaturedGames/FeaturedGames";
import FeaturedAccessories from "@/Components/FeaturedAccessories/FeaturedAccessories";
import GameShowcase from "@/Components/GameShowcase/GameShowcase";
import BlogSpinner from "@/Components/BlogSpinner/BlogSpinner";

export default function Home() {
  return (
    <div className={styles.main_page_wrapper}>
      <Navbar />
      <main>
        <FeaturedGames />
        <FeaturedAccessories />
        <GameShowcase />
        <BlogSpinner />
      </main>
      <Footer />
    </div>
  );
}
