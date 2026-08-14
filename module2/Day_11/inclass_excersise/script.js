const ETHIOPIAN_PHONE_REGEX = /^(?:\+251|251|0)7|9\d{8}$/;
const nameInput=document.getElementById("name")
const phoneInput=document.getElementById("phone")
const form=document.getElementById("form")
const error_message=document.getElementById("error-message")


console.log(form)


function getSignups() {
  const data = localStorage.getItem('signups');
  return data ? JSON.parse(data) : [];
}

console.log(getSignups()
)




form.addEventListener("submit", (e)=>{
    e.preventDefault()

    error_message.textContent=''

const trimmedName=nameInput.value.trim()
console.log(phoneInput)
const trimmedphone=phoneInput.value.trim()

console.log(trimmedphone)
  console.log(ETHIOPIAN_PHONE_REGEX.test(trimmedphone))


if (trimmedName.length<2){
    error_message.textContent = "Name must be at least two characters long."
    return;}
if (!ETHIOPIAN_PHONE_REGEX.test(trimmedphone)  ) {

    error_message.textContent = "Please enter a valid Ethiopian phone number (e.g., 0912345678 or +251912345678)";
    return; // Return early on first error
  }


  const signups = getSignups();
  signups.push({
    name: trimmedName,
    phone: trimmedphone,
    timestamp: new Date().toISOString()
  });

  console.log(signups)

  

  localStorage.setItem('signups', JSON.stringify(signups));

})





