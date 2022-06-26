// utility to check if an object has the required properties, pending implementation...
// e.g., inputCheck(role, 'title', 'salary', 'manager_id')

module.exports = function(obj, ...props) {
    const errors = [];
  
    props.forEach(prop => {
      // if property is blank or doesn't exist, add to errors array
      if (obj[prop] === undefined || obj[prop] === '') {
        errors.push(`No ${prop} specified.`);
      }
    });
  
    if (errors.length) {
      return {
        error: errors.join(' ')
      };
    }
  
    return null;
  };
  