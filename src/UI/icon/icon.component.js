import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({icon, type, className, ...otros}) => {
  const fa = type === 'solid'?'fas':'fab';
  const faClass = [className, fa, `fa-${icon}`].join(' ');
  return (<i className={faClass} {...otros}></i>)
}

Icon.defaultProps = {
  type: 'solid'
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['solid', 'brands'])
}


export default Icon;
