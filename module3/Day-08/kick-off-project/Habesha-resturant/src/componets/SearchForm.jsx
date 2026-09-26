import { useState } from "react";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [phone, setphone] =useState("")
  const valid= /^(?:\+251|0)9\d{8}$/.test(phone);

  function handleSubmit(event) {
    event.preventDefault(); // ገጹ reload እንዳይሆን ይከለክላል
    alert(`Searching for: ${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        onChange={(e) => setQuery(e.target.value)} // የተጻፈውን ማንበብ
      />
      <input value={phone} onChange={(e)=>{setphone(e.target.value)}}/>
      {phone && !valid && <p className="err">Use 09... or +2519...</p>}
      <button disabled={!valid}>Pay with TeleBirr</button>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;