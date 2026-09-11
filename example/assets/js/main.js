document.addEventListener("DOMContentLoaded", () => {
  $("#day-of-week").text(new Date().toLocaleDateString("en-US", { weekday: "long" }));
});
