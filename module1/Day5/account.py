from abc import ABC,abstractmethod

class account(ABC):
    def __init__(self,owner, balance,acc_type, rate=0.07,):
       self.balance=balance
       self.owner=owner
       self.rate=rate
       self.acc_type=acc_type
    def deposit(self,amount):
        return self.balance + amount
    @abstractmethod
    def statment(self):
       pass
class savingaccount(account):
     def __init__(self, owner, balance, acc_type):
         super().__init__(owner, balance, acc_type)
     def statment(self):
       if self.acc_type=="saving":
          return self.balance +self.balance * self.rate
       else:
            return self.balance
alazar=savingaccount("alazar",2000, "saving")

class checkingaccount(account):
    def __init__(self, owner, balance,acc_type):
        super().__init__(owner, balance,acc_type)
    def statment(self):
       if self.acc_type=="saving":
          return self.balance +self.balance * self.rate
       else:
            return self.balance

Rahmet=checkingaccount("Rahmet",1800, "saving")

print(Rahmet.balance)
print(Rahmet.deposit(700))