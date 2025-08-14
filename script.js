
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close-btn");

  const modalYear = document.getElementById("modal-year");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalCategory = document.getElementById("modal-category");

  // Fetch events from JSON
  fetch("data/events.json")
    .then(res => res.json())
    .then(events => {
      events.forEach(event => {
        const marker = document.createElement("div");
        marker.classList.add("event-marker");

        marker.innerHTML = `
          <img src="${event.imageURL}" alt="${event.title}">
          <h4>${event.year}</h4>
          <p><strong>${event.title}</strong></p>
        `;

        // On click, open modal
        marker.addEventListener("click", () => {
          modalYear.textContent = event.year;
          modalTitle.textContent = event.title;
          modalImage.src = event.imageURL;
          modalDescription.textContent = event.description;
          modalCategory.textContent = event.category;
          modal.style.display = "flex";
        });

        timeline.appendChild(marker);
      });
    })
    .catch(err => console.error("Error loading events:", err));

  // Close modal on click of X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
