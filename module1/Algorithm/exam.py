# Given an array of numbers, write a function that prints in the console another arraywhich contains all the even numbers in the original array, which also have even indexes only.
#       ○ Test 1: getOnlyEvens([1, 2, 3, 6, 4, 8]) prints [ 4]
#       ○ Test 2: getOnlyEvens([0, 1, 2, 3, 4]) prints [0, 2, 4]
#  Test
def getOnlyEvens(arr):
    # Filter elements that are even and at an even index
    result = [val for idx, val in enumerate(arr) if idx % 2 == 0 and val % 2 == 0]
    print(result)
# Test cases
getOnlyEvens([1, 2, 3, 6, 4, 8])  # Prints: [4]
getOnlyEvens([0, 1, 2, 3, 4])

def practice():
    # Question 1
    # ● Create a function that takes a string as an argument and returns the number of vowels contained in that string. The vowels are “a”, “e”, “i”, “o”, and “u”.
    #      ○ Test 1: countVowels(“Hello”) returns 2
    #      ○ Test 2: countVowels(“Umbrella”) returns 3
    #      ○ Test 3: countVowels(“Sky”) returns 0

    def countVowels(s):
        vowels = "aeiouAEIOU"
        return sum(1 for char in s if char in vowels)

    print(countVowels("Hello"))      # Returns: 2
    print(countVowels("Umbrella"))   # Returns: 3
    print(countVowels("Sky"))        # Returns: 0

    
# Question 2
# ● Create a function that takes a two-digit number as an parameter and prints "Ok" inthe console if the given string is greater than its reversed digit version. If not, the function will print "Not ok"
#      ○ Test 1: reverseCompare(72) prints "ok" because 72 > 27
#      ○ reverseCompare(23) prints "Not ok", because 23 is not greater than 32

def reverseCompare(num):
    reversed_num = int(str(num)[::-1])
    if num>reversed_num:
        print("ok")
    else:
        print("not ok")
reverseCompare(72)
reverseCompare(23)

#  Question 3
# ● Write a function that takes a positive integer and returns the factorial of the number. Notes: The factorial of 0 is 1. Ex: factorial seven is : 1 × 2 × 3 × 4 × 5 × 6 × 7. The factorial of any positive integer x is x * (x - 1) * (x - 2) * . . . . . . * 1 (ex: factorial of 4 is 4 * 3 * 2 * 1 = 24)
#     ○ Test 1: returnFactorial(5) outputs 120
#     ○ Test 2: returnFactorial(6) outputs 720
#     ○ Test 3: returnFactorial(0) outputs 1
# def returnFactorial(n):
#     if n == 0 or n == 1:
#         return 1
    
#     factorial = 1
#     for i in range(2, n + 1):
#         factorial *= i
#     return factorial

# print(returnFactorial(5))
# print(returnFactorial(6))
# print(returnFactorial(0))

# Question 4 (Meera array)
# ● A Meera array is defined to be an array containing only numbers as its elements and forall n values in the array, the value n*2 is not in the array. So [3, 5, -2] is a Meera array because 3*2, 5*2 or 2*2 are not in the array. But [8, 3, 4] is not a Meera array because 2*4=8 and both 4 and 8 are elements found in the array. Write a function that takes an array of numbered elements and prints “I am a Meera array” in the console if its array does NOT contain n and also n*2 as value. Otherwise, the function prints “I am NOT a Meera array”
#       ○ Test 1: checkMeera([10, 4, 0, 5]) outputs “I am NOT a Meera array” because 5 * 2 is 10
#       ○ Test 2: checkMeera([7, 4, 9]) outputs “I am a Meera array”
#       ○ Test 1: checkMeera([1, -6, 4, -3]) outputs “I am NOT a Meera array” because -3 *2 is -6 

# def checkMeera(arr):
    
#     num_set = set(arr)
    
#     for n in arr:
   
#         if n == 0:
#             if arr.count(0) > 1:
#                 print("I am NOT a Meera array")
#                 return
       
#         elif (n * 2) in num_set:
#             print("I am NOT a Meera array")
#             return
            
#     print("I am a Meera array")
# checkMeera([10, 4, 0, 5])
# checkMeera([7, 4, 9])
# checkMeera([1, -6, 4, -3])


# Question 5 (Dual array)
# ● Define a Dual array to be an array where every value occurs exactly twice. For example, {1, 2, 1, 3, 3, 2} is a dual array.The following arrays are not Dual arrays {2, 5, 2, 5, 5} (5 occurs three times instead of two times) {3, 1, 1, 2, 2} (3 occurs once instead of two
# times) Write a function named isDual that returns 1 if its array argument is a Dual array.
# Otherwise it returns 0.

# def isDual(arr):
#     # Dictionary to store the frequency of each number
#     counts = {}
    
#     # Count occurrences of each element
#     for num in arr:
#         counts[num] = counts.get(num, 0) + 1
        
#     for count in counts.values():
#         if count != 2:
#             return 0
            
#     return 1


# print(isDual([1, 2, 1, 3, 3, 2])) 
# print(isDual([2, 3, 2, 5, 5,3]))    
# print(isDual([3, 1, 1, 2, 2]))     

# q,6

def digitalClock(seconds):
    
    seconds = seconds % 86400
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    

    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

# --- Test Cases ---
print(digitalClock(5025))  
print(digitalClock(61201))  
print(digitalClock(87000))  