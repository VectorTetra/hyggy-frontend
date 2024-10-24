import { useState } from 'react';
import StarRating from '../../sharedComponents/StarRating';
import styles from "../css/ReviewWare.module.css";
import { Product } from '../types/Product';
import Link from 'next/link';

export default function ReviewWare({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    topic: '',
    name: '',
    email: '',
    review: '',
    termsAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewData({ ...reviewData, termsAccepted: e.target.checked });
  };

  const handleRatingChange = (newRating: any) => {
    setReviewData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewData.rating === 0) {
      alert("Будь ласка, вкажіть рейтинг.");
      return;
    }
    if (!reviewData.termsAccepted) {
      alert("Ви повинні прийняти Умови та Положення");
      return;
    }
    console.log("Відгук відправлений:", reviewData);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.overallRating}>
        <div className={styles.rating}>
          <StarRating rating={Number(product.rating)} />
          <span className={styles.ratingText}>{product.rating} / 5</span>
        </div>
        <div className={styles.mainText}>Оцінка користувачів</div>
        <button
          className={styles.leaveReviewButton}
          onClick={() => setIsModalOpen(true)}>
          Залишити відгук
        </button>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p onClick={() => setIsModalOpen(false)} className={styles.close}>×</p>
            <h1>Залишити відгук</h1>
            <form onSubmit={handleSubmit}>
              <hr />
              <div className={styles.formRating}>
                <StarRating rating={reviewData.rating} onRatingChange={handleRatingChange} />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="topic"
                  value={reviewData.topic}
                  onChange={handleInputChange}
                  required
                  placeholder="Тема*"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={reviewData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Ім’я*"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  value={reviewData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="E-mail*"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="review"
                  value={reviewData.review}
                  onChange={handleInputChange}
                  required
                  placeholder="Відгук*"
                  className={styles.formTextarea}
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={reviewData.termsAccepted}
                    onChange={handleCheckboxChange}
                    required
                  />&nbsp;Прийняти  <Link href="https://jysk.ua/umovi-ta-polozhennya#8">Умови та Положення</Link>
                </label>
              </div>
              <center><button type="submit" className={styles.submitButton}> Надіслати відгук</button></center>
            </form>
          </div>
        </div>
      )}
      <hr className={styles.reviewHr} />
      <div className={styles.reviewsList}>
        {product.lastReviews.map((review, index) => (
          <div key={index} className={styles.reviewItem}>
            <span className={styles.reviewerName}>{review.name}</span>
            <span className={styles.reviewText}>{review.text}</span>
            <div className={styles.reviewContent}>
              <div className={styles.reviewRatingContainer}>
                <StarRating rating={Number(review.rating)} />
                <span className={styles.reviewRating}>{review.rating} / 5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
