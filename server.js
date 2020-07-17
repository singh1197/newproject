const axios = require('axios');
const fs = require('fs');
const path = './JsonFile.json';
const HtmlPath = './HtmlFile.html';
const Handlebars = require("handlebars");

const getData = async() => {
    try{
        return axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
    }
    catch (error) {
        console.error(error)
      }
}

const generateHTML =(dataP) =>{
    // var myData = dataP;
    var format = "<style>Table, th, td {border: 1px solid black; border-collapse: collapse;}</style><Table><tr><td>City</td><td>{{name}}</td></tr><tr><td>Weather</td><td>{{#weather}}{{main}}{{/weather}}</td></tr><tr><td>Description</td><td>{{#weather}}{{description}}{{/weather}}</td></tr><tr><td>Current Temperature</td><td>{{#main}}{{temp}}{{/main}}</td></tr><tr><td>Maximum Temperature</td><td>{{#main}}{{temp_max}}{{/main}}</td></tr><tr><td>Minimum Temperature</td><td>{{#main}}{{temp_min}}{{/main}}</td></tr><tr><td>Pressure</td><td>{{#main}}{{pressure}}{{/main}}</td></tr><tr><td>Humidity</td><td>{{#main}}{{humidity}}{{/main}}</td></tr><tr><td>Visibility</td><td>{{visibility}}</td></tr></Table>"
    var template =  Handlebars.compile(format);
    // console.log(template);
    var result = template(JSON.parse(dataP));
    // console.log(data);
     console.log(result);
     fs.writeFileSync(HtmlPath,result)
}


const saveFile = async () => {
    const resp = getData()
      .then(response => {
        fs.writeFileSync(path,JSON.stringify(response.data))
        generateHTML(JSON.stringify(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }




saveFile()