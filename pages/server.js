var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request =  require('request');

var score;
var lp;
var adjustment = 1000;
var p;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/diabetes', function(req, res) {
  res.sendFile(path.join(__dirname + '/diabetes.html'));
});

app.get('/BreastCancer', function(req, res) {
  res.sendFile(path.join(__dirname + '/BreastCancer.html'));
});

app.get('/results', function(req, res) {
  res.sendFile(path.join(__dirname + '/results.html'));
});

app.get('/hospitalreadmission', function(req, res) {
  res.sendFile(path.join(__dirname + '/hospitalreadmission.html'));
});

app.get('/aboutus', function(req, res) {
  res.sendFile(path.join(__dirname + '/aboutus.html'));
});

app.get('/interestrate', function(req, res) {
  res.sendFile(path.join(__dirname + '/interestrate.html'));
});

app.get('/housing', function(req, res) {
  res.sendFile(path.join(__dirname + '/housing.html'));
});


//post request from BreastCancer.html
app.post('/cancerApp', function(req, res) {
  var data = req.body;
  request({
    url: 'http://ishan:ScoreData4321@console.scoredata.com/api/score/',
    method: 'POST',
    headers: {
       'Content-Type': "application/json"
    },
    json: true,
    body: {
      'app_id': "32de6aca577a11e6862106f4115cbc5d",
      'feature_data': data.patient_id+','+data.clump+','+data.cell_size+','+data.cell_shape+','+data.adhesion+','+data.single_cell+','
      +data.bare_nuclei+','+data.chromatin+','+data.nucleoli+','+data.mitoses+','+data.diagnosis,
      'debug_mode': '1'
    }
  },
  function(err, response, body) {
  	console.log(data);
    console.log(body);
    score = body.data.predict_score_response.predictions[0].predicted === 1 ? body.data.predict_score_response.predictions[0].class1 : body.data.predict_score_response.predictions[0].class0;
  //  console.log("Error" + err);
    console.log("Score: " + score);
    if(body.data.predict_score_response.predictions[0].predicted === 1) {
      res.sendFile(path.join(__dirname + '/malignant.html'));
    } else {
      res.sendFile(path.join(__dirname + '/benign.html'));
    }
  });
});

//post request from diabetes.html
app.post('/diabeticApp', function(req, res) {
  var data = req.body;
  request({
    url: 'http://ishan:ScoreData4321@console.scoredata.com/api/score/',
    method: 'POST',
    headers: {
       'Content-Type': "application/json"
    },
    json: true,
    body: {
      'app_id': "03523f3a331b11e694f706f4115cbc5d",
      'feature_data': data.num_pregnant+','+data.glucose_concentartion+','+data.Diastolic_blood_pressure+','+data.Triceps_skin_fold_thickness+','+data.hr_serum_insulin+','+data.BMI+','+data.diabetics_pedigree_function+','+data.age+','+data.diabetic,
      'debug_mode': '1'
    }
  }, function(err, response, body) {
  	console.log(data);
    console.log(body);
    console.log("Predict: " + body.data.predict_score_response.predictions[0].predicted);
    console.log("Predict: " + body.data.predict_score_response.predictions[0].class1);
    console.log("Predict: " + body.data.predict_score_response.predictions[0].class0);

    score = body.data.predict_score_response.predictions[0].predicted === 1 ? body.data.predict_score_response.predictions[0].class1 : body.data.predict_score_response.predictions[0].class0;
  //  console.log("Error" + err);
    console.log("Score: " + score);
    if(body.data.predict_score_response.predictions[0].predicted === 1) {
      res.sendFile(path.join(__dirname + '/diabetic.html'));
    } else {
      res.sendFile(path.join(__dirname + '/nondiabetic.html'));
    }
  });
});


