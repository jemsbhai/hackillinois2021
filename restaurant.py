# -*- coding: utf-8 -*-
"""
Created on Sat Apr 10 03:09:12 2021

@author: Alice
"""

import os
import dash
import dash_table
import json
import numpy as np
import pandas as pd
import plotly.graph_objects as go
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
from plotly.offline import plot
from utils import diff_dashtable, get_table_data


external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

nmb_clicks = 0
app.layout = html.Div([
    html.H6("Restaurant View"),
    dcc.Graph(id='choropleth'),

    dcc.Store(id='click-memory', data = {'nmb_clicks': nmb_clicks}),
    #html.Button('Save', id='save-button', n_clicks=nmb_clicks),
    # this is a link to home page so that it autorefreshes on click 
    html.A(html.Button('Save', id='save-button', n_clicks=nmb_clicks),href='/'),
   
    dcc.Store(id="diff-store"),
    html.P("Changes to DataTable:"),
    html.Div(id="data-diff"),
    
    dash_table.DataTable(
        id='restaurant-table',
        columns=[{"name": ["Table ID"], "id": "tableid"},
                 {"name": ["Status"], "id": "status", "presentation": "dropdown"},
                 {"name": ["Diet"], "id": "diet"},
                 {"name": ["Allergy"], "id": "allergy"}],
        editable=True,
        data=get_table_data().to_dict(orient='records'),
        dropdown={
            'status': {
                'options': [
                    {'label': 'empty', 'value': 'empty'},
                    {'label': 'reserved', 'value': 'reserved'},
                    {'label': 'occupied', 'value': 'occupied'}
                ]
            }
        }
    ),

    html.Br()
])

# track changes in restaurant table
@app.callback(
    [Output("diff-store", "data"),
     Output("data-diff", "children")],
    [Input("restaurant-table", "data_timestamp")],
    [State("restaurant-table", "data"),
     State("restaurant-table", "data_previous"),
     State("diff-store", "data")],
)
def capture_diffs(ts, data, data_previous, diff_store_data):
    if ts is None:
        raise PreventUpdate
    diff_store_data = diff_store_data or {}
    diff_store_data[ts] = diff_dashtable(data, data_previous, 'tableid')
    if diff_store_data:
        dt_changes = []
        for v in diff_store_data.values():
            dt_changes.append(f"* {v}")
        return diff_store_data, [dcc.Markdown(change) for change in dt_changes]
    return diff_store_data, "No Changes to DataTable"


# write updated info to csv file
# TO-DO: Get rid of this
@app.callback(Output('click-memory', 'data'),
             [Input('save-button', 'n_clicks'),
              Input('restaurant-table', 'data')],
             [State('click-memory', 'data')])
def on_data(click, table_data, data):
    if click != nmb_clicks:
        data['nmb_clicks'] = data['nmb_clicks'] + 1
        df = pd.DataFrame.from_dict(table_data)
        df.to_csv(os.path.join(os.path.dirname(__file__), 'data.csv'), index=False)

    return data

# create and display restaurant map
@app.callback(
    Output(component_id="choropleth", component_property="figure"), 
    Input("restaurant-table", "data"))
def display_choropleth(input_table):
    with open(os.path.join(os.path.dirname(__file__), 'map_full.geojson'), "r") as f:
        geo_world = json.load(f)
    
    # get data directly from table
    df = pd.DataFrame.from_dict(input_table)
    
    colorscales = [[0.0, 'green'], [0.5, 'blue'], [1.0, 'red']]
    tickdict = {"empty": 0.0, "reserved": 1.0, "occupied": 2.0}
    hover_template_choro="Table %{customdata[0]}" \
                         "<extra>Status: %{customdata[1]}<br>" \
                         "Diet: %{customdata[2]}<br>"\
                         "Allergies: %{customdata[3]}</extra>"
                         
    df["status_z"] = df["status"].replace(tickdict)
    
    # Create figure
    fig = go.Figure(go.Choropleth(geojson=geo_world,
                                  locations=df['tableid'],
                                  z=df['status_z'],
                                  zmin=0,
                                  zmax=2,
                                  customdata=np.stack(([df['tableid'], df['status'], df['diet'], df['allergy']]), axis=-1),
                                  hovertemplate=hover_template_choro,
                                  
                                  colorscale=colorscales,
                                  colorbar_tickvals=list(tickdict.values()),
                                  colorbar_ticktext=list(tickdict.keys()),
                                  colorbar_tickmode="array",
                                  colorbar_title_text="Table Status"))
    fig.update_layout(title_text="Seating Plan",
                      dragmode=False) 
    fig.update_geos(center=dict(lon=0.002, lat=0.002),
                    lataxis_range=[-0.005, 0.006],
                    lonaxis_range=[-0.005, 0.006])
    return fig


if __name__ == '__main__':
    app.run_server(debug=True)
