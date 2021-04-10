# -*- coding: utf-8 -*-
"""
Created on Sat Apr 10 03:09:12 2021

@author: Alice
"""

import pandas as pd
import json
from plotly.offline import plot
import plotly.graph_objects as go

with open("map_tables.geojson") as geofile:
    geo_world = json.load(geofile)

for i in geo_world['features']:
    i['id'] = i['properties']['name']
    print(i['properties']['name'])
print(geo_world)
    
df = pd.DataFrame({'name':['Origin', 'Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6'],
                   'occupied':[0, 0, 1, 1, 1, 0, 0],
                   'diet': ['', '', 'Vegan', 'N/A', 'Peanut Allergy', '', '']})

# Create figure
fig = go.Figure(go.Choropleth(
    geojson=geo_world,
    locations=df['name'],
    z=df['occupied'],
    text=df['diet']
))

fig.update_geos(
    center=dict(lon=0.0025, lat=0),
    lataxis_range=[-0.00, 0.005], lonaxis_range=[0, 0.01]
)

# Display figure
plot(fig, auto_open=True)