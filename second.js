/*
* Замерим время выполнения функции накаждом из массивов входных данных.
* И исходя из соотношения времен выполенния и размеров соответствующих входных массивов,
* будем определять вид функции.
* Идея в том, что квадраты, кубы или логарифмы от размеров должны относиться между собой примерно так же как времена исполнения.
* Отсортируем массивы по возрастанию количества элементов.
* Заведем таблицу, в которой для каждого запуска будем хранить
* размер массива
* отношение размера к размеру минимального массива
* отношение времени выполнения ко времени выполнения при минимальном массиве.
* квадрат разности этих отношений.
* Функция, сумма квадратов разностей с которой будет минималной и будет ответом.
*
* 
* */
var now = require("performance-now");
var sleep = require("sleep");
//инициализируем массив с данными.
function init () {
    var data = [];
    for(var i = 10; i <= 100; i += 10){
        var a = [];
        for (var j = 1; j <=i ; j++){
            a.push(j);
        }
        data.push(a);
    }
    return data;
}

function f(row){
    var n = row.length ;
        for (var j = 1; j < n; j++){
            sleep.msleep(1);

        }
}

function assess(f, data) {

    function meusureTime(f, data) {
        var start = now();
        f(data);
        var end  = now();
        return end - start;
        
    }
    //отсортироум массивы по возростанию элементов
    data.sort(function (arr1, arr2) {
        return arr1.length - arr2.length;
    })

    var table = [];
    var firstSize = data[0].length;
    var firstTime  = meusureTime(f, data[0]);
    for (var i = 0; i < data.length; i++){
        var size = data[i].length;
        var time = meusureTime(f, data[i]);
        table.push({
            size : size,
            linRatio : size / firstSize, //линейное отношение размеров
            logRatio : Math.log(size) / Math.log(firstSize), //отношение логарифмов размеров
            sqRatio : size * size / firstSize / firstSize, //отношение квадратов размеров
            cubRatio : size * size * size / firstSize / firstSize/ firstSize, //отношение кубов размеров
            time : time,  //время выполнения
            timeRatio : time/firstTime, //отношение времен выполнения
            linDiff : 0, //квадрат разности линейного отношения размеров и отношения времен выполнения
            logDiff : 0, //квадрат разности  отношения  логарифмов размеров и отношения времен выполнения
            sqDiff : 0, //квадрат разности отношения квадратов размеров и отношения времен выполнения
            cubDiff : 0 //квадрат разности  отношения кубов размеров и отношения времен выполнения

        });
    }

    for (var i = 0; i < table.length; i++){
        table[i].linDiff = Math.pow((table[i].linRatio - table[i].timeRatio),2);
        table[i].logDiff = Math.pow((table[i].logRatio - table[i].timeRatio),2);
        table[i].sqDiff = Math.pow((table[i].sqRatio - table[i].timeRatio),2);
        table[i].cubDiff = Math.pow((table[i].cubRatio - table[i].timeRatio),2);
    }
    //console.log(table);

    answers = [{
        complexity : "O(n)",
        sum : 0,
    },
    {
        complexity : "O(ln(n))",
        sum : 0,
    },
    {
        complexity : "O(n2)",
        sum : 0,
    },
    {
        complexity : "O(n3)",
        sum : 0,
    }];
    //сложим квадраты разностей
    for (var i = 0; i < table.length; i++){
        answers[0].sum += table[i].linDiff;
        answers[1].sum += table[i].logDiff;
        answers[2].sum += table[i].sqDiff;
        answers[3].sum += table[i].cubDiff;
    }
    answers.sort(function (arg1, arg2) {
         return(arg1.sum - arg2.sum);
    })
    //console.log(answers);
    return(answers[0].complexity);

}

console.log(assess(f, init()));