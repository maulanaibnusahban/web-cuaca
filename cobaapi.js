let newLocation = ""; // Lokasi awal kosong, akan diisi oleh input dari pengguna
const apiKey = "71a94b668b5440fb842130838231210"; // Gantilah dengan API key Anda dari WeatherAPI

// Mengambil elemen dari HTML
const input = document.querySelector(".search input"); // Input teks
let isiInput; // Variabel untuk menyimpan isi input
const button = document.querySelector(".search button"); // Tombol pencarian
const judul = document.querySelector("h3"); // Judul cuaca
const gambar = document.getElementById("gambar"); // Gambar ikon cuaca
const keterangan = document.querySelector(".foto h4"); // Keterangan cuaca
const judulKet = document.querySelector(".keterangan h2"); // Judul keterangan
const kondisi = document.querySelector("#kondisi"); // Kondisi cuaca
const temperatur = document.querySelector("#temperatur"); // Temperatur
const angin = document.querySelector("#angin"); // Kecepatan angin
const lembab = document.querySelector("#lembab"); // Kelembaban

button.addEventListener("click", function () {
  // Ketika tombol pencarian ditekan
  isiInput = input.value; // Mengambil isi input dari pengguna
  newLocation = isiInput; // Memperbarui lokasi yang akan dicari

  // Membuat URL API berdasarkan lokasi yang dimasukkan pengguna
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${newLocation}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle data response
      // Tampilkan informasi cuaca di konsol
      console.log(
        "Current weather in " +
          data.location.name +
          "\nCondition: " +
          data.current.condition.text +
          "\nTemperature: " +
          data.current.temp_c +
          "°C" +
          "\nWind Speed: " +
          data.current.wind_kph +
          " km/h" +
          "\nHumidity: " +
          data.current.humidity +
          "%"
      );

      // Update elemen HTML dengan informasi cuaca
      judul.innerHTML = data.location.name;
      keterangan.innerHTML = data.current.condition.text;
      kondisi.innerHTML = data.current.condition.text;
      judulKet.innerHTML = "Cuaca di " + data.location.name;
      temperatur.innerHTML = data.current.temp_c + " °C";
      angin.innerHTML = data.current.wind_kph + " km/h";
      lembab.innerHTML = data.current.humidity + " %";

      // Ganti gambar sesuai dengan kondisi cuaca
      if (data.current.condition.text == "Clear") {
        gambar.src = "image/cerah.png";
      } else if (data.current.condition.text == "Patchy rain possible") {
        gambar.src = "image/cerah-gerimis.png";
      } else if (data.current.condition.text == "Overcast") {
        gambar.src = "image/berawan.png";
      } else if (data.current.condition.text == "Partly cloudy") {
        gambar.src = "image/cerah-berawan.png";
      } else {
        gambar.src = "image/cerah-berawan.png";
      }
    })
    .catch((error) => {
      // Tangani error jika ada
      alert("Mohon periksa kembali tempat yang anda masukan");
    });
});
