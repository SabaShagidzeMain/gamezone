import Navbar from "@/Components/Navbar/Navbar";
import styles from "./page.module.css";
import FeaturedGames from "@/Components/FeaturedGames/FeaturedGames";
import FeaturedAccessories from "@/Components/FeaturedAccessories/FeaturedAccessories";
import GameShowcase from "@/Components/GameShowcase/GameShowcase";
import BlogSpinner from "@/Components/BlogSpinner/BlogSpinner";
import Footer from "@/Components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.main_page_wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <FeaturedGames />
        <FeaturedAccessories />
        <GameShowcase />
        <BlogSpinner />
        <Footer />
      </main>
      <footer></footer>
    </div>
  );
}
