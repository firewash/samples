function BranchData() {
    this.position = -1;
    this.nodeLength = -1;
    this.src = null;
    this.evalFalse = 0;
    this.evalTrue = 0;

    this.init = function(position, nodeLength, src) {
        this.position = position;
        this.nodeLength = nodeLength;
        this.src = src;
        return this;
    }

    this.ranCondition = function(result) {
        if (result)
            this.evalTrue++;
        else
            this.evalFalse++;
    };

    this.pathsCovered = function() {
        var paths = 0;
        if (this.evalTrue > 0)
          paths++;
        if (this.evalFalse > 0)
          paths++;
        return paths;
    };

    this.covered = function() {
        return this.evalTrue > 0 && this.evalFalse > 0;
    };

    this.toJSON = function() {
        return '{"position":' + this.position
            + ',"nodeLength":' + this.nodeLength
            + ',"src":' + jscoverage_quote(this.src)
            + ',"evalFalse":' + this.evalFalse
            + ',"evalTrue":' + this.evalTrue + '}';
    };

    this.message = function() {
        if (this.evalTrue === 0 && this.evalFalse === 0)
            return 'Condition never evaluated         :\t' + this.src;
        else if (this.evalTrue === 0)
            return 'Condition never evaluated to true :\t' + this.src;
        else if (this.evalFalse === 0)
            return 'Condition never evaluated to false:\t' + this.src;
        else
            return 'Condition covered';
    };
}

BranchData.fromJson = function(jsonString) {
    var json = eval('(' + jsonString + ')');
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

BranchData.fromJsonObject = function(json) {
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

function buildBranchMessage(conditions) {
    var message = 'The following was not covered:';
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i] !== undefined && conditions[i] !== null && !conditions[i].covered())
          message += '\n- '+ conditions[i].message();
    }
    return message;
};

function convertBranchDataConditionArrayToJSON(branchDataConditionArray) {
    var array = [];
    var length = branchDataConditionArray.length;
    for (var condition = 0; condition < length; condition++) {
        var branchDataObject = branchDataConditionArray[condition];
        if (branchDataObject === undefined || branchDataObject === null) {
            value = 'null';
        } else {
            value = branchDataObject.toJSON();
        }
        array.push(value);
    }
    return '[' + array.join(',') + ']';
}

function convertBranchDataLinesToJSON(branchData) {
    if (branchData === undefined) {
        return '{}'
    }
    var json = '';
    for (var line in branchData) {
        if (json !== '')
            json += ','
        json += '"' + line + '":' + convertBranchDataConditionArrayToJSON(branchData[line]);
    }
    return '{' + json + '}';
}

function convertBranchDataLinesFromJSON(jsonObject) {
    if (jsonObject === undefined) {
        return {};
    }
    for (var line in jsonObject) {
        var branchDataJSON = jsonObject[line];
        if (branchDataJSON !== null) {
            for (var conditionIndex = 0; conditionIndex < branchDataJSON.length; conditionIndex ++) {
                var condition = branchDataJSON[conditionIndex];
                if (condition !== null) {
                    branchDataJSON[conditionIndex] = BranchData.fromJsonObject(condition);
                }
            }
        }
    }
    return jsonObject;
}
function jscoverage_quote(s) {
    return '"' + s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g, function (c) {
        switch (c) {
            case '\b':
                return '\\b';
            case '\f':
                return '\\f';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\t':
                return '\\t';
            // IE doesn't support this
            /*
             case '\v':
             return '\\v';
             */
            case '"':
                return '\\"';
            case '\\':
                return '\\\\';
            default:
                return '\\u' + jscoverage_pad(c.charCodeAt(0).toString(16));
        }
    }) + '"';
}

function getArrayJSON(coverage) {
    var array = [];
    if (coverage === undefined)
        return array;

    var length = coverage.length;
    for (var line = 0; line < length; line++) {
        var value = coverage[line];
        if (value === undefined || value === null) {
            value = 'null';
        }
        array.push(value);
    }
    return array;
}

function jscoverage_serializeCoverageToJSON() {
    var json = [];
    for (var file in _$jscoverage) {
        var lineArray = getArrayJSON(_$jscoverage[file].lineData);
        var fnArray = getArrayJSON(_$jscoverage[file].functionData);

        json.push(jscoverage_quote(file) + ':{"lineData":[' + lineArray.join(',') + '],"functionData":[' + fnArray.join(',') + '],"branchData":' + convertBranchDataLinesToJSON(_$jscoverage[file].branchData) + '}');
    }
    return '{' + json.join(',') + '}';
}


function jscoverage_pad(s) {
    return '0000'.substr(s.length) + s;
}

