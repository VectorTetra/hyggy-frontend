import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/MainPageHeader-styles.module.css';
import useLocalStorageStore from "@/store/localStorage";

function MainPageHeaderBasket(props) {
  const { cartQuantity } = useLocalStorageStore();
  console.log(cartQuantity);
  return (
    <Link prefetch={true} href="/cart" className={styles.mainPageHeaderItem}>
      <div style={{ position: 'relative' }}>
        <Image
          id={styles.mainPageHeaderUserPhoto}
          className={styles.mainPageHeaderBasketPhoto}
          src={props.basketPhotoUrl}
          alt="logo"
          width={props.basketPhotoWidth}
          height={props.basketPhotoHeight}
          priority={true}
        />
        {/* Відображаємо кількість товарів, якщо вона більша за 0 */}
        {cartQuantity > 0 && (
          <div className={styles.cartQuantityBadge}>
            {cartQuantity}
          </div>
        )}
      </div>
      <div className={styles.disappearOnAdapt}>Кошик</div>
    </Link>
  );
}

export default MainPageHeaderBasket;
