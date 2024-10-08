//FilterBar.tsx
import styles from "../css/FilterBar.module.css";
import FilterButton from "./FilterButton";
import ToggleCheckbox from "./ToggleCheckbox";
import useSearchStore from "@/store/search"; // Імпортуємо Zustand store  

export default function FilterBar(props: any) {
  const { setIsSidebarOpen, setIsCategoryOpen, setIsPriceRangeOpen, setIsTrademarksOpen, setIsSortingSidebarOpen } = useSearchStore();
  // Встановлюємо стан для відстеження активної вкладки
  return (
    <div id={styles.filterToggleBar}>
      <div id={styles.filterBar}>
        <FilterButton
          text="Ціна"
          afterImageSrc="/images/search/kursor.png"
          dissappearOnAdapt={true}
          onClick={() => {
            setIsSidebarOpen(true);
            setIsPriceRangeOpen(true);
            setIsCategoryOpen(false);
            setIsTrademarksOpen(false);
            setIsSortingSidebarOpen(false);
          }}
        />
        <FilterButton
          text="Категорія"
          afterImageSrc="/images/search/kursor.png"
          dissappearOnAdapt={true}
          onClick={() => {
            setIsSidebarOpen(true);
            setIsCategoryOpen(true);
            setIsPriceRangeOpen(false);
            setIsTrademarksOpen(false);
            setIsSortingSidebarOpen(false);
          }}
        />
        <FilterButton
          text="Торгова марка"
          afterImageSrc="/images/search/kursor.png"
          dissappearOnAdapt={true}
          onClick={() => {
            setIsSidebarOpen(true);
            setIsTrademarksOpen(true);
            setIsCategoryOpen(false);
            setIsPriceRangeOpen(false);
            setIsSortingSidebarOpen(false);
          }}
        />
        <FilterButton
          text="Сортувати"
          afterImageSrc="/images/search/kursor.png"
          dissappearOnAdapt={false}
          onClick={() => {
            setIsSidebarOpen(false);
            setIsSortingSidebarOpen(true);
            setIsCategoryOpen(false);
            setIsPriceRangeOpen(false);
            setIsTrademarksOpen(false);
          }}
        />
        <FilterButton
          text="Всі фільтри"
          beforeImageSrc="/images/search/filter.png"
          dissappearOnAdapt={false}
          onClick={() => {
            setIsSidebarOpen(true);
            setIsCategoryOpen(false);
            setIsPriceRangeOpen(false);
            setIsTrademarksOpen(false);
            setIsSortingSidebarOpen(false);
          }}
        />
      </div>
      <div id={styles.toggleBar}>
        <ToggleCheckbox />
      </div>
    </div>
  );
}