function jscoverage_html_escape(s) {
    return s.replace(/[<>\&\"\']/g, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    this._$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (! this._$jscoverage) {
  this._$jscoverage = {};
}
if (! _$jscoverage['/json/quote.js']) {
  _$jscoverage['/json/quote.js'] = {};
  _$jscoverage['/json/quote.js'].lineData = [];
  _$jscoverage['/json/quote.js'].lineData[6] = 0;
  _$jscoverage['/json/quote.js'].lineData[12] = 0;
  _$jscoverage['/json/quote.js'].lineData[13] = 0;
  _$jscoverage['/json/quote.js'].lineData[25] = 0;
  _$jscoverage['/json/quote.js'].lineData[26] = 0;
  _$jscoverage['/json/quote.js'].lineData[29] = 0;
  _$jscoverage['/json/quote.js'].lineData[30] = 0;
  _$jscoverage['/json/quote.js'].lineData[32] = 0;
  _$jscoverage['/json/quote.js'].lineData[34] = 0;
  _$jscoverage['/json/quote.js'].lineData[35] = 0;
  _$jscoverage['/json/quote.js'].lineData[36] = 0;
  _$jscoverage['/json/quote.js'].lineData[37] = 0;
  _$jscoverage['/json/quote.js'].lineData[39] = 0;
  _$jscoverage['/json/quote.js'].lineData[43] = 0;
  _$jscoverage['/json/quote.js'].lineData[44] = 0;
  _$jscoverage['/json/quote.js'].lineData[45] = 0;
  _$jscoverage['/json/quote.js'].lineData[46] = 0;
  _$jscoverage['/json/quote.js'].lineData[48] = 0;
}
if (! _$jscoverage['/json/quote.js'].functionData) {
  _$jscoverage['/json/quote.js'].functionData = [];
  _$jscoverage['/json/quote.js'].functionData[0] = 0;
  _$jscoverage['/json/quote.js'].functionData[1] = 0;
  _$jscoverage['/json/quote.js'].functionData[2] = 0;
  _$jscoverage['/json/quote.js'].functionData[3] = 0;
  _$jscoverage['/json/quote.js'].functionData[4] = 0;
  _$jscoverage['/json/quote.js'].functionData[5] = 0;
}
if (! _$jscoverage['/json/quote.js'].branchData) {
  _$jscoverage['/json/quote.js'].branchData = {};
  _$jscoverage['/json/quote.js'].branchData['36'] = [];
  _$jscoverage['/json/quote.js'].branchData['36'][1] = new BranchData();
  _$jscoverage['/json/quote.js'].branchData['45'] = [];
  _$jscoverage['/json/quote.js'].branchData['45'][1] = new BranchData();
}
_$jscoverage['/json/quote.js'].branchData['45'][1].init(44, 29, '!(v = REVERSE_CONTROL_MAP[m])');
function visit45_45_1(result) {
  _$jscoverage['/json/quote.js'].branchData['45'][1].ranCondition(result);
  return result;
}_$jscoverage['/json/quote.js'].branchData['36'][1].init(44, 21, '!(v = CONTROL_MAP[m])');
function visit44_36_1(result) {
  _$jscoverage['/json/quote.js'].branchData['36'][1].ranCondition(result);
  return result;
}_$jscoverage['/json/quote.js'].lineData[6]++;
KISSY.add(function(S) {
  _$jscoverage['/json/quote.js'].functionData[0]++;
  _$jscoverage['/json/quote.js'].lineData[12]++;
  var util = S;
  _$jscoverage['/json/quote.js'].lineData[13]++;
  var CONTROL_MAP = {
  '\b': '\\b', 
  '\f': '\\f', 
  '\n': '\\n', 
  '\r': '\\r', 
  '\t': '\\t', 
  '"': '\\"'}, REVERSE_CONTROL_MAP = {}, QUOTE_REG = /["\b\f\n\r\t\x00-\x1f]/g, UN_QUOTE_REG = /\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\"|\\u[0-9a-zA-Z]{4}/g;
  _$jscoverage['/json/quote.js'].lineData[25]++;
  util.each(CONTROL_MAP, function(original, encoded) {
  _$jscoverage['/json/quote.js'].functionData[1]++;
  _$jscoverage['/json/quote.js'].lineData[26]++;
  REVERSE_CONTROL_MAP[original] = encoded;
});
  _$jscoverage['/json/quote.js'].lineData[29]++;
  REVERSE_CONTROL_MAP['\\/'] = '/';
  _$jscoverage['/json/quote.js'].lineData[30]++;
  REVERSE_CONTROL_MAP['\\\\'] = '\\';
  _$jscoverage['/json/quote.js'].lineData[32]++;
  return {
  quote: function(value) {
  _$jscoverage['/json/quote.js'].functionData[2]++;
  _$jscoverage['/json/quote.js'].lineData[34]++;
  return '"' + value.replace(QUOTE_REG, function(m) {
  _$jscoverage['/json/quote.js'].functionData[3]++;
  _$jscoverage['/json/quote.js'].lineData[35]++;
  var v;
  _$jscoverage['/json/quote.js'].lineData[36]++;
  if (visit44_36_1(!(v = CONTROL_MAP[m]))) {
    _$jscoverage['/json/quote.js'].lineData[37]++;
    v = '\\u' + ('0000' + m.charCodeAt(0).toString(16)).slice(0 - 4);
  }
  _$jscoverage['/json/quote.js'].lineData[39]++;
  return v;
}) + '"';
}, 
  unQuote: function(value) {
  _$jscoverage['/json/quote.js'].functionData[4]++;
  _$jscoverage['/json/quote.js'].lineData[43]++;
  return value.slice(1, value.length - 1).replace(UN_QUOTE_REG, function(m) {
  _$jscoverage['/json/quote.js'].functionData[5]++;
  _$jscoverage['/json/quote.js'].lineData[44]++;
  var v;
  _$jscoverage['/json/quote.js'].lineData[45]++;
  if (visit45_45_1(!(v = REVERSE_CONTROL_MAP[m]))) {
    _$jscoverage['/json/quote.js'].lineData[46]++;
    v = String.fromCharCode(parseInt(m.slice(2), 16));
  }
  _$jscoverage['/json/quote.js'].lineData[48]++;
  return v;
});
}};
});
