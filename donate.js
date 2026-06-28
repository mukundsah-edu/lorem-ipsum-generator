const DONATION_URL = "https://github.com/sponsors/mukundsah-edu";

const donationLink = document.getElementById("donation-link");
const donationUrl = document.getElementById("donation-url");
const donationQr = document.getElementById("donation-qr");
const qrUrl = new URL("https://api.qrserver.com/v1/create-qr-code/");

qrUrl.searchParams.set("size", "360x360");
qrUrl.searchParams.set("margin", "16");
qrUrl.searchParams.set("data", DONATION_URL);

donationLink.href = DONATION_URL;
donationUrl.textContent = DONATION_URL;
donationQr.src = qrUrl.toString();
