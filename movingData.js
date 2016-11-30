/////////Fastest way to move Data from one Application to another/////////

var yourData = new GlideRecord('your_source_data');
yourData.query();
var count=0;

    while(yourData.next()){
        cout ++;
        var copyData = new GlideRecord('your_target_data');
        copyData.initialize();
        copyData.your_sourcedata_set = yourData.your_targetdata_set;
        copyData.yournew_sourcedata_set = yourData.yournew_targetdata_set;
        copyData.insert();
        }
        //do some actions here
        gs.log();
        