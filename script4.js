const reviewForm = document.getElementById('review-form');
const reviewList = document.querySelector('.review-list');

reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('review-name').value;
  const rating = document.getElementById('review-rating').value;
  const comment = document.getElementById('review-comment').value;

  if (name && rating && comment) {
    const review = document.createElement('li');
    review.classList.add('review');
    review.innerHTML = `
      <div class="review-name">${name}</div>
      <div class="review-rating">${'★'.repeat(rating)}</div>
      <div class="review-comment">${comment}</div>
      <button class="edit-button">Edit</button>
    `;
    reviewList.appendChild(review);

    reviewForm.reset();
  }
});

reviewList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('edit-button')) {
    const review = target.parentNode;
    const name = review.querySelector('.review-name').textContent;
    const rating = review.querySelector('.review-rating').textContent.length;
    const comment = review.querySelector('.review-comment').textContent;

    reviewForm.elements['review-name'].value = name;
    reviewForm.elements['review-rating'].value = rating;
    reviewForm.elements['review-comment'].value = comment;

    reviewList.removeChild(review);
  }
});
