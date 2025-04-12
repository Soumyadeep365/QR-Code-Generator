document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("#inputText");
    const imgBox = document.querySelector(".qrbox");
    const qrImg = document.querySelector(".qrimg");
    const errorMsg = document.querySelector(".inval");
    const generateBtn = document.querySelector("#generateBtn");
    const downloadBtn = document.querySelector("#downloadBtn");

    function generateQRCode() {
        const text = input.value.trim();

        if (text === "") {
            errorMsg.style.display = "block";
            imgBox.classList.remove("show-img");
            downloadBtn.style.display = "none";
            return;
        }

        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
        qrImg.src = qrUrl;

        errorMsg.style.display = "none";
        imgBox.classList.add("show-img");

        qrImg.onload = function () {
            downloadBtn.style.display = "block";
        };
    }

    function downloadQR() {
        const link = document.createElement("a");
        link.href = qrImg.src;
        link.download = "QR_Code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    generateBtn.addEventListener("click", generateQRCode);

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            generateQRCode();
        }
    });

    downloadBtn.addEventListener("click", downloadQR);
});
