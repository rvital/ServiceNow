////////////Algorithm to fix or get Duplicates after syncing PROD to UAT instances////////////

fixDupl();
function fixDupl(){

var ga = new GlideRecord('your_table');
ga.addQuery('your_field' '=','Active');
ga.addAggregate('COUNT', 'your_field2');
ga.addQuery('your_field2','!=','');

ga.addQuery('your_field2','IN'"your ids here');
ga.GroupBy('your_field2');
ga.addHaving('COUNT', '>',1);
ga.query();


var counter = 0;
    while(ga.next()){
        counter++;
        var gr2 = new GlideRecord('your_table2');
        gr2.addQuery('your_field3',ga.your_field2);
        gr2.query();
        
        var ctt = 0;
            while(gr2.next()) {
                ctt++;
                gs.print(gr2.your_filed4.your_field2+" "+ gr2.your_field5+" "+gr2.your_field6);
                
                if(ctt>1){  
                    //do update or get here 
                }
            }
 gs.print("total number of duplicates " + ctt);
    }
 gs.log("total found" +counter);
 }
