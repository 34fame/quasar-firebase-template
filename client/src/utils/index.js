/**
 * Date/Time Functions
 */
const formatDate = (timestamp) => {
   try {
      return new Date(timestamp).toLocaleDateString
   } catch (error) {
      console.error('utils', 'formatDate', error)
      return false
   }
}

/**
 * Sorting Functions
 */
const sortObjectArray = ({ arr, field, order = 'desc' }) => {
   arr.sort(function (a, b) {
      const fieldA = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field]
      const fieldB = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field]

      let result
      if (order === 'desc') {
         result = fieldA > fieldB ? 1 : -1
      } else {
         result = fieldA < fieldB ? 1 : -1
      }
      return result
   })
   return arr
}

export { formatDate, sortObjectArray }
