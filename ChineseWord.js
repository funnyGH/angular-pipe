 var map_obj = {
        "1":"一",
        "2":"二",
        "3":"三",
        "4":"四",
        "5":"五",
        "6":"六",
        "7":"七",
        "8":"八",
        "9":"九"
    };

var units = ["","十","百","千"];

function prveIs0(sub_str,index) {
    if (index == 0) return false;
    return sub_str.substring(index-1,index) == "0";
}

function unitIndexWithIndex(sub_str,index) {
    return sub_str.length-index-1;
}

function unitWithIndex(sub_str,index) {
    if (index == sub_str.length - 1) return "";
    return units[unitIndexWithIndex(sub_str,index)];
}

function bigUnitWithIndex(index,count) {
    var bigUnits = [];
    if (count == 3) {
        bigUnits = ["","万","亿"];
    }
    if (count == 2) {
        bigUnits = ["","万"];
    }
    if (count == 0) {
        return "";
    }
    return bigUnits[bigUnits.length - index - 1];
}

function subParseChineseWord(result_str,sub_num_str) {
    var sub_result = "";
    for (let index = 0; index < sub_num_str.length; index++) {
        const element = sub_num_str.substring(index,index+1);
        if (element == "0") {
            continue;
        }
        if (prveIs0(sub_num_str,index)) {
            sub_result = sub_result.concat("零");
        }
        sub_result = sub_result.concat(map_obj[element]).concat(unitWithIndex(sub_num_str,index));
    }
    if (sub_result.length == 0) {
        if (result_str.length > 0 && result_str.substr(result_str.length-1,1) == "零") {
            return "";
        }
        sub_result = "零";
    }else {
        if (sub_result.substr(0,1) == "零" && (result_str.length > 0 && result_str.substr(result_str.length-1,1) == "零")) {
            return sub_result.substr(1,sub_result.length - 1);
        }
    }
    return sub_result;
}

function divisionNumStr(num_str) {
    var list = new Array();
    var origin_count = num_str.length / 4;
    var count = parseInt(origin_count);
    var begin_length = 0;
    if (origin_count !== count) {
        begin_length = num_str.length - count * 4;
        list.push(num_str.substr(0,begin_length));
    }
    for (let index = 0; index < count; index++) {
        list.push(num_str.substr(index * 4 + begin_length,4));
    }
    return list;
}

function parseChineseWord(number) {
    var num_str = String(number);
    var list = divisionNumStr(num_str);
    var result = "";
    list.forEach(function (e,index,array) {
        var sub_str = subParseChineseWord(result,e);
        if (sub_str != "零") {
            sub_str = sub_str.concat(bigUnitWithIndex(index,array.length));
        }
        result = result.concat(sub_str);
    });
    return result;
}