////post request from hospitalreadmission.html
app.post('/hospitalreadmission', function(req, res) {
  var data = req.body;

  request({
    url: 'http://user1@demo.com:scoredata1234@console.scoredata.com/api/score/',
    method: 'POST',
    headers: {
       'Content-Type': "application/json"
    },
    json: true,
    body: {
      'app_id': "17010ae4f08a11e596950699570da2b1", //change
      'feature_data': data.race+','+data.gender+','+data.age+','+data.admission_type_id+','+data.discharge_disposition_id+','+data.admission_source_id+','+data.time_in_hospital+','+data.num_lab_procedures+','+data.num_procedures+','+data.num_medications+','+data.number_outpatient+','+data.number_emergency+','+data.number_inpatient+','+data.number_diagnoses+','+data.A1Cresult+','+data.insulin+','+data.change+','+data.diabetesMed+','+data.readmitted+','+data.ic9Groupname3+','+data.ic9Groupname2+','+data.physician_speciality+','+data.ic9Groupname,
      'debug_mode': '1'
    }
  },

   function(err, response, body) {
   	if(data.discharge_disposition_id == "Yes"){
   		data.discharge_disposition_id = '1';
   	} else {
   		data.discharge_disposition_id = '2';
   	}
    if(data.A1Cresult == "Yes"){
      data.A1Cresult = 'high';
    } else {
      data.A1Cresult = 'none';
    }
    if(data.insulin == "Yes"){
      data.insulin = 'Steady';
    } else {
      data.insulin = 'No';
    }
    console.log(data);
    console.log(body);
    score = body.data.predict_score_response.predictions[0].predicted === 1 ? body.data.predict_score_response.predictions[0].class1 : body.data.predict_score_response.predictions[0].class0;
  //  console.log("Error" + err);
    console.log("Score: " + score);
    if(body.data.predict_score_response.predictions[0].predicted === 1) {
      res.sendFile(path.join(__dirname + '/readmitted.html'));
    } else {
      res.sendFile(path.join(__dirname + '/nonreadmitted.html'));
    }

  });
});

//post request from interestrate.html
app.post('/InterestApp', function(req, res) {
  var data = req.body;
  request({
    url: 'http://chirag@scoredata.com:Chirag4321@console.scoredata.com/api/score/',
    method: 'POST',
    headers: {
       'Content-Type': "application/json"
    },
    json: true,
    body: {
      'app_id': "67e49fae970911e683e206f4115cbc5d",
      'feature_data': data.id+','+data.member_id+','+data.loan_amnt+','+data.funded_amnt+','+data.funded_amnt_inv+','+data.term+','+data.int_rate+','+data.installment+','+data.grade+','+data.sub_grade+','+data.emp_length+','+data.home_ownership+','+data.emp_length+','+data.annual_inc+','+data.verification_status+','+data.pymnt_plan+','+data.zip_code+','+data.addr_state+','+data.dti+','+data.pub_rec+','+data.policy_code,
      'debug_mode': '1' 
    }
  }, function(err, response, body) {
  	data.sub_grade = data.grade.concat(data.sub_grade);
    console.log(data);
    console.log(body);
    score = body.data.predict_score_response.predictions[0].predicted;
    console.log("Score: " + score);
    res.sendFile(path.join(__dirname + '/interestrateresults.html'));
  });
});

//post request from housing.html
app.post('/housingApp', function(req, res) {
  var data = req.body;
  var b = parseInt(req.body.full_bathrooms) + parseInt(((req.body.half_bathrooms)/2));
  data.Bathrooms = b;
  console.log("full_bathrooms" + req.body.full_bathrooms);
  console.log("half_bathrooms" + req.body.half_bathrooms);
  console.log("b" + b);
  console.log("data.Bathrooms" + data.Bathrooms);
  var m = Math.log(req.body.Area);
  data.larea = m;
  request({
    url: 'http://user1@demo.com:scoredata1234@console.scoredata.com/api/score/',
    method: 'POST',
    headers: {
       'Content-Type': "application/json"
    },
    json: true,
    body: {
      'app_id': "5768e76ead0e11e6b6bb06f4115cbc5d",
      "feature_data": data.Zipcode+','+data.Bedroom+','+data.Bathrooms+','+data.Area+',m,'+data.Price+','+data.lprice,
      'debug_mode': '1' 
    }
  },function(err, response, body) {
    lp = body.data.predict_score_response.predictions[0].predicted;
    p = Math.pow(2.7182818284590452353602874713527,lp);
    score = p + adjustment
    console.log(data);
    console.log(body);
    console.log(body.data.predict_score_response.predictions);
    console.log(body.data.predict_score_response.model);
    console.log("Pre Score: " + lp);
    console.log("Post Score: " + score);

    res.sendFile(path.join(__dirname + '/housingresults.html'));
  });
});







app.get('/sendFeatures', function(req, res) {
  res.send({
    'score': score
  });
});


app.listen(8080);
