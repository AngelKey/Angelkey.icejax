// Generated by IcedCoffeeScript 1.7.1-f
(function() {
  var param, parse, xhr,
    __slice = [].slice;

  parse = function(req) {
    var e, res;
    try {
      res = JSON.parse(req.responseText);
    } catch (_error) {
      e = _error;
      res = req.responseText;
    }
    return res;
  };

  xhr = function(type, url, data, cb) {
    var XHR, req;
    XHR = XMLHttpRequest || ActiveXObject;
    req = new XHR('MSXML2.XMLHTTP.3.0');
    req.open(type, url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 200) {
          return cb(null, parse(req));
        } else {
          return cb(parse(req), null);
        }
      }
    };
    return req.send(data);
  };

  param = function(o) {

    /*
    converts a basic object dict into serialized form for GET calls
     */
    var euc, k, s, v;
    s = [];
    euc = encodeURIComponent;
    for (k in o) {
      v = o[k];
      s.push("" + (euc(k)) + "=" + (euc(v)));
    }
    return s.join('&').replace(/%20/g, '+');
  };

  exports.get = function() {
    var args, cb, src;
    src = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];

    /*
    either get(url, dict, cb)
    or     get(url, cb)
     */
    cb = args[args.length - 1];
    if (args.length > 1) {
      src += src.indexOf('?') !== -1 ? '&' : '?';
      src += param(args[0]);
    }
    return xhr('GET', src, null, cb);
  };

  exports.put = function(url, data, cb) {
    return xhr('PUT', url, data, cb);
  };

  exports.post = function(url, data, cb) {
    return xhr('POST', url, data, cb);
  };

  exports["delete"] = function(src, cb) {
    return xhr('DELETE', src, null, cb);
  };

}).call(this);