// document.getElementById("logo").addEventListener('click', ()=>{
//     alert('clicked')
// })

// console.log(document.getElementById("logo"))

// let css=document.querySelectorAll("blue")
// console.log(css)


function handlesubmit(e){
    e.preventDefault()

    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    console.log(email)
    console.log(password)


}
let form=document.getElementById("submit").addEventListener('click', handlesubmit)


