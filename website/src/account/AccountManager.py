class AccountManager():
    def login(self, username, password):
        return True
    
    def getAccountId(self, userId):
        return {
            'account': [
                'marcus',
                '1/1/1950',
                123456]        
        }

    def getAccountName(self, username):
        return {
            'account': [
                'marcus',
                '1/1/1950',
                123456]        
        }
    
    def createAccount(self, username, password):
        return {
            'username': username,
            'password': password
        }