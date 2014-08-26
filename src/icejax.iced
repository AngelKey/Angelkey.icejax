
# -----------------------------------------------------------------------------

parse = (req) ->
  try
    res = JSON.parse req.responseText
  catch e
    res = req.responseText
  return res

# -----------------------------------------------------------------------------

xhr = (type, url, data, cb) ->
  XHR = XMLHttpRequest or ActiveXObject
  req = new XHR 'MSXML2.XMLHTTP.3.0'
  req.open type, url, true
  req.setRequestHeader 'Content-type', 'application/x-www-form-urlencoded'
  req.onreadystatechange = ->
    if req.readyState is 4
      if req.status is 200
        cb null, parse(req)
      else
        cb parse(req), null
  req.send data

# -----------------------------------------------------------------------------

param = (o) ->
  ###
  converts a basic object dict into serialized form for GET calls
  ###
  s   = []
  euc = encodeURIComponent
  s.push "#{euc k}=#{euc v}" for k,v of o
  return s.join('&').replace /%20/g , '+'

# -----------------------------------------------------------------------------

exports.get = (src, args...) ->
  ###
  either get(url, dict, cb)
  or     get(url, cb)
  ###
  cb = args[args.length - 1]
  if args.length > 1
    src  += if src.indexOf('?') isnt -1 then '&' else '?'
    src  += param args[0]
  xhr 'GET', src, null, cb

# -----------------------------------------------------------------------------

exports.put = (url, data, cb) ->
  xhr 'PUT', url, data, cb

# -----------------------------------------------------------------------------

exports.post = (url, data, cb) ->
  xhr 'POST', url, data, cb

# -----------------------------------------------------------------------------

exports.delete = (src, cb) ->
  xhr 'DELETE', src, null, cb

# -----------------------------------------------------------------------------

