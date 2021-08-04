import React from "react";

function CounterValue(props) {
  return (
    <div className="row text-center">
      <div className="col-4 col-lg-3 offset-lg-1">
        <button onClick={props.onClickDecrement} className="btnMinus">
          -
        </button>
      </div>
      <div className="col-4 col-lg-4">
        <p>{props.value}</p>
      </div>
      <div className="col-4 col-lg-3">
        <button onClick={props.onClickIncrement} className="btnPlus">
          +
        </button>
      </div>
    </div>
  );
}

function Ingredient(props) {
  return (
    <div className="col-6 col-md-4 p-2">
      <CounterValue
        value={props.amount}
        onClickDecrement={props.onClickSubtractIngredient}
        onClickIncrement={props.onClickAddIngredient}
      />
      <div className="row align-items-center circle ">
        <div className="col-12">
          <img src={props.src} alt={props.name} className="img-fluid" />
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12">
          <h3>{props.name}</h3>
        </div>
      </div>
    </div>
  );
}

class ListIngredients extends React.Component {
  renderValue(i) {
    return (
      <Ingredient
        onClickAddIngredient={() => this.props.onClickAddIngredient(i)}
        onClickSubtractIngredient={() =>
          this.props.onClickSubtractIngredient(i)
        }
        amount={this.props.arrayIngredients[i].amount}
        name={this.props.arrayIngredients[i].name}
        src={this.props.arrayIngredients[i].srcList}
      />
    );
  }
  render() {
    return (
      <div className="row">
        {this.renderValue(0)}
        {this.renderValue(1)}
        {this.renderValue(2)}
        {this.renderValue(3)}
        {this.renderValue(4)}
        {this.renderValue(5)}
        {this.renderValue(6)}
      </div>
    );
  }
}

class ViewImage extends React.Component {
  render() {
    return (
      <li>
        <img
          src={this.props.src}
          alt={this.props.alt}
          className="img-fluid"
          style={this.props.style}
        />
      </li>
    );
  }
}

function BuildViewBurger(props) {
  const burgerIngredients = [];
  props.selectedIngredients.forEach((product, index) => {
    burgerIngredients.push(
      <ViewImage
        style={product.style}
        src={product.src}
        alt={product.alt}
        key={product.key}
      />
    );
  });
  burgerIngredients.reverse();
  return (
    <div className="col-12 text-center">
      <ul className="list-group">{burgerIngredients}</ul>
    </div>
  );
}

function InputForm(props) {
  return (
    <div className="col-12 text-center p-3">
      <form className="row" onSubmit={props.handleSubmit}>
        <input
          className="col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3"
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
        <input
          className="col-4 offset-4 col-md-2 offset-md-5 col-lg-4 offset-lg-4"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
}

function Paragraph(props) {
  return (
    <div className={props.className}>
      <p>{props.text}</p>
    </div>
  );
}

function ComponentYourBurger(props) {
  return (
    <div className="row text-center">
      <h1>
        Your <br />
        Burger
      </h1>
      <Paragraph className={props.paragraphClassName} text={props.errorText} />
      <BuildViewBurger selectedIngredients={props.selectedIngredients} />
      {props.topBun === 1 ? (
        <InputForm
          handleChange={props.handleChange}
          handleSubmit={props.handleSubmit}
          inputValue={props.inputValue}
        />
      ) : null}
    </div>
  );
}

function ComponentBurgerCreator(props) {
  return (
    <div className="container">
      <div className="row text-center p-2">
        <h1>
          Burger <br />
          Creator
        </h1>
      </div>
      <div className="row p-2">
        <div className="col-12 col-lg-8">
          <ListIngredients
            arrayIngredients={props.arrayIngredients}
            onClickAddIngredient={props.onClickAddIngredient}
            onClickSubtractIngredient={props.onClickSubtractIngredient}
          />
        </div>
        <div className="col-12 col-lg-4">
          <ComponentYourBurger
            selectedIngredients={props.selectedIngredients}
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
            inputValue={props.inputValue}
            topBun={props.topBun}
            errorText={props.errorText}
            paragraphClassName={props.paragraphClassName}
          />
        </div>
      </div>
    </div>
  );
}

export { ComponentBurgerCreator };
