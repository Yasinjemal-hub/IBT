# C="Yasin"
# D="Yasin"

# print(C is D)



def linear_search(item, target):
    for i, x in enumerate(item):
        if x == target:
            print(i) 
    return -1 

balances = [1500, 800, 2300, 450]
linear_search(balances, 450) 

