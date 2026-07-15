class account:
    def __init__(self,owner, balance, rate=0.07):
       self.balance=balance
       self.owner=owner
       self.rate=rate
    def deposit(self,amount):
        return self.balance + amount
    def statment(self):
        return self.balance +self.balance * self.rate
class savingaccount(account):
     def __init__(self, owner, balance, ):
         super().__init__(owner, balance)
alazar=savingaccount("alazar",2000)

class checkingaccount(account):
    def __init__(self, owner, balance,rate ):
        super().__init__(owner, balance, rate)
     

Rahmet=checkingaccount("Rahmet",1800)

print(Rahmet.balance)
print(Rahmet.deposit(700))