import React from "react";

function ImageIngredient(props) {
  return (
    <li>
      <img
        className="img-fluid"
        src={props.src}
        alt={props.alt}
        style={props.style}
      />
    </li>
  );
}

function AllImagesIngredients(props) {
  const ingredients = [];
  props.burgerIngredients.forEach((product, index) => {
    ingredients.push(
      <ImageIngredient
        style={product.style}
        src={product.src}
        alt={product.alt}
        key={product.key}
      />
    );
  });
  ingredients.reverse();
  return <ul className="list-group">{ingredients}</ul>;
}

function ViewBurger(props) {
  return (
    <div className="col-12 col-md-6 col-lg-4 p-2 pt-5">
      <AllImagesIngredients burgerIngredients={props.burgerIngredients} />
      <h3>{props.nameBurger}</h3>
      <button onClick={props.onClickRemove} className="btn btn-danger">
        Remove
      </button>
    </div>
  );
}

class ViewAllFavouritesBurgers extends React.Component {
  renderValue(i) {
    return (
      <ViewBurger
        key={i}
        onClickRemove={() => this.props.onClickRemove(i)}
        burgerIngredients={this.props.arrayBurgers[i].burgerIngredients}
        nameBurger={this.props.arrayBurgers[i].burgerName}
      />
    );
  }
  render() {
    const arrayBurgers = this.props.arrayBurgers.slice();
    const viewBurgers = [];
    arrayBurgers.forEach((product, index) => {
      viewBurgers.push(this.renderValue(index));
    });
    return (
      <div className="container">
        <div className="row text-center p-2">
          <div className="col-12">
            <h1>
              Favourites <br />
              Burger
            </h1>
          </div>
          <div className="col-12">
            {arrayBurgers.length === 0 ? (
              <p className="blueInformation pt-5">
                "You don't have any favourites burgers"
              </p>
            ) : null}
          </div>
          <div className="col-12">
            <div className="row align-items-end p-2">{viewBurgers}</div>
          </div>
        </div>
      </div>
    );
  }
}

export { ViewAllFavouritesBurgers };
