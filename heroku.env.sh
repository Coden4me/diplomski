#!/bin/bash
heroku config:set $(cat ./api/.env.prod | sed '/^$/d; /#[[:print:]]*$/d')