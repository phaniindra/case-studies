import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const CaseStudyPostTemplate = ({
    content,
    contentComponent,
    description,
    tags,
    title,
    helmet,
}) => {
    const PostContent = contentComponent || Content

    return (
        <React.Fragment>
            {/* <div
                className="full-width-image-container margin-top-0"
                style={{
                    backgroundImage: `url('/img/blog-index.jpg')`,
                }}
            >
                <h1
                        className="has-text-weight-bold is-size-1"
                        style={{
                            boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                            backgroundColor: '#f40',
                            color: 'white',
                            padding: '1rem',
                        }}
                    >
                        Latest Stories
          </h1>
            </div> */}
            <section className="section">
                {helmet || ''}
                <div className="container content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                                {title}
                            </h1>
                            <p>{description}</p>
                            <PostContent content={content} />
                            {tags && tags.length ? (
                                <div style={{ marginTop: `4rem` }}>
                                    <h4>Tags</h4>
                                    <ul className="taglist">
                                        {tags.map(tag => (
                                            <li key={tag + `tag`}>
                                                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

CaseStudyPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const CaseStudyPost = ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <Layout>
            <CaseStudyPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                // description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                // tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    )
}

CaseStudyPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default CaseStudyPost

export const pageQuery = graphql`
  query CaseStudyPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
