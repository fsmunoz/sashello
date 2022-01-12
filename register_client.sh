#!/bin/bash

CLIENT_ID=myClientId
CLIENT_PW=myPassword
NS=sas-viya
EP=https://<my SAS endpoint>
CALLBACK=<callback URI, if necessary>

echo '** Settings'
echo Client ID: $CLIENT_ID
echo Client password: $CLIENT_PW
echo SAS Viya namespace: $NS
echo SAS Viya endpoint URI: $EP
echo Callback URI: $CALLBACK

## Request client registration  OAuth token

## Viya 4 only
echo '* Getting consul token'
CONSUL_TOKEN=$(kubectl  -n ${NS} get secret sas-consul-client -o jsonpath="{.data.CONSUL_TOKEN}" | echo  "$(base64 -d)")
echo $CONSUL_TOKEN
echo

echo '* Getting initial OAuth token'
RESPONSE=$(curl -k -X POST "${EP}/SASLogon/oauth/clients/consul?callback=false&serviceId=${CLIENT_ID}" \
		-H "X-Consul-Token: ${CONSUL_TOKEN}")

echo $RESPONSE
echo
AUTH_BEARER=$(echo $RESPONSE |jq -r '.access_token')
echo  "Access token is $AUTH_BEARER"
echo
echo '** Registering client'

curl -k -X POST "${EP}/SASLogon/oauth/clients" \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer ${AUTH_BEARER}" \
   -d "{\"client_id\": \"${CLIENT_ID}\",
     \"client_secret\": \"${CLIENT_PW}\",
     \"scope\": [\"openid\",\"*\"], 
     \"autoapprove\": \"true\",
     \"authorized_grant_types\": [\"authorization_code\",\"refresh_token\"],
      \"redirect_uri\": [\"urn:ietf:wg:oauth:2.0:oob\"],
     \"access_token_validity\": 43199}"

# If using a callback redirect_uri is like this, TODO: use an if
#     \"redirect_uri\": [\"urn:ietf:wg:oauth:2.0:oob\",\"${CALLBACK}\"],
#      \"redirect_uri\": [\"urn:ietf:wg:oauth:2.0:oob\"],
