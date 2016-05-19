'use strict';

var btns = document.getElementsByClassName('btn');
var expression$ = Rx.Observable.fromEvent(btns, 'click')
    .map((e) => {
        return $(e.target).text();
    });
    
var outputField = document.getElementById('output');
var out$ = expression$.startWith('')
            .scan((prev, curr) => {
                if (curr==='AC')
                    return '';
                else if (curr==='=') 
                    return Parser.evaluate(outputField.value);
                else if (curr==='log') 
                    return Parser.evaluate('log(' + outputField.value+')');
                else if (curr==='sin') 
                    return Parser.evaluate('sin(' + outputField.value+')');
                else if (curr==='tan') 
                    return Parser.evaluate('tan(' + outputField.value+')');
                else
                    return prev+curr;
            });

out$.subscribe(function (x) {
        outputField.value = x;
        console.log('clicked!');
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed')
    });