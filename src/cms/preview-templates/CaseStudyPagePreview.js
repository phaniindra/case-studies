import React from 'react'
import PropTypes from 'prop-types'
import { CaseStudyPostTemplate } from '../../templates/case-study'

const CaseStudyPagePreview = ({ entry, widgetFor }) => (
    <CaseStudyPostTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

CaseStudyPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default CaseStudyPagePreview
