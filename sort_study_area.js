// Read xml item into array, sorted, then output as html
var fs = require('fs');
var xml2js = require('xml2js');
 
var parser = new xml2js.Parser();
var input_path = __dirname + "/input";
var output_path = __dirname + "/output";
var output_array = [];

parser.addListener('end', function(result) {
  var res = result.thesaurus.term;
  var item = '';  

  for(var i=0; i<res.length; i++) {
    /*
      Sample data
      { '$': { name: 'Social theory' } }
      { '$': { name: 'Social policy' } }
    */
    item = res[i];
    output_array.push(item.$.name);
  }

  output_array.sort();
  
  _write_html(output_array);
});


fs.readFile(input_path + "/study_area.xml", function(err, data) {
  parser.parseString(data);
});


function _write_html(res) {
  var buffer = '';
  var item = '';
  
  buffer += '<option value="-1">All study area</option>';
  for(var i=0; i<res.length; i++) {
    item = res[i];
    
    /*
    <option value="Journalism">
      Journalism
    </option>
    */
    buffer += '<option value="' + item + '">' + item + '</option>';
  }

  console.log(buffer); 
}
