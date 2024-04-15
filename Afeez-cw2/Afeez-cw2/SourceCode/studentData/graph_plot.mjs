//Axios will handle HTTP requests to web service
import axios from 'axios';

//The ID of the student whose data you want to plot
let studentID = 'M00977103';

//URL where student data is available
let url = 'https://y2gtfx0jg3.execute-api.us-east-1.amazonaws.com/prod/';

//Authentication details for Plotly
//ADD YOUR OWN AUTHENTICATION DETAILS
const PLOTLY_USERNAME = 'Afeez';
const PLOTLY_KEY = 'g2Bmm2PS6zMYgUy22OcA';

//Initialize Plotly with user details.
import Plotly from 'plotly';
import { invokeEndpoint } from './query_endpoint.mjs';
let plotly = Plotly(PLOTLY_USERNAME, PLOTLY_KEY);
async function handler(event) {
    try {
        // Get synthetic data
        let studentData = (await axios.get(url + studentID)).data;
        let predictions = await invokeEndpoint();

        // Add basic X values for student data
        let xValuesStudent = [...Array(studentData.target.length).keys()];

        // Add X values for predictions
        let xValuesPredictions = [...Array(predictions.predictions[0].mean.length).keys()].map(i => i + xValuesStudent.length);

        // Concatenate X values for student data and predictions
        let xValues = [...xValuesStudent, ...xValuesPredictions];
        
        // Call function to plot data
        let plotResult = await plotData(studentID, xValues, studentData.target, predictions);
        console.log("Plot for student '" + studentID + "' available at: " + plotResult.url);

        return {
            statusCode: 200,
            body: "Ok"
        };
    }
    catch (err) {
        console.log(err);
        console.log("ERROR: " + JSON.stringify(err));
        return {
            statusCode: 500,
            body: "Error plotting data for student ID: " + studentID
        };
    }
};

// Plots the specified data
async function plotData(studentID, xValues, yValues, predictions) {
    // Data structure for student data
    let studentData = {
        x: xValues.slice(0, yValues.length), // Use X values for student data
        y: yValues,
        type: "scatter",
        mode: 'line',
        name: studentID,
        marker: {
            color: 'rgb(219, 60, 82)',
            size: 12
        }
    };

    // Data structure for predictions - Mean
    let predictionDataMean = {
        x: xValues.slice(yValues.length),
        y: predictions.predictions[0].mean,
        type: "scatter",
        mode: 'line',
        name: 'Mean',
        marker: {
            color: 'rgb(64, 10, 219)',
            size: 12
        }
    };

    // Data structure for predictions - Quantiles
    let predictionDataQuantiles1 = {
        x: xValues.slice(yValues.length),
        y: predictions.predictions[0].quantiles["0.1"],
        type: "scatter",
        mode: 'line',
        name: 'Quantiles[0.1]',
        marker: {
            color: 'black',
            size: 12
        }
    };
    let predictionDataQuantiles2 = {
        x: xValues.slice(yValues.length),
        y: predictions.predictions[0].quantiles["0.9"],
        type: "scatter",
        mode: 'line',
        name: 'Quantiles[0.9]',
        marker: {
            color: 'green',
            size: 12
        }
    };
    // Data structure for predictions - Samples
   
    let data = [studentData, predictionDataMean, predictionDataQuantiles1, predictionDataQuantiles2, ];

    // Layout of graph
    let layout = {
        title: "Synthetic Data and Predictions for Student " + studentID,
        font: {
            size: 25
        },
        xaxis: {
            title: 'Time (hours)'
        },
        yaxis: {
            title: 'Value'
        }
    };

    let graphOptions = {
        layout: layout,
        filename: "date-axes",
        fileopt: "overwrite"
    };

    // Wrap Plotly callback in a promise
    return new Promise((resolve, reject) => {
        plotly.plot(data, graphOptions, function (err, msg) {
            if (err)
                reject(err);
            else {
                resolve(msg);
            }
        });
    });
};

handler(); // Call the handler function to plot the data and predictions
