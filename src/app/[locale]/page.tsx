import styles from "./page.module.css";
import FeaturedGames from "@/Components/FeaturedGames/FeaturedGames";
import GameShowcase from "@/Components/GameShowcase/GameShowcase";
import BlogSpinner from "@/Components/BlogSpinner/BlogSpinner";

const Home: React.FC = () => {
  return (
    <div className={styles.main_page_wrapper}>
      <main>
        <FeaturedGames/>
        <GameShowcase />
        <BlogSpinner />
      </main>
    </div>
  );
};

export default Home;
