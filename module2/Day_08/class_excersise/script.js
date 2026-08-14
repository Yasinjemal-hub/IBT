// let array=["apple", "banana"[1,2,3]]


// let obj={
//     key:"vlaue"
// }

// console.log(obj)
//  const item=["tebise", "shiro", "ktfo"]

// //  item.push("firfir")
//  item.pop()
//  item.indexOf("shiro")

//  console.log(item)

//  const newArray=item.map((element)=>{
//     console.log(element)
//  })

//  const filiter=item.filter((element)=>{
//     return element=="shiro"
//  }
// )

// console.log(filiter)

// let obj={
//     name:"yasin",
//     age:89,
//     address:{
//         city:"addis",
//         street:"kality street"
//     }
// }


let person = {
  id: 1,
  name: "Abebe", 
  age: 30,
  address: {
    city: "Addis",
    street: "HaileGebresillasie street"
  },
  sklls: [
    {
      skillName: "Developer",
      yearsOfExperience: 5
    },
    {
      skillName: "Developer",
      yearsOfExperience: 5
    }
  ],
  walk() {
    console.log(name);
  }
}


console.log(Object.keys(person))
console.log(Object.values(person))

