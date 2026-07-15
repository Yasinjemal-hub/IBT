from abc import ABC 

class account:
    def __init__(self,owner, balance,acc_type, rate=0.07,):
       self.balance=balance
       self.owner=owner
       self.rate=rate
       self.acc_type=acc_type
    def deposit(self,amount):
        return self.balance + amount
    def statment(self):
        if self.acc_type=="saving":
          return self.balance +self.balance * self.rate
        else:
            return self.balance
class savingaccount(account):
     def __init__(self, owner, balance, acc_type):
         super().__init__(owner, balance, acc_type)
alazar=savingaccount("alazar",2000, "saving")

class checkingaccount(account):
    def __init__(self, owner, balance,acc_type):
        super().__init__(owner, balance,acc_type)
     

Rahmet=checkingaccount("Rahmet",1800, "saving")

print(Rahmet.balance)
print(Rahmet.deposit(700))