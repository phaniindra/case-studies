import React from 'react'
import PropTypes from 'prop-types'
import { CustomPageTemplate } from '../../templates/custom-template'

const CustomPagePreview = ({ entry, widgetFor }) => (
    <CustomPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

CustomPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default CustomPagePreview
