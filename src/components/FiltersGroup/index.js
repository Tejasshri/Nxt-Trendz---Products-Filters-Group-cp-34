import {BiSearchAlt2} from 'react-icons/bi'

import './index.css'

const FiltersGroup = props => {
  const {
    changeSearchInput,
    enterSearchInput,
    ratingsList,
    categoryOptions,
    changeCategory,
    changeRating,
    activeRatingId,
    activeCategoryId,
  } = props

  const updateSearch = event => {
    changeSearchInput(event.target.value)
  }

  const enterSearch = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const selectCategory = categoryId => {
    changeCategory(categoryId)
  }

  const clearFilter = () => {
    changeSearchInput('')
    changeCategory('')
    changeRating('')
  }

  const renderCategoryOptions = () =>
    categoryOptions.map(eachCategory => {
      const categoryClassName =
        activeCategoryId === eachCategory.categoryId
          ? 'select-category-btn category-btn'
          : 'category-btn'

      return (
        <li key={eachCategory.categoryId}>
          <button
            type="button"
            onClick={() => selectCategory(eachCategory.categoryId)}
            className={categoryClassName}
          >
            <p>{eachCategory.name}</p>
          </button>
        </li>
      )
    })

  const selectRating = ratingId => {
    changeRating(ratingId)
  }

  const renderRatingOptions = () =>
    ratingsList.map(eachRating => {
      const activeRatingClassName =
        activeRatingId === eachRating.ratingId
          ? 'active-rating-para rating-para'
          : 'rating-para'
      return (
        <li key={eachRating.ratingId}>
          <button
            type="button"
            onClick={() => selectRating(eachRating.ratingId)}
            className="rating-btn"
          >
            <img
              className="ratingImage"
              alt={`rating ${eachRating.ratingId}`}
              src={eachRating.imageUrl}
            />
            <p className={activeRatingClassName}> &up</p>
          </button>
        </li>
      )
    })

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={updateSearch}
          onKeyDown={enterSearch}
        />
        <button type="button" className="search-icon-btn">
          <BiSearchAlt2 className="search-icon" />
        </button>
      </div>
      <h1>Category</h1>
      <ul className="category-container">{renderCategoryOptions()}</ul>
      <h1>Ratings</h1>
      <ul className="ratings-container">{renderRatingOptions()}</ul>
      <button className="clear-filter-btn" type="button" onClick={clearFilter}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
