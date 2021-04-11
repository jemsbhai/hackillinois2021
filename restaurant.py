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
from utils import diff_dashtable, get_table_data, update_table_data

app = dash.Dash(__name__)
diets = ['none', 'vegan', 'vegetarian', 'gluten', 'kosher', 'halal']
allergies = ['none', 'dairy', 'peanuts', 'soy', 'shellfish']
def layout_function():
    return html.Div([
    html.Div(id='topbar', children=[html.Img(id='icon', src='/assets/favicon.ico'),
                                    html.H5("MerryDining", 'title')]),
    dcc.Graph(id='choropleth'),
    
    dash_table.DataTable(
        id='restaurant-table',
        columns=[{"name": ["Table ID"], "id": "tableid"},
                 {"name": ["Status"], "id": "status", "presentation": "dropdown"},
                 {"name": ["Diet"], "id": "diet", "presentation": "dropdown"},
                 {"name": ["Allergy"], "id": "allergy", "presentation": "dropdown"}],
        editable=True,
        data=get_table_data().to_dict(orient='records'),
        dropdown={
            'status': {
                'options': [
                    {'label': 'empty', 'value': 'empty'},
                    {'label': 'reserved', 'value': 'reserved'},
                    {'label': 'occupied', 'value': 'occupied'}
                ]
            },
            'diet': {
                'options': [{'label': i, 'value': i} for i in diets]
            },
            'allergy': {
                'options': [{'label': i, 'value': i} for i in allergies]}
        }
    ),

    html.Br(),
    dcc.Store(id="diff-store"),
    html.Div(id="data-diff")
])


app.layout = layout_function

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
    
    changed_rows = diff_dashtable(data, data_previous, 'tableid')
    diff_store_data[ts] = changed_rows
    if diff_store_data:
        for row in changed_rows:
            response = update_table_data(row['tableid'], row['status'], row['diet'], row['allergy'])
        return diff_store_data, str(response)#str(changed_rows)
    
    return diff_store_data, "No Changes to DataTable"

# create and display restaurant map
@app.callback(
    Output(component_id="choropleth", component_property="figure"), 
    Input("restaurant-table", "data"))
def display_choropleth(input_table):
    with open(os.path.join(os.path.dirname(__file__), 'map_full.geojson'), "r") as f:
        geo_world = json.load(f)
    
    # get data directly from table
    df = pd.DataFrame.from_dict(input_table)
    
    colorscales = [[0.0, 'rgb(255, 232.05, 214.2)'],
                   [0.5, 'rgb(255, 181.0, 130.1)'],
                   [1.0, 'rgb(255, 132.6, 51.0)']]
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
                                  text=df['tableid'],
                                  colorscale=colorscales,
                                  colorbar_tickvals=list(tickdict.values()),
                                  colorbar_ticktext=list(tickdict.keys()),
                                  colorbar_tickmode="array",
                                  colorbar_x=-0.03,
                                  colorbar_y=0,
                                  colorbar_yanchor="bottom",
                                  colorbar_title_text="Table Status"))
    fig.update_layout(dragmode=False,
                      margin={"r":0,"t":0,"l":0,"b":0})
    fig.update_geos(center=dict(lon=0.002, lat=0.002),
                    lataxis_range=[-0.005, 0.006],
                    lonaxis_range=[-0.005, 0.006],
                    visible=False)
    
    df_dots = pd.json_normalize(geo_world['features'])
    hover_template_scatter="<b>Table %{customdata[0]}</b><br>" \
                         "Status: %{customdata[1]}<br>" \
                         "Diet: %{customdata[2]}<br>"\
                         "Allergies: %{customdata[3]}"
    # add dietary dots
    diet_colors = {'halal': '#76ac49', 'vegan': '#faff00', 
                   'vegetarian': '#aeff6a', 'kosher':'#589ad6', 'gluten-free': '#fc620b'}
    for diet in list(diet_colors.keys()):
        df_dots_diet = df_dots[df['diet'].str.contains(diet)]
        df_diet = df[df['diet'].str.contains(diet)]
        fig.add_trace(go.Scattergeo(
            lon = df_dots_diet['properties.center'].apply(lambda x: x[0])+0.0001,
            lat = df_dots_diet['properties.center'].apply(lambda x: x[1]),
            name = diet,
            marker = dict(
                size = 20,
                opacity = 0.7,
                color = diet_colors[diet]),
            customdata=np.stack(([df_diet['tableid'], df_diet['status'],
                                  df_diet['diet'], df_diet['allergy']]), axis=-1),
            hovertemplate=hover_template_scatter))
    # add allergy dots
    allergy_colors = {'dairy': '#4ff4ff', 'peanuts': '#fff84f', 'soy': '#a9a53b',
                      'shellfish': '#942288'}
    for allergy in list(allergy_colors.keys()):
        df_dots_allergy = df_dots[df['allergy'].str.contains(allergy)]
        df_allergy = df[df['allergy'].str.contains(allergy)]
        fig.add_trace(go.Scattergeo(
            lon = df_dots_allergy['properties.center'].apply(lambda x: x[0])-0.0001,
            lat = df_dots_allergy['properties.center'].apply(lambda x: x[1]),
            name = allergy,
            marker = dict(
                size = 20,
                opacity = 0.7,
                color = allergy_colors[allergy]),
            customdata=np.stack(([df_allergy['tableid'], df_allergy['status'],
                                  df_allergy['diet'], df_allergy['allergy']]), axis=-1),
            hovertemplate=hover_template_scatter))
    return fig


if __name__ == '__main__':
    app.run_server(debug=True)
