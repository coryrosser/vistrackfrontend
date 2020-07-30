# Welcome To VisTrack

![alt text](https://i.imgur.com/HK5cBhm.png)
[Live Demo](https://vistrack.herokuapp.com/)
### Data Entry Made Simple and Engaging

VisTrack is a Data Visualization App made to cut-down some of the tedium
invovled in Data Entry. VisTrack accomplishes this by allowing uses to create
professional, presentation-ready charts for their data. 

Users will be met with Dashboard upon logging in showing them a Recent View
of all their Charts at a glance, and also allowing them to select existing charts
from  a table for further inspection, and making notes. 

![alt text](https://i.imgur.com/EsWKGge.png)


Users can create new visualizations by clicking "Create a New Tracker"
and will be brought to a form that allows users to choose a Title, 
X-Axis labels, and create as many data points as they wish. 

![alt text](https://i.imgur.com/wsii7dB.png)

As you're filling in the information, the chart will be dynamically updated to reflect
new entries. You'll also find a number of customization options for you to choose
from allowing you to truly personalize your chart. After you're done, click "Save Tracker"
and you'll be returned to the dashboard to view your data and export it in either a PNG, CSV, or SVG format.

VisTrack also supports file uploads in the form of Excell/CSV documents and will parse
for column headers and ask the user to select the Title, Labels, and Data Points from those headers.

### Tech Stack
* React
  * react-bootstrap
  * apexcharts
  * styled-components
  * papaparse
  * react-color
* Ruby on Rails
  * JWT Auth
  * bcrypt
* Postgresql

# Upcoming Features
* Continually working to support more chart types
* Group Based collaboration on datasets between multiple users
* Side by side comparison of charts
