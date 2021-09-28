define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
	var steps = [
        {"key":"variableInitialisation", "label": "Target Channels"},
        {"key": "fieldSelection", "label": "Configure Personalization Fields"}
	];
    var currentStep = steps[0].key;
	var eventDefinitionKey = '1234';
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', onRequestedInteraction);
    connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);
    connection.on('requestedDataSources', onRequestedDataSources);

    connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
	connection.on('requestedInteraction', requestedInteractionHandler);


   
    function onRender() {
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');
        connection.trigger('requestTriggerEventDefinition');
        connection.trigger('requestDataSources');

    }

    function onRequestedDataSources(dataSources){
        console.log('*** requestedDataSources ***');
        console.log(dataSources);
    }

    function onRequestedInteraction (interaction) {    
        console.log('*** requestedInteraction ***');
        console.log(interaction);
     }

     function onRequestedTriggerEventDefinition(eventDefinitionModel) {
        console.log('*** requestedTriggerEventDefinition ***');
        console.log(eventDefinitionModel);
    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log("inArguments")
        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                if (key === 'eventCode')
                {
                    $('#eventCode').val(val);
                }
                if (key === 'targetChannels')
                {
                    $('#targetChannels').val(val);
                }
                if (key === 'customerNo')
                {
                    $('#customerNo').val(val);
                }
                if (key === 'recipientPhoneNumber')
                {
                    $('#recipientPhoneNumber').val(val);
                }
                if (key === 'attribute1')
                {
                    $('#attribute1').val(val);
                }
                if (key === 'attribute2')
                {
                    $('#attribute2').val(val);
                }
                if (key === 'attribute3')
                {
                    $('#attribute3').val(val);
                }
                if (key === 'attribute4')
                {
                    $('#attribute4').val(val);
                }
                if (key === 'attribute5')
                {
                    $('#attribute5').val(val);
                }
                if (key === 'attribute6')
                {
                    $('#attribute6').val(val);
                }
                if (key === 'attribute7')
                {
                    $('#attribute7').val(val);
                }
                if (key === 'attribute8')
                {
                    $('#attribute8').val(val);
                }
                if (key === 'attribute9')
                {
                    $('#attribute9').val(val);
                }
                if (key === 'attribute10')
                {
                    $('#attribute10').val(val);
                }
            });
        });

        if (currentStep.key === 'fieldSelection') {
            connection.trigger('updateButton', {
                        button: 'next',
                        text: 'Next',
                        visible: true
                    });
        } else {
            connection.trigger('updateButton', {
                        button: 'next',
                        text: 'Done',
                        visible: true
                    });
        }

    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {

        var eventCode = $('#eventCode').val();
        var targetChannels = $('#targetChannels').val();
        var customerNo = $('#customerNo').val();
        var recipientPhoneNumber = "";
        var attribute1 = $('#attribute1').val();
        var attribute2 = $('#attribute2').val();
        var attribute3 = $('#attribute3').val();
        var attribute4 = $('#attribute4').val();
        var attribute5 = $('#attribute5').val();
        var attribute6 = $('#attribute6').val();
        var attribute7 = $('#attribute7').val();
        var attribute8 = $('#attribute8').val();
        var attribute9 = $('#attribute9').val();
        var attribute10 = $('#attribute10').val();
        if ($('#targetChannels').val()=== 'SMS'){
            recipientPhoneNumber = $('#recipientPhoneNumber').val();
        }

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "eventCode": eventCode,
            "targetChannels": targetChannels,
            "customerNo": customerNo,
            "recipientPhoneNumber": recipientPhoneNumber,
            "attribute1": attribute1,
            "attribute2": attribute2,
            "attribute3": attribute3,
            "attribute4": attribute4,
            "attribute5": attribute5,
            "attribute6": attribute6,
            "attribute7": attribute7,
            "attribute8": attribute8,
            "attribute9": attribute9,
            "attribute10": attribute10
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }

    function onClickedNext () {
        if (currentStep.key === 'fieldSelection') {
            save();
        } else {
            connection.trigger('nextStep');
        }
    }

    function onClickedBack () {
     		connection.trigger('prevStep');
    }

    function onGotoStep (step) {
        showStep(step);
        connection.trigger('ready');
    }

    function showStep (step, stepIndex) {
        if (stepIndex && !step) {
            step = steps[stepIndex - 1];
        }



        currentStep = step;

        $('.step').hide();

        switch (currentStep.key) {
        case 'variableInitialisation':
            $('#step1').show();
            $('#step1 input').focus();
            break;
        case 'fieldSelection':
            $('#step2').show();
            $('#step2 input').focus();
            if ($('#targetChannels').val()=== 'SMS'){
                $("#phone1").show();
            }
            break;
        }
    }
    function requestedInteractionHandler (settings) {
    		try {
    			eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
    			$('#select-entryevent-defkey').val(eventDefinitionKey);

    		} catch (e) {
    			console.error(e);
    		}
    	}
});
