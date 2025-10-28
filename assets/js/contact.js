const phoneInput = document.getElementById("number");

phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); 


  if (!value.startsWith("998")) {
    value = "998" + value;
  }

  let formatted = "+998";
  if (value.length > 3) formatted += " (" + value.substring(3, 5);
  if (value.length >= 5) formatted += ")";
  if (value.length > 5) formatted += " " + value.substring(5, 8);
  if (value.length > 8) formatted += "-" + value.substring(8, 10);
  if (value.length > 10) formatted += "-" + value.substring(10, 12);

  e.target.value = formatted;
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const rawPhone = document.getElementById("number").value;
  const cleanedPhone = "+" + rawPhone.replace(/\D/g, "");

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: cleanedPhone,
    message: document.getElementById("massage").value.trim(),
    subject: document.getElementById("subject").value.trim(),
  };

  console.log("Yuborilayotgan ma'lumot:", data);

  try {
    const res = await fetch("https://requestbot-back.onrender.com/send_request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);

    if (res.ok) {
      e.target.reset();
      phoneInput.value = "+998";
    }
  } catch (err) {
    alert("Xatolik: server bilan aloqa yo‘q!");
    console.error(err);
  }
});
