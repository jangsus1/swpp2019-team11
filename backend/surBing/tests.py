from django.test import TestCase, Client
#from .models import surBing
from django.contrib.auth.models import User
import unittest
import json
# Create your tests here.
class SurBingTestCase(TestCase): 
    def test_token(self):
        # prepare client
        client = Client(enforce_csrf_checks=True)
        # normal case
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # wrong type of request
        response = client.head('/api/token/')
        self.assertEqual(response.status_code, 405) 

    def test_user(self):
        client = Client()
        #signup test
        response = client.post('/api/signup/', json.dumps({'username':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        #signup decode error
        response = client.post('/api/signup/', json.dumps({'userndame':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        #signup existing username error
        response = client.post('/api/signup/', json.dumps({'username':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        

