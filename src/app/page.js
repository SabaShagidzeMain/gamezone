import Navbar from "@/Components/Navbar/Navbar";
import styles from "./page.module.css";
import FeaturedGames from "@/Components/FeaturedGames/FeaturedGames";

export default function Home() {
  return (
    <div className={styles.main_page_wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <FeaturedGames />
      </main>
      <footer></footer>
    </div>
  );
}
