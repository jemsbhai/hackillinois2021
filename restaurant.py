# -*- coding: utf-8 -*-
"""
Created on Sat Apr 10 03:09:12 2021

@author: Alice
"""

import pandas as pd
import json
from plotly.offline import plot
import plotly.graph_objects as go
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, State
import dash_table
import numpy as np
from urllib.request import urlopen
import plotly.express as px
import os
from flask import Flask, request, render_template


external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)


app.layout = html.Div([
    html.H6("Change the value in the text box to see callbacks in action!"),
    html.Div(["Input: ",
              dcc.Input(id='myinput', value='initial value', type='text')]),
    html.Br(),
    html.Div(id='candidate'),
    dcc.Graph(id='choropleth'),


])

@app.callback(
    Output(component_id="choropleth", component_property="figure"), 
    Input("myinput", "value"))
def display_choropleth(input_value):
    with open(os.path.join(os.path.dirname(__file__), 'map_full.geojson'), "r") as f:
        geo_world = json.load(f)

    df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'data.csv'))
    
    colorscales = [(0.0, '#ff0000'), (1.0, '#00ff00')]
    # Create figure
    fig = go.Figure(go.Choropleth(geojson=geo_world,
                                  locations=df['tables'],
                                  z=df['occupied'],
                                  text=df['diet'],
                                  colorscale=colorscales,
                                  colorbar_tickvals=[0, 1],
                                  colorbar_ticktext=['Full', 'Empty'],
                                  colorbar_tickmode="array",
                                  colorbar_title_text="Occupied"))
    fig.update_layout(title_text=input_value) 
    fig.update_geos(center=dict(lon=0.002, lat=0.002),
                    lataxis_range=[-0.005, 0.006],
                    lonaxis_range=[-0.005, 0.006])
    return fig


@app.callback(
    Output(component_id='candidate', component_property='children'),
    Input(component_id='myinput', component_property='value')
)
def update_output_div(input_value):
    return 'Output: {}'.format(input_value)


if __name__ == '__main__':
    app.run_server(debug=True)
