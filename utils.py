# -*- coding: utf-8 -*-
"""
Created on Sun Apr 11 06:44:52 2021

@author: Alice
"""


import requests
import ast
import pandas as pd

def get_table_data():
    url = "https://us-central1-aiot-fit-xlab.cloudfunctions.net/merrydining"
    
    payload = '{"action" : "getalltabledata"}'
    headers = {
        'Content-Type': "application/json",
        'cache-control': "no-cache",
        'Postman-Token': "8cd5ab93-33d9-454b-840e-d63f59bd8a7e"
        }
    
    response = requests.request("POST", url, data=payload, headers=headers)
    response_dict = ast.literal_eval(response.text)
    response_df = pd.DataFrame(response_dict['tables'])
    return response_df

def update_table_data(tableid, status, diet, allergy):
    url = "https://us-central1-aiot-fit-xlab.cloudfunctions.net/merrydining"
    
    payload2 = f"{{\"action\" : \"updatesingletable\","\
                f"\"id\" : {tableid},"\
                f"\"status\" :\"{status}\","\
                f"\"diet\" : \"{diet}\","\
                f"\"allergy\" :\"{allergy}\"}}"
    headers = {
        'Content-Type': "application/json",
        'cache-control': "no-cache",
        'Postman-Token': "8cd5ab93-33d9-454b-840e-d63f59bd8a7e"
        }
    
    response = requests.request("POST", url, data=payload2, headers=headers)
    response_dict = ast.literal_eval(response.text)
    return response
    

def diff_dashtable(data, data_previous, row_id_name="tableid"):

    """Generate a diff of Dash DataTable data.
    Parameters
    ----------
    data: DataTable property (https://dash.plot.ly/datatable/reference)
        The contents of the table (list of dicts)
    data_previous: DataTable property
        The previous state of `data` (list of dicts).

    Returns
    -------
    A list of dictionaries of the changed rows
    """
    df, df_previous = pd.DataFrame(data=data), pd.DataFrame(data_previous)
    for _df in [df, df_previous]:
        assert row_id_name in _df.columns
        _df = _df.set_index(row_id_name)
    mask = df.ne(df_previous)
    changed_rows = df.loc[df[mask].notnull().any(axis=1), :]
    return changed_rows.to_dict(orient='records')
