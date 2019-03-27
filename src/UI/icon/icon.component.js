import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ icon, type, className, ...otros }) => {
    if (type !== 'svg') {
        const fa = type === 'solid' ? 'fas' : 'fab';
        const faClass = [className, fa, `fa-${icon}`].join(' ');
        return (<i className={faClass} {...otros}></i>)
    } else {
        const svgClass = [className, 'svg-icon'].join(' ');
        return <img {...otros} className={svgClass} src={icon} alt="svg icon" />
    }
}

Icon.defaultProps = {
    type: 'solid'
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['solid', 'brands', 'svg'])
}


export default Icon;
