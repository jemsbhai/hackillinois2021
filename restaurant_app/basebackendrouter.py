import os
import pymongo
import json
import random
# import psycopg2
import hashlib
import time

from hashlib import sha256







def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()

    
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["merrydining"]


    retjson = {}

    action = request_json['action']

    if action == "getsingletabledata":
        col = db.tabledata
        for x in col.find():
            if int(x['id']) == int(request_json['id']):
                status = x['status']
                diet = x['diet']
                allergy = x['allergy']

                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['occupancy'] = status
                retjson['diet'] = diet
                retjson['allergy'] = allergy
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)


    if action == "updatesingletable":
        col = db.tabledata
        for x in col.find():
            if int(x['id']) == int(request_json['id']):
                if 'status' in request_json:
                    col.update_one({"id": x['id']}, {"$set":{"status":request_json['status']}})
                if 'diet' in request_json:
                    col.update_one({"id": x['id']}, {"$set":{"diet":request_json['diet']}})
                if 'allergy' in request_json:
                    col.update_one({"id": x['id']}, {"$set":{"allergy":request_json['allergy']}})
                    
                status = x['status']
                diet = x['diet']
                allergy = x['allergy']

                retjson = {}

                # retjson['dish'] = userid
                retjson['responsestatus'] = "success"
                retjson['status'] = status
                retjson['diet'] = diet
                retjson['allergy'] = allergy
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)



    if action == "getalltabledata":
        col = db.tabledata
        tables = []
        for x in col.find():
            table = {}

            table['tableid'] = x['id']
            table['status'] = x['status']
            table['diet'] = x['diet']
            table['allergy'] = x['allergy']

            tables.append(table)

            


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['tables'] = tables
        

        return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)




    if action == "addscore" :
        maxid = 1
        col = db.scores
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["userid"] = request_json['userid']
        payload["score"] = request_json['score']
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)


    if action == "getmyscore":
        col = db.scores
        for x in col.find():
            if x['userid'] == request_json['userid']:
                score = x['score']
                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['score'] = score

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)



    if action == "getallitems":
        col = db.items
        scores = []
        for x in col.find():
            entry = {}
            entry['userid'] = x['userid']
            entry['item'] = x['item']
            scores.append(entry)
            
        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['scores'] = scores

        return json.dumps(retjson)
        retjson = {}




    if action == "attempt":
        col = db.tables

        uid = request_json['uid']
        sid = request_json['sid']

        uline = request_json['line']

       
        for x in col.find():
            if x['id'] == sid:
                line = x['line']
        
        num = len(line)
        # score = num - editDistance(line, uline, len(line), len(uline))

        score = num - edit_distance(line, uline)


        if score < 0:
            score = 0 
                
        retjson = {}

        # retjson['dish'] = userid
        retjson['score'] = score
        retjson['id'] = "-1"

        return json.dumps(retjson)


    if action == "getrandomtable":
        col = db.tables

        maxid = 0
        for x in col.find():
            maxid = int(x["id"])
        
        index = random.randint(1, maxid)

        for x in col.find():
            if x['id'] == str(index):
                sid = x['id']
                url = x['url']
                retjson = {}

                # retjson['dish'] = userid
                retjson['url'] = url
                retjson['id'] = sid
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)    

    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
