const cats = {
  munchkin: "/assets/munchkin.jpg",
  british: "/assets/british.jpeg",
  angora: "/assets/angora.jpg",
};

const selectedCat = new URL(window.location.href).searchParams.get("cat");
if (selectedCat) {
  document.querySelector("#image").src = cats[selectedCat];
}
