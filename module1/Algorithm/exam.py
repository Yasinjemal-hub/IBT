# Given an array of numbers, write a function that prints in the console another arraywhich contains all the even numbers in the original array, which also have even indexes only.
#       ○ Test 1: getOnlyEvens([1, 2, 3, 6, 4, 8]) prints [ 4]
#       ○ Test 2: getOnlyEvens([0, 1, 2, 3, 4]) prints [0, 2, 4]
#  Test1
def getOnlyEvens(arr):
    
    result = [val for idx, val in enumerate(arr) if idx % 2 == 0 and val % 2 == 0]
    print(result)

getOnlyEvens([1, 2, 3, 6, 4, 8])  
getOnlyEvens([0, 1, 2, 3, 4])
