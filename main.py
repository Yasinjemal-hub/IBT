# try:
#     with open("note.tex",'a') as f:
#      print(f.write("\"barvo"))
# except FileExistsError:
#    print("file not found")


try:
      amount = int(input("Amount: "))
      result = 1000 / amount
except ValueError:
    print("Please enter a number")
except ZeroDivisionError:
      print("Amount can't be zero")
finally:
    print("done")