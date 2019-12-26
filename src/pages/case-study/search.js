import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage';
import Layout from '../../components/Layout'
class CaseStudySearch extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark
        let caseStudies = [...posts];
        if (window) {
            var search = new URLSearchParams(window.location.search);
            var query = search.get("query");
            caseStudies = caseStudies.filter(x => {
                if (query) {
                    if (x.node.excerpt.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                        return true
                    }
                    return false
                }
                return true;
            })
        }
        return (
            <Layout>
                <div className="columns is-multiline">
                    {caseStudies &&
                        caseStudies.map(({ node: post }) => (
                            <div className="is-parent column is-6" key={post.id}>
                                <article
                                    className={`blog-list-item tile is-child box notification`}
                                >
                                    <header>
                                        {post.frontmatter.featuredimage ? (
                                            <div className="featured-thumbnail">
                                                <PreviewCompatibleImage
                                                    imageInfo={{
                                                        image: post.frontmatter.featuredimage,
                                                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                        <p className="post-meta">
                                            <Link
                                                className="title has-text-primary is-size-4"
                                                to={post.fields.slug}
                                            >
                                                {post.frontmatter.title}
                                            </Link>
                                            <span>  </span>
                                            <span className="subtitle is-size-5 is-block">
                                                {post.frontmatter.date}
                                            </span>
                                        </p>
                                    </header>
                                    <p>
                                        {post.excerpt.substr(0, 400)} {post.excerpt.length > 400 && <span>...</span>}
                                        <br />
                                        <br />
                                        <Link className="button" to={post.fields.slug}>
                                            Keep Reading →
                  </Link>
                                    </p>
                                </article>
                            </div>
                        ))}
                </div>
            </Layout>
        )
    }
}

CaseStudySearch.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default (props) => (
    <StaticQuery
        query={graphql`
      query CaseStudySearchQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "case-study" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 10000)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
        render={(data, count) => <CaseStudySearch data={data} />}
    />
)
