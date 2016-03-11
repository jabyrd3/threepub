import _ from 'lodash'
module.exports = function (config) {
  /* globals XMLHttpRequest */
  var service = {}
  if (config.apiUrl) {
    var apiURL = config.apiUrl
  }
  if (config.token) {
    var token = config.token
  }
  var endpoints = ['1', '2', 'token', 'files', 'list_folder', 'download', 'sharing', 'create_shared_link_with_settings']
  // var url = []
  service.map = {}
  service.bodyObj = {}
  service.reset = function () {
    service.bodyObj = {}
    service.map = {}
  }
  // build us a querystring from an object
  service.queryStringBuilder = function (obj) {
    var retString = '?'
    var strings = []
    _.each(obj, function (value, key) {
      strings.push(key + '=' + value)
    })
    retString += strings.join('&')
    console.log('querystringbuilder', retString)
    return retString
  }
  // concatenates obj into proper url, adds querystring if present
  service.concatenator = function (map, query) {
    console.log('map', map, query)
    var concat = ''
    if (Object.keys(map)
      .length > 0) {
      console.log('map exists')
      _.each(map, function (val, key) {
        if (val) {
          concat += '/' + key + '/' + val
        } else {
          concat += '/' + key
        }
      })
    }
    if (query && typeof query === 'string') {
      concat += query
    }
    console.log('concat', concat)
    return concat
  }
  // handles all http reqs
  service.genericHttp = function (method, data, header, raw) {
    console.log(method, data, header, raw)
    // clone vars to scope and reset so that we don't get collisions
    var local = {
      bodyObj: _.clone(service.bodyObj),
      map: _.clone(service.map)
    }
    // clear service for subsequent reqs
    service.reset()
    var deferred = new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      console.log(method, typeof data)
      if (typeof data === 'string' || !data) {
        // has querystring
        console.log('apiurl', apiURL + service.concatenator(local.map,
          data))
        xhr.open(method, apiURL + service.concatenator(local.map, data),
          true)
        console.log(token)
        if (token) {
          xhr.setRequestHeader('Authorization',
            `Bearer ${token}`)
        }
        if (header) {
          xhr.setRequestHeader(header[0], header[1])
        }
        xhr.send(null)
      } else {
        xhr.open(method, apiURL + service.concatenator(local.map),
          true)
        xhr.setRequestHeader('Content-Type',
          'application/json; charset=UTF-8')
        console.log(token)
        if (token) {
          xhr.setRequestHeader('Authorization',
            `Bearer ${token}`)
        }
        console.log('data', JSON.stringify(data))
        if (header) {
          xhr.setRequestHeader(header[0], header[1])
        }
        xhr.send(JSON.stringify(data))
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          //  console.log('http success', xhr.response)
          if (!raw) {
            console.log('bout to parse bro')
            resolve({
              status: xhr.status,
              response: JSON.parse(xhr.response)
            })
          } else {
            console.log('not gonna parse')
            resolve({
              status: xhr.status,
              response: xhr.response
            })
          }
        } else if (xhr.readyState === 4 && (xhr.status === 500 || xhr
            .status === 404)) {
          console.log('http fail', xhr.response)
          reject(xhr.status)
        }
      }
    })
    return deferred
  }
  _.each(endpoints, function (endpoint) {
    service[endpoint] = function (inp) {
      // inp needs to be an int or a string,
      // advance datatypes will just make a broken url
      // there should be some validation eventually.
      if (inp) {
        service.map[endpoint] = inp
      } else {
        service.map[endpoint] = false
      }
      return service
    }
  })
  service.post = function (passObj, header, raw) {
    console.log(passObj)
    if (passObj) {
      service.bodyObj = passObj
    }
    return service.genericHttp('POST', passObj, header, raw)
  }
  service.get = function (querystring) {
    if (typeof querystring === 'string') {
      return service.genericHttp('GET', querystring)
    } else if (querystring) {
      return service.genericHttp('GET', service.queryStringBuilder(
        querystring))
    }
    return service.genericHttp('GET')
  }
  service.delete = function (passObj) {
    if (passObj) {
      service.bodyObj = passObj
    }
    return service.genericHttp('DELETE')
  }
  service.put = function (passObj) {
    if (passObj) {
      service.bodyObj = passObj
    }
    return service.genericHttp('PUT')
  }
  service.patch = function (passObj) {
    if (passObj) {
      service.bodyObj = passObj
    }
    return service.genericHttp('PATCH')
  }
  window.apiService = service
  return service
}
