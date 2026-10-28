// app/menu/page.js
import Link from "next/link";
import { getDishes } from "@/Data/dishes";

// ISR Strategy: Revalidate menu data every 1 hour (3600 seconds)

export default async function MenuPage() {
  // Fetch dishes directly on the server
  const dishes = await getDishes();

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Addis Eats Menu</h1>
      
      <div 
        style={{ 
          display: "grid", 
          backgroundColor: "rgb(133, 142, 146)",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "20px" 
        }}
      >
        {dishes.map((dish) => (
          <div 
            key={dish.id} 
            style={{ 
              border: "1px solid #ddd", 
              borderRadius: "8px", 
              padding: "16px",
              backgroundColor: "#fff" 
            }}
          >
            <span 
              style={{ 
                fontSize: "0.8rem", 
                backgroundColor: "#f0f0f0", 
                padding: "4px 8px", 
                borderRadius: "4px" 
              }}
            >
              {dish.category}
            </span>
            <h2 style={{ margin: "10px 0 5px 0" }}>{dish.name}</h2>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>{dish.description}</p>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
              <strong style={{ fontSize: "1.2rem", color: "#2e7d32" }}>
                {dish.price} ETB
              </strong>
              
              <Link 
                href={`/menu/${dish.id}`}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "0.9rem"
                }}
              >
                View Dish
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}