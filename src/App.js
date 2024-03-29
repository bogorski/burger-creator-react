import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ComponentBurgerCreator } from "./components/Main";
import { ViewAllFavouritesBurgers } from "./components/Favourites";
import bottomBun from "./images/Burger/bottom-bun.png";
import topBun from "./images/Burger/top-bun.png";
import tomato from "./images/Burger/tomato.png";
import burger from "./images/Burger/burger.png";
import fish from "./images/Burger/fish.png";
import lettuce from "./images/Burger/lettuce.png";
import cheese from "./images/Burger/cheese.png";
import bottomBunIng from "./images/Ingredients/bottom-bun.png";
import topBunIng from "./images/Ingredients/top-bun.png";
import tomatoIng from "./images/Ingredients/tomato.png";
import burgerIng from "./images/Ingredients/ingredient-burger.png";
import fishIng from "./images/Ingredients/ingredient-fish.png";
import lettuceIng from "./images/Ingredients/lettuce.png";
import cheeseIng from "./images/Ingredients/ingredient-cheese.png";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 0,
			zIndex: 0,
			height: 0,
			ingredients: [],
			listIngredients: [
				{
					amount: 0,
					name: "bottom \n bun",
					srcList: bottomBunIng,
					src: bottomBun,
				},
				{
					amount: 0,
					name: "top \n bun",
					srcList: topBunIng,
					src: topBun,
				},
				{
					amount: 0,
					name: "tomato",
					srcList: tomatoIng,
					src: tomato,
				},
				{
					amount: 0,
					name: "meat",
					srcList: burgerIng,
					src: burger,
				},
				{
					amount: 0,
					name: "fish",
					srcList: fishIng,
					src: fish,
				},
				{
					amount: 0,
					name: "lettuce",
					srcList: lettuceIng,
					src: lettuce,
				},
				{
					amount: 0,
					name: "cheese",
					srcList: cheeseIng,
					src: cheese,
				},
			],
			saveBurgers: [],
			inputValue: "",
			errorText:
				"Add items to create Your burger. First item must be bottom bun. To finish Your burger choose top bun",
			paragraphClassName: "blueInformation",
		};
	}

	handleClickAddIngredient(i) {
		const ingredients = this.state.ingredients.slice();
		const listIngredients = JSON.parse(
			JSON.stringify(this.state.listIngredients)
		);
		const key = this.state.key + 1;
		const zIndex = this.state.zIndex + 1;
		let height = this.state.height;
		let errorText = this.state.errorText;
		let paragraphClassName = this.state.paragraphClassName;

		if (errorText !== null) {
			errorText = null;
			this.setState({
				errorText: errorText,
			});
		}

		if (paragraphClassName !== null) {
			paragraphClassName = null;
			this.setState({
				paragraphClassName: paragraphClassName,
			});
		}

		if (this.state.ingredients.length === 0 && i !== 0) {
			errorText = "First item must be bottom bun";
			paragraphClassName = "redInformation";
			return this.setState({
				errorText: errorText,
				paragraphClassName: paragraphClassName,
			});
		} else if (this.state.ingredients.length === 8 && i !== 1) {
			errorText =
				"The maximum number of items is 9 including buns. Last item must be top bun";
			paragraphClassName = "redInformation";
			return this.setState({
				errorText: errorText,
				paragraphClassName: paragraphClassName,
			});
		} else if (listIngredients[0].amount >= 1 && i === 0) {
			return;
		} else if (listIngredients[1].amount >= 1) {
			return;
		} else {
			listIngredients[i].amount = listIngredients[i].amount + 1;
			ingredients.push({
				src: listIngredients[i].src,
				alt: listIngredients[i].name,
				key: key,
				height: 0,
				style: {},
			});
		}

		let style = ingredients[ingredients.length - 1].style;

		if (
			ingredients[ingredients.length - 1].alt === "lettuce" ||
			ingredients[ingredients.length - 1].alt === "tomato" ||
			ingredients[ingredients.length - 1].alt === "cheese"
		) {
			height += 20;
			style.position = "relative";
			style.top = height + "px";
			style.zIndex = zIndex;
		}
		if (
			ingredients[ingredients.length - 1].alt === "meat" ||
			ingredients[ingredients.length - 1].alt === "fish" ||
			ingredients[ingredients.length - 1].alt === "top \n bun"
		) {
			style.position = "relative";
			style.top = height + "px";
			style.zIndex = zIndex;
		}
		this.setState({
			listIngredients: listIngredients,
			ingredients: ingredients,
			key: key,
			style: style,
			height: height,
			zIndex: zIndex,
		});
	}

	handleClickSubtractIngredient(i) {
		const listIngredients = JSON.parse(
			JSON.stringify(this.state.listIngredients)
		);
		let ingredients = this.state.ingredients.slice();
		let height = this.state.height;
		let errorText = this.state.errorText;
		let paragraphClassName = this.state.paragraphClassName;

		if (errorText !== null) {
			errorText = null;
			this.setState({
				errorText: errorText,
			});
		}

		if (paragraphClassName !== null) {
			paragraphClassName = null;
			this.setState({
				paragraphClassName: paragraphClassName,
			});
		}
		if (listIngredients[i].amount <= 0 && ingredients.length === 0) {
			errorText =
				"Add items to create Your burger. First item must be bottom bun. To finish Your burger choose top bun";
			paragraphClassName = "blueInformation";
			return this.setState({
				errorText: errorText,
				paragraphClassName: paragraphClassName,
			});
		}

		if (listIngredients[i].amount <= 0) {
			return;
		}
		if (
			listIngredients[0].amount === 1 &&
			ingredients.length > 1 &&
			i === 0 &&
			ingredients[ingredients.length - 1].alt !== "top bun"
		) {
			errorText =
				"You cannot remove the bottom bun while there is another product on it";
			paragraphClassName = "redInformation";
			return this.setState({
				errorText: errorText,
				paragraphClassName: paragraphClassName,
			});
		}
		if (listIngredients[1].amount === 1 && i === 1) {
			listIngredients[i].amount = listIngredients[i].amount - 1;
			ingredients.splice(ingredients.length - 1, 1);
			this.setState(() => {
				return {
					listIngredients: listIngredients,
					ingredients: ingredients,
				};
			});
		} else if (listIngredients[1].amount === 1) {
			return;
		} else {
			const indexSearch = [];
			ingredients.forEach((product, index) => {
				if (product.alt === this.state.listIngredients[i].name) {
					indexSearch.push(index);
				}
			});
			listIngredients[i].amount = listIngredients[i].amount - 1;

			if (
				ingredients[indexSearch[indexSearch.length - 1]].alt === "lettuce" ||
				ingredients[indexSearch[indexSearch.length - 1]].alt === "tomato" ||
				ingredients[indexSearch[indexSearch.length - 1]].alt === "cheese"
			) {
				height -= 20;
			}

			const lastIndexSearchIngredient = indexSearch[indexSearch.length - 1];
			ingredients.splice(lastIndexSearchIngredient, 1);

			let newHeight = 0;
			ingredients.forEach((product, i) => {
				if (i === 0) {
					return;
				} else if (
					product.alt === "lettuce" ||
					product.alt === "tomato" ||
					product.alt === "cheese"
				) {
					newHeight = newHeight + 20;
					product.style = { top: newHeight, position: "relative", zIndex: i };
				} else {
					product.style = { top: newHeight, position: "relative", zIndex: i };
				}
			});

			this.setState(() => {
				return {
					listIngredients: listIngredients,
					ingredients: ingredients,
					height: height,
				};
			});
		}
	}

	handleChange(event) {
		this.setState({ inputValue: event.target.value });
	}

	handleSubmit(event) {
		const saveBurgers = this.state.saveBurgers.slice();
		const listIngredients = JSON.parse(
			JSON.stringify(this.state.listIngredients)
		);
		let errorText = this.state.errorText;
		let paragraphClassName = this.state.paragraphClassName;

		saveBurgers.push({
			burgerIngredients: this.state.ingredients,
			burgerName: this.state.inputValue,
		});
		listIngredients.forEach((product, index) => {
			return (product.amount = 0);
		});

		errorText = "Burger saved successfully in 'Favourites burgers'";
		paragraphClassName = "greenInformation";

		this.setState({
			saveBurgers: saveBurgers,
			inputValue: "",
			ingredients: [],
			listIngredients: listIngredients,
			errorText: errorText,
			paragraphClassName: paragraphClassName,
		});
		event.preventDefault();
	}

	handleClickRemove(i) {
		const saveBurgers = this.state.saveBurgers.slice();
		saveBurgers.splice(i, 1);
		this.setState({
			saveBurgers: saveBurgers,
		});
	}

	render() {
		return (
			<Router>
				<div className="container">
					<div className="row text-center p-2">
						<div className="col-6">
							<Link className="blueInformation" to="/burger-creator-react/">
								Burger creator
							</Link>
						</div>
						<div className="col-6">
							<Link
								className="blueInformation"
								to="/burger-creator-react/favourites"
							>
								Favourites burgers
							</Link>
						</div>
					</div>
				</div>
				<Switch>
					<Route exact path="/burger-creator-react">
						<ComponentBurgerCreator
							arrayIngredients={this.state.listIngredients}
							onClickAddIngredient={(i) => this.handleClickAddIngredient(i)}
							onClickSubtractIngredient={(i) =>
								this.handleClickSubtractIngredient(i)
							}
							selectedIngredients={this.state.ingredients}
							handleChange={(e) => this.handleChange(e)}
							handleSubmit={(e) => this.handleSubmit(e)}
							inputValue={this.state.inputValue}
							topBun={this.state.listIngredients[1].amount}
							errorText={this.state.errorText}
							paragraphClassName={this.state.paragraphClassName}
						/>
					</Route>
					<Route path="/burger-creator-react/favourites">
						<ViewAllFavouritesBurgers
							arrayBurgers={this.state.saveBurgers}
							onClickRemove={(i) => this.handleClickRemove(i)}
						/>
					</Route>
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

export { App };

function NotFound() {
	return <div>Not found</div>;
}
