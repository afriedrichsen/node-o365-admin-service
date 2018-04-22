# Microsoft Graph Administration REST API
Written in NodeJS.

## Features
This application sits in front of the Microsoft Graph API (v2.0+) and provides enhanced administative funcationality for managing Windows Azure Infrastructure including Azure AD and Office365 


The primary audience would be those working in an intranet setting (e.g. company) where access to the Graph API needs to be centralized (vs. creating multiple App Registrations within the Azure Portal).

##### Operational Features (Current)
* Full Azure User Administration (Add, Modify, Delete)
* User License Administration (Add, Modify, Delete)
* Mobile/Intune Device administration (Add, Modify, Wipe)
* Automated scheduling of administrative tasks.

##### Technical Features
* ES2017 syntax
* Asynchronous (Q promise library)
* Oauth2.0 compliant (client credential model)
* Passport JS for granular, secure access to admin endpoints.
    * compatible with Active Directory and Azure Active Directory
* API documentation generated with apidoc
* Modular client (e.g. server can be deployed without client)
* Mocha and Chai for testing framework(s)
* Docker build

## Overview

Per the official documentation from Microsoft, this application requires registration within the Azure Management Portal.


## Deployment
1.) Register a new "App Registration" within the Azure Management Portal
* Set home page/reply URL to ``http://localhost:3000``
* Ensure the following permissions are assigned:
    * "Directory.ReadWrite.All"
    * "User.ReadWrite.All"
* Ensure a secret (password) is created and added to the registration.
  
2.) Clone the repository.

3.) Copy .env.example to project root and edit:
* Change ``O365_CLIENT_ID`` to the Application ID value obtained from the new app registration in 1.)
* Change ``O365_CLIENT_SECRET`` to the Application Secret value obtained from app registration in 1.)
* Change ``O365_TOKEN_URI`` to the Oauth2.0 token URI found in the Azure Management Portal under Azure Active Directory -> App Registrations -> View Endpoints
* Change ``O365_API_BASE`` to ``https://graph.microsoft.com``
* Change ``O365_API_VERSION`` to the Graph API version you want to use (either ``v1.0`` or ``beta``)
``` 
cd node-365-admin-service
cp .env.example .env
nano .env
```

4.) Run the server according to one of the below methods.
#### Development
Run the following script to start development server.

```
yarn run dev

OR

npm run dev

```
#### Production
In standalone mode ``pm2`` is used to manage the server process. Start with the following script.
```
yarn run production

OR

npm run production
```
#### Docker (Container)
Alternatively, this service can be deployed as a docker container or in a Docker swarm.
```
docker-compose up

OR 

docker stack deploy -c swarm.yml <your service name>

``` 
NOTE: When running with Docker the following need to be set as environment variables on the Docker host:

* ``O365_CLIENT_ID``
* ``O365_CLIENT_SECRET``
* ``O365_TOKEN_URI``
* ``O365_API_BASE``
* ``O365_API_VERSION``

When running in "swarm" mode the above should be set as secrets instead.

#### 
## Authors
* Alexander Friedrichsen