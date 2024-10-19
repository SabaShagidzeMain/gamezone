import Navbar from "@/Components/Navbar/Navbar";
import styles from "./page.module.css";
import FeaturedPoducts from "@/Components/ProductComponents/FeaturedPoducts";

export default function Home() {
  return (
    <div className={styles.main_page_wrapper}>
      <header>
        <Navbar />
      </header>
      <main>
        <FeaturedPoducts />
      </main>
      <footer></footer>
    </div>
  );
}
