try:
   with open('Telebirr-transactions.txt','r') as file:
      for line in file:
        print( line.strip())
except FileNotFoundError:
   print("File not found")

else:
   print("file read sucessfully")

finally:
   print("file operation done")



customer={}

#1
nums1=[1,2,3,3,4,5,4]
unique=set(nums1)
print(unique)

a = {"Almaz", "Dawit"}
b = {"Dawit", "Samuel"}
print(a | b )
print(a & b )
print(a - b )