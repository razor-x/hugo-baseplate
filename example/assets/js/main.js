document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#day-of-week").textContent = dayjs().format("dddd");
});
