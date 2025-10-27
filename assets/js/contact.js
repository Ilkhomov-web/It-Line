
const phoneInput =  document.getElementById("number")

phoneInput.addEventListener("input", function(e) {
    let cursorPos = e.target.selectionStart; 
    let oldLength = e.target.value.length;
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("998")) {
        value = value.slice(3);
    }
    let formatted = "+998";
    if (value.length > 0) formatted += " (" + value.substring(0, 2);
    if (value.length >= 2) formatted += ")";
    if (value.length > 2) formatted += " " + value.substring(2, 5);
    if (value.length > 5) formatted += "-" + value.substring(5, 7);
    if (value.length > 7) formatted += "-" + value.substring(7, 9);

    e.target.value = formatted;
    let newLength = formatted.length;
    cursorPos = cursorPos + (newLength - oldLength);
    e.target.setSelectionRange(cursorPos, cursorPos);
    
})



document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("number").value,
        message: document.getElementById("massage").value,
        subject: document.getElementById("subject").value,
    }

    console.log(data);
    try{
        const res = await fetch("http://localhost:4000/send_request", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        const result = await res.json();
        // document.getElementById("result").innerText = result.message;
        alert(result.message)

        if(res.ok){
            e.target.reset()
        }
    } catch(err){
        // document.getElementById("result").innerText = "Xatolik: serverga ulanib bo‘lmadi."
        alert(err)
    }

})