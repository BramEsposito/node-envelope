
/**
 * Runs a filter on header field.
 * @param  {String} key
 * @param  {Mixed}  value
 * @return {Mixed}
 */
function filter( key, value ) {
  
  for( var i in filter.map ) {
    if( ~filter.map[i].indexOf( key ) )
      return filter.fn[i]( value )
  }
  
  return value
  
}

/**
 * Maps header field names to their filter functions.
 * @type {Object}
 */
filter.map = {
  _address: [ 'from', 'replyTo', 'to', 'cc', 'bcc', 'sender', 'returnPath' ],
  _content: [ 'contentType', 'contentDisposition' ]
}

/**
 * Adds a filter.
 * @param {String|Array} fields
 * @param {Function}     fn
 */
filter.add = function( fields, fn, slot ) {
  
  if( typeof fn !== 'function' ) {
    throw new TypeError( 'Filter is not a function.' )
  }
  
  if( fn.name === '' ) {
    throw new Error( 'Filter must be a named function.' )
  }
  
  if( slot = filter.map[ fn.name ] ) {
    [].concat( fields ).forEach(
      function( field ) {
        if( !~slot.indexOf( field ) ) {
          slot.push( field )
        }
      }
    )
  } else {
    filter.map[ fn.name ] = fields
  }
  
}

/**
 * Filter functions
 * @type {Object}
 */
filter.fn = {
  _address: require( './filters/address' ),
  _content: require( './filters/content' )
}

module.exports = filter
