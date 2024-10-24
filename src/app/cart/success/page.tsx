"use client";
import { useState, useEffect } from "react";
import Layout from "../../sharedComponents/Layout";
import styles from "./page.module.css";
import { getCartFromLocalStorage, clearCartFromLocalStorage } from "../types/Cart";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  productDescription: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: string;
  oldPrice: string;
  selectedOption: string;
}

const SuccessPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const paymentStatus = localStorage.getItem('paymentStatus');

    if (paymentStatus !== 'success') {
      router.push('/cart/payment');
      return;
    }

    const savedCartItems = getCartFromLocalStorage();
    setCartItems(savedCartItems);

    const deliveryInfoRaw = localStorage.getItem('deliveryInfo');
    const addressInfoRaw = localStorage.getItem('addressInfo');

    if (deliveryInfoRaw && addressInfoRaw) {
      const deliveryInfo = JSON.parse(deliveryInfoRaw);
      const addressInfo = JSON.parse(addressInfoRaw);
      const { selectedDeliveryType, selectedStore, deliveryCost, deliveryDays } = deliveryInfo;

      const orderDate = new Date();
      const estimatedDeliveryDate = new Date(orderDate);
      estimatedDeliveryDate.setDate(orderDate.getDate() + deliveryDays);
      const formattedDate = estimatedDeliveryDate.toLocaleDateString('uk-UA');

      if (selectedDeliveryType === 'store') {
        setAddress(`${selectedStore.address}, ${selectedStore.city}, ${selectedStore.postalCode}`)
      } else if (selectedDeliveryType === 'novaPoshta') {
        setAddress(`${selectedStore.address}, ${selectedStore.postalCode}`)
      } else if (selectedDeliveryType === 'courier') {
        setAddress(`${addressInfo.city}, ${addressInfo.street}, ${addressInfo.houseNumber}`);
      }
      setDeliveryDate(formattedDate);
      setDeliveryCost(deliveryCost);
    }

    setTimeout(() => {
      clearCartFromLocalStorage();
      localStorage.removeItem('paymentStatus');
      localStorage.removeItem('deliveryInfo');
      localStorage.removeItem('addressInfo');
    }, 1000);
  }, [router]);


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
  };

  return (
    <Layout headerType="header1" footerType="footer1">
      <div className={styles.Page}>
        <h1>Оплата успішна</h1>
      </div>
      <center><h3><b>Замовлення №123456:</b></h3></center>
      <center>
        <h6>Доставка за адресою {address} до {deliveryDate}</h6>
      </center>

      <div className={styles.checkoutPage}>
        <div className={styles.cartSummary}>
          {cartItems.length > 0 && (
            <div>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <div className={styles.cartItemImageContainer}>
                    <img
                      src={item.productImage}
                      alt={item.productDescription}
                      className={styles.cartItemImage}
                    />
                  </div>
                  <div className={styles.cartItemDetails}>
                    <p>{item.productDescription}</p>
                    <div className={styles.info}>
                      <p>{item.productName}</p>
                      <p>Кількість: {item.quantity} шт</p>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <p>{item.price} грн</p>
                  </div>
                </div>
              ))}
              <p className={styles.totalPrice}>
                Усього {(calculateTotalPrice() + deliveryCost).toFixed(2)} грн
              </p>
            </div>
          )}
          <Link href="/">
            <button type="button" className={styles.cancelButton}>
              Повернутись на головну
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;