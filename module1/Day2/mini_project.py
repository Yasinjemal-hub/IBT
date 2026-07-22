

def split_bill(total,people,tip_rate=0.10):
    per_person=(total+(total*tip_rate))/people
    return per_person


money=int(input("enter the amount of money"))
person=int(input("enter the number of people"))
names=[]

result=split_bill(money,person)

for i in range(person):
  print(f"person {i+1} ows {result}")

customers=[("Almaz",1500),("Dawit",700),("Tigist",200),(
    "Hanna",1200),("Samuel",450)]

def tier(balance):
    if balance>=1000:
        return "Premium"
    elif balance>=500:
        return "Standard"
    else:
        return "Basic"

for name,balance in customers:
    print(f"{name}:{tier(balance)} ({balance}ETB)")

count=0