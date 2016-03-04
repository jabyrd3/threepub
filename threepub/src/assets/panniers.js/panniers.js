import _ from 'lodash'
module.exports = function (config) {
  /* globals XMLHttpRequest */
  var service = {}
  var apiURL = config.apiUrl
  var endpoints = ['']
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
    if (query) {
      concat += query
    }
    console.log('concat', concat)
    return concat
  }
  // handles all http reqs
  service.genericHttp = function (method, data) {
    // clone vars to scope and reset so that we don't get collisions
    var local = {
      bodyObj: _.clone(service.bodyObj),
      map: _.clone(service.map)
    }
    // clear service for subsequent reqs
    service.reset()
    var deferred = new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      console.log(method, data)
      if (typeof data === 'string' || !data) {
        // has querystring
        console.log('apiurl', apiURL + service.concatenator(local.map,
          data))
        xhr.open(method, apiURL + service.concatenator(local.map, data),
          true)
        xhr.send(null)
      } else {
        xhr.open(method, apiURL + service.concatenator(local.map, data),
          true)
        xhr.setRequestHeader('Content-Type',
          'application/jsoncharset=UTF-8')
        xhr.send(JSON.stringify(data))
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('http success', xhr.response)
          resolve({
            status: xhr.status,
            response: xhr.response
          })
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
  service.post = function (passObj) {
    if (passObj) {
      service.bodyObj = passObj
    }
    return service.genericHttp('POST')
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
