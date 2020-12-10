import sys

# API Key
customer_key = "kT4Mr92rV0NoWjq1AEH9fIzsv"
# API Secret Key
customer_key_secret = "1qKyrhsEnlXaMYJEnvyQduf8zalhrqGs4IUwE0GyGChzxOGo4a"
# Access Token
access_token = "1120777508754821120-NLdfKhCNg1QPvqvGhgAEOGHe48HVwB"
# Access Token Secret
access_token_secret = "KVVK4K1epKVJvD3xnmJ1Lx70x2Cxi225Sui9HibgwApqv"

auth = tweepy.OAuthHandler(customer_key, customer_key_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

try:
	api.me().name
	print("Authentication OK")
except:
	print("Error during authentication")


list_id = '1336889993894084608'

username = sys.argv[1]

api.add_list_member(list_id=list_id, screen_name=username)

print("Screen name added to list")