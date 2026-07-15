class account:
    def __init__(self,owner, balance):
       self.balance=balance
       self.owner=owner
    def deposit(self,amount):
        return self.balance + amount

class savingaccount(account):
     def __init__(self, owner, balance):
         super().__init__(owner, balance)
alazar=savingaccount("alazar",2000)

class checkingaccount(account):
    def __init__(self, owner, balance):
        super().__init__(owner, balance)

Rahmet=checkingaccount("Rahmet",1800)

print(Rahmet.balance)