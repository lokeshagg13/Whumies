export const ORDER_QUERY = `
  query FindOrderForTracking($searchQuery: String!) {
    orders(first: 5, query: $searchQuery, sortKey: PROCESSED_AT, reverse: true) {
      nodes {
        id
        name
        email
        phone
        displayFinancialStatus
        displayFulfillmentStatus
        paymentGatewayNames

        currentTotalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }

        customer {
          email
          phone
        }

        shippingAddress {
          firstName
          lastName
          address1
          address2
          city
          province
          zip
          country
          phone
          formatted
        }

        lineItems(first: 100) {
          nodes {
            title
            variantTitle
            sku
            quantity
            originalUnitPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            originalTotalSet {
              shopMoney {
                amount
                currencyCode
              }
            }
          }
        }

        transactions {
          kind
          status
          gateway
          formattedGateway
        }

        fulfillments {
          trackingInfo {
            company
            number
            url
          }
        }
      }
    }
  }
`;