import React from "react"
import Layout from "../components/layout"

/**
 * Styles
 */


/**
 * JS Component
 */
const IndexPage = ({data}) => {
  const prices = data.allPrice.edges;
  return (
    <Layout>
      <h1>Prices</h1>
      <ul>
      {prices.map( price => (
        <li>
          <span className="name">{price.node.price.symbol}: </span>
          <span className="price">{price.node.price.regularMarketPrice} |  </span>
          <span className="percent">{price.node.price.regularMarketChangePercent}</span>
        </li>
      ))}
      </ul>
    </Layout>
  )
}

/**
 * GraphQL
 */

export const query = graphql`
  query PricesQuery {
    allPrice {
      edges {
        node {
          id
          price {
            from
            symbol
            shortName
            regularMarketPrice
            regularMarketChange
            regularMarketChangePercent
            value
          }
        }
      }
    }
  }
`

export default IndexPage
