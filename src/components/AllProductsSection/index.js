import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    activeRatingId: '',
    searchInput: '',
    apiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusList.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      activeCategoryId,
      activeRatingId,
      searchInput,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&rating=${activeRatingId}&title_search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderFailurePreview = () => (
    <div className="no-product-preview-container">
      <img
        className="no-product-image"
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1 className="no-product-heading">Oops! Something Went Wrong</h1>
      <p className="no-product-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderNoProductPreview = () => (
    <div className="no-product-preview-container">
      <img
        className="no-product-image"
        alt="no products"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
      />
      <h1 className="no-product-heading">No Product Found</h1>
      <p className="no-product-description">
        We couldn't find product try another
      </p>
    </div>
  )

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        {productsList.length === 0 ? (
          this.renderNoProductPreview()
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = value => {
    this.setState({searchInput: value})
  }

  changeCategory = id => {
    this.setState({activeCategoryId: id}, this.getProducts)
    console.log(id)
  }

  changeRating = id => {
    this.setState({activeRatingId: id}, this.getProducts)
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderProductsList()
      case apiStatusList.inprogress:
        return this.renderLoader()
      case apiStatus.failure:
        return this.renderFailurePreview()
      default:
        return null
    }
  }

  render() {
    const {activeRatingId, activeCategoryId} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          ratingsList={ratingsList}
          categoryOptions={categoryOptions}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          activeRatingId={activeRatingId}
          activeCategoryId={activeCategoryId}
        />
        {this.renderView()}
      </div>
    )
  }
}

export default AllProductsSection
