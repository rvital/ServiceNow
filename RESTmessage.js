//OUTBOUND REST MESSAGE

//Setup Your Rest Message (Your Working REST message Data) in order to accept parameters that will be sent after Business Rule triggered. 
//Create Business Rule where the function (callTetsRest) will be called 
//Create Script Include(TestYourData)


//Business Rule

callTetsRest();
function callTetsRest(){
    var testMS = new TestYourData();
    var cMsg = testMS.updateTestData(current.u_your_number, current.id);
    
{


//Script Include
var TestYourData = Class.create();
TestYourData.prototype = {
    initialize: function() {
    },
    
    updateTestData: function(vYourNumber, vID){
        var vPassword = gs.getProperty('server.name.password');
        var vUsername = gs.getproperty('server.name.username');
        var token = '';
        
        //for DEV
        // setting up Authentication in your desired instance  
        var vInstance = gs.getProperty('instance_name');
        if(vInstance.indexOf('dev')>-1){
            vPassword = "testPassword";
            vUsername = "testUsername";
        }
        
        //setting up your Rest message
        var r =new RESTMessage('Your Token Rest Message', 'post');
        r.setStringParameter('password',vPassword);
        r.setStringParameter('username',vUsername);
      
      
        // start running process
        var response = r.exucute();
        var timeout = false;
        var k = 1;
            //checking to get response 
            while (response == null){
                response =r.getResponse(1000);
                k++;
                    if(k>60){
                        timeout =true;
                        break,// service did not respond after 60 tries
                    }
            }
            //if ok, getting token for working REST message with Data
            if (response != null){
                token = response.getBody().replace('token.id = ','');
            }
            
            //setting up your Rest message
            var r = new RESTMessage('Your Working REST message Data','post');
                r.setStringParameter('token',token);
                r.setStringParameter('dataNumber',vYourNumber);
                r.setStringParameter('dataID',vID);
                
            //checking to get response 
            var response = r.exucute();
            var timeout = false;
            var k = 1;
            while (response == null){
                response = r.getResponse(1000);
                k++;
                
                if(k > 60){
                    timeout= true;
                    break;//service did not respond after 60 tries 
                }
            }    
