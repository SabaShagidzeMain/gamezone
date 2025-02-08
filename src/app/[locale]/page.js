import styles from "./page.module.css";
import FeaturedGames from "@/Components/FeaturedGames/FeaturedGames";
import GameShowcase from "@/Components/GameShowcase/GameShowcase";
import BlogSpinner from "@/Components/BlogSpinner/BlogSpinner";

export default function Home() {
  return (
    <div className={styles.main_page_wrapper}>
      <main>
        <FeaturedGames className="bg-light-main dark-bg-dark-main" />
        <GameShowcase className="bg-light-main dark-bg-dark-main" />
        <BlogSpinner />
      </main>
    </div>
  );
}
