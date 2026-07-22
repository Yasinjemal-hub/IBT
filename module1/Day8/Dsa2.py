# C="Yasin"
# D="Yasin"

# print(C is D)



# def linear_search(item, target):
#     for i, x in enumerate(item):
#         if x == target:
#             print(i) 
#     return -1 

# nums = [450,90,800,750]
# linear_search(nums, 450) 


# def binary_search(item, target):
#  lo,hi=0, len(item) -1
def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
         mid = (lo + hi) // 2
         if items[mid] == target:
                print (mid)
         elif items[mid] < target:
            lo = mid + 1 # go right
         else:
            hi = mid - 1 # go left
    return -1
