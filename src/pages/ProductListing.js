import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductListing() {
	const [prods, setProds] = useState([]);
	const [prodList, setProdList] = useState([]);
	const [countries, setCountries] = useState([]);

	const [regions, setRegions] = useState([]);
	const [producers, setProducers] = useState([]);
	const [vintage, setVintages] = useState([]);

	const [CartItems, setCartItems] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		axios.get("https://vino-wine.herokuapp.com/api/product").then((res) => {
			//	console.log(res.data);
			setProds(res.data);
			let cntry = [];
			let reg = [];
			let prod = [];
			let vint = [];
			res.data.map((pp) => {
				//	console.log(pp);
				if (cntry.filter((obj) => obj.id === pp.country.id).length === 0) {
					let cnt = pp.country;
					cnt["selected"] = false;
					cntry.push(cnt);
				}

				if (reg.filter((obj) => obj.id === pp.region.id).length === 0) {
					let cnt = pp.region;
					cnt["selected"] = false;
					reg.push(cnt);
				}
				if (prod.filter((obj) => obj.id === pp.producer.id).length === 0) {
					let cnt = pp.producer;
					cnt["selected"] = false;
					prod.push(cnt);
				}

				if (vint.filter((obj) => obj.id === pp.vintage).length === 0) {
					let cnt = {};
					cnt["id"] = pp.vintage;
					cnt["name"] = "" + pp.vintage + "";
					cnt["selected"] = false;
					vint.push(cnt);
				}

				return 1;
			});
			setProdList(res.data);

			setCountries(cntry);
			//	console.log("countries", countries);

			setRegions(reg);
			setProducers(prod);

			//console.log("regions", regions);

			setVintages(vint);

			//	console.log("vintages", vint);
		});
	}, []);

	const checkoutHandler = async () => {
		console.log("checkout clicked");
	};

	const handleAddToCart = async (prd) => {
		let cia = CartItems;

		let ci = CartItems.filter((itm) => {
			return itm.id === prd.id;
		})[0];

		if (ci) {
			ci["qty"] = ci["qty"] + 1;
		} else {
			ci = prd;
			ci["qty"] = 1;
			cia.push(ci);
		}

		setCartTotal(cartTotal + ci.price);

		setCartItems([...CartItems, cia]);

		console.log(CartItems);
	};

	const handleCountrySelect = async (prd) => {
		prd.selected = !prd.selected;
		filterProducts();
	};

	const filterProducts = async () => {
		let filteredset = prods;

		let regionFilter = regions
			.filter((itm) => {
				return itm.selected;
			})
			.map((itm) => {
				return itm.id;
			});

		let countryFilter = countries
			.filter((itm) => {
				return itm.selected;
			})
			.map((itm) => {
				return itm.id;
			});

		if (regionFilter.length > 0) {
			filteredset = prods.filter((item) => {
				return regionFilter.indexOf(item.region_id) > -1;
			});
		} else {
			filteredset = prods;
		}

		if (countryFilter.length > 0) {
			filteredset = filteredset.filter((item) => {
				return countryFilter.indexOf(item.country_id) > -1;
			});
		}

		setProdList(filteredset);
	};

	function openNav() {
		document.getElementById("mySidenav").style.width = "350px";
	}

	/* Set the width of the side navigation to 0 */
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}

	return (
		<React.Fragment>
			<div id="mySidenav" className="sidenav">
				<button className="closebtn" onClick={closeNav}>
					&times;
				</button>
				<div className="container">
					<div className="col-12">
						<h6 className="text-center">Cart</h6>

						<div>
							{CartItems.map((ci) =>
								ci.qty > 0 ? (
									<React.Fragment>
										<div key={ci.id}>
											{ci.name} : {ci.qty}
											<br />
											{ci.price} X {ci.qty} = {ci.price * ci.qty}
											<br /> ---------------------------
										</div>
									</React.Fragment>
								) : (
									""
								)
							)}
							Total :{cartTotal}
						</div>
						<button
							className="btn btn-outline-primary m-3"
							onClick={() => {
								checkoutHandler();
							}}
						>
							Checkout
						</button>
					</div>
				</div>
			</div>

			<div className="content">
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8">
						<h1>Our Wine Collection</h1>
					</div>
					<div className="col-2">
						{CartItems.length > 0 ? (
							<span className="openbtn" onClick={openNav}>
								<i class="bi bi-cart-fill carticon"></i>
							</span>
						) : (
							""
						)}
					</div>
				</div>

				<div className="row container-fluid">
					<div className="col-md-3">
						<div className="row">
							<h6>Region</h6>
							<div className="d-flex flex-wrap">
								{regions.map((region) => (
									<div key={region.id}>
										<div
											className={
												region.selected
													? "btn bg-primary text-white m-1"
													: "btn border border-primary m-1"
											}
											onClick={() => {
												handleCountrySelect(region);
											}}
										>
											{region.name}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="row">
							<h6 className="mt-2">Origin :</h6>
							<div className="d-flex flex-wrap">
								{countries.map((country) => (
									<div key={country.id}>
										<div
											className={
												country.selected
													? "btn bg-primary text-white m-1"
													: "btn border border-primary m-1"
											}
											onClick={() => {
												handleCountrySelect(country);
											}}
										>
											{country.name}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="row">
							<h6 className="mt-2">Vintage :</h6>
							<div className="d-flex flex-wrap">
								{vintage.map((vin) => (
									<div key={vin.id}>
										<div
											className={
												vin.selected
													? "btn bg-primary text-white m-1"
													: "btn border border-primary m-1"
											}
											onClick={() => {
												handleCountrySelect(vin);
											}}
										>
											{vin.name}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="row">
							<h6 className="mt-2">Producer :</h6>
							<div className="d-flex flex-wrap">
								{producers.map((vin) => (
									<div key={vin.id}>
										<div
											className={
												vin.selected
													? "btn bg-primary text-white m-1"
													: "btn border border-primary m-1"
											}
											onClick={() => {
												handleCountrySelect(vin);
											}}
										>
											{vin.name}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="col-md-9">
						<div className="row">
							{prodList
								? prodList.map((prod) => (
										<div className="col-md-4 col-sm-6" key={prod.id}>
											<div className="card h-90 w-100 m-1">
												<img
													className="card-img-top"
													src={prod.image_url}
													alt="Card cap"
												/>
												<div className="card-body">
													<h5 className="card-title">{prod.name}</h5>
													<p className="card-text">
														{prod.country.name}- {prod.region.name}-
														{prod.vintage}{" "}
													</p>

													<div
														className="btn btn-primary"
														onClick={() => {
															handleAddToCart(prod);
														}}
													>
														Add to Cart
													</div>
												</div>
											</div>
										</div>
								  ))
								: ""}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
