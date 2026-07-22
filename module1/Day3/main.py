# stock
stock = {}
try:
    with open("stock.tex") as f:
        for line in f:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")


def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

adjust("paracetamol", 5)

print("Low stock items:")
for item, qty in stock.items():
    if qty < 10:
        print(item, "=", qty)

with open("stock.txt", "w") as f:
    for item, qty in stock.items():
        f.write(f"{item},{qty}\n")