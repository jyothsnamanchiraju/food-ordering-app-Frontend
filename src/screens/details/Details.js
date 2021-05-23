import React, { Component } from "react";
import './Details.css';
import Header from '../../common/header/Header';
import ReactDOM from "react-dom";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { IconButton } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            snackBarOpen: false,
            cartCount: 0,
            cartItems: [],
            totalCost: 0,
            snackBarMessage: "",
            restaurantData : {},
            load: false,
            isLoggedIn: sessionStorage.getItem("access-token") === null ? false : true,
        }
        this.apiURL = "http://localhost:8080/api/";
    }

    /* The below method will retrieve data from API before rendering DOM */
    componentDidMount() {
      let temp = this.props.location.pathname;
      let restaurantId = temp.split("/")[2];

      fetch(this.apiURL + "restaurant/"+ restaurantId,
        {
          cache: 'no-cache',
        })
        .then(function(response) {
          return response.json();
        })
        .then((json) => {
          if(json.code === undefined) {
            this.setState({ restaurantData: json, load: true });
          }
          else {
            ReactDOM.render(
              <div className="backend-error">
                <h1>Restaurant details could not be fetched :(</h1>
                <p><strong>Error code:</strong> {json.code}</p>
                <p><strong>Error message:</strong> {json.message}</p>
              </div>,
              document.getElementById("root")
            );
          }
      }).catch((ex) => {
        ReactDOM.render(
          <div style={{ margin: "10% auto" }}>
            <h1>Something went wrong, please try again :)</h1>
          </div>,
          document.getElementById("root")
        );
      });
    };

    /* This methods checks if cart is empty or not and if customer is logged in/out to go to checkout page */
    checkoutHandler = () => {
      console.log("Details page = "+this.state.totalCost);
      if(this.state.cartItems.length === 0) {
        this.setState({snackBarOpen: true, snackBarMessage: "Please add an item to your cart!",});
      } else {
        if(!this.state.isLoggedIn){
          this.setState({snackBarOpen: true, snackBarMessage: "Please login first!",});
        } else {
          sessionStorage.setItem("restaurantDetails",JSON.stringify(this.state.restaurantData));
          this.props.history.push({
            pathname: "/checkout",
            state: {checkoutCartItems: this.state.cartItems, totalAmount: this.state.totalCost}
          }) 
        }
      }
    }

    /* This function decrements the quantity and total amount and removes item from cart if quantity is 0 */
    cartDecrementQuantityHandler = (element, message) => {
      this.state.cartItems.forEach((eachItemFromCart, j) => {
        if(eachItemFromCart.item.id === element.item.id) {
          if(eachItemFromCart.item.quantity === 1) {
            message = "Item removed from cart!"; // when quantity is 0, removed from cart
            this.state.cartItems.splice(j, 1);
          } else {
            eachItemFromCart.item.quantity -= 1;
          }
        }
      })

      this.setState({snackBarOpen: true, snackBarMessage: message, cartCount: this.state.cartCount-1, totalCost: this.state.totalCost-element.item.price,});
    }

    /* To open snackbar and add items to the cart and if the item is already present in the cart then increment the quantity */
    snackbarOpenHandler = (element, message) => {
      let updated = false;

      this.state.cartItems.forEach((eachItemFromCart) => {
        if(eachItemFromCart.item.id === element.item.id) {
          if(!("quantity" in eachItemFromCart.item)) {
            element.item.quantity = 1;
          } else {
            eachItemFromCart.item.quantity += 1;
          }
          updated = true;
        }
      })

      if(this.state.cartItems.length === 0 || updated === false) {
        element.item.quantity = 1;
        this.setState({cartItems: this.state.cartItems.concat(element),});
      }

      this.setState({snackBarOpen: true, snackBarMessage: message, cartCount: this.state.cartCount+1, totalCost: this.state.totalCost+element.item.price});
    }

    /* Close the snackbar */
    snackbarCloseHandler = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackBarOpen: false});
    }

    render() {
        let data = this.state.restaurantData; // shorthand for this.state.restaurantData

        return(
          <div>
          <Header />
          { this.state.load === true 
            ?
            <div className="container"> 
                {/* container for the grid*/}
                <Grid container spacing={3} id="r-details-wrapper-id" className="r-details-wrapper">
                    {/* Restaurant Image */}
                    <Grid item xs={12} md={3} className="r-image">
                        <img src={this.state.restaurantData.photo_URL} alt={this.state.restaurantData.restaurant_name} />
                    </Grid>

                    <Grid container item xs={12} md={9} className="r-container-right">
                        {/* This grid contains the details of restaurant name, locality and categories */}
                        <Grid item xs={12} className="r-details-container-top">  
                            <h1 className="r-name">{data.restaurant_name}</h1>
                            <p className="r-locality">{data.address.locality}</p>
                            <p className="r-categories">
                              { /* Loop through each category and display it*/
                                this.state.restaurantData.categories.map((element,i) => (
                                  data.categories.length-1 !== i 
                                  ? <span key={"cat"+i+1}>{element.category_name}, </span>
                                  : <span key={"cat"+i+1}>{element.category_name} </span>
                              ))}
                            </p>
                        </Grid>

                        {/* This grid contains the details of ratings and average cost for 2 persons */}
                        <Grid container item xs={12} alignItems="center" className="r-details-container-bottom">
                            <Grid item xs={6} className="r-rating">
                                <div>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <span> {data.customer_rating.toFixed(1)}</span>
                                </div>
                                <p className="r-no-of-customers">AVERAGE RATING BY <strong>{data.number_customers_rated}</strong> CUSTOMERS</p>
                            </Grid>
                            <Grid item xs={6} className="r-cost">
                                <div>
                                    <i className="fa fa-inr" aria-hidden="true"></i>
                                    <span> {data.average_price}</span>
                                </div>
                                <p className="r-avg-cost">AVERAGE COST FOR TWO PEOPLE</p>
                            </Grid>
                        </Grid>

                    </Grid> {/* End of class="r-container-right" */}
                </Grid> {/* End of class="r-details-wrapper" */}

                <div className="order-menu">
                    <div className="category-container">
                        {   /* Loop through each category and display items in it*/
                            data.categories.map((element, i) => (
                                <div key={"cat"+i+1}>
                                    <p key={"catName"+i+1} className="category-name">{element.category_name}</p>
                                    <Divider className="horizontal-line"/>
                                    {element.item_list.map((item, j) => (
                                        <Grid container key={"itemList"+j+1} className="item-details-container">
                                            <Grid item xs={1} md={1} key={"itemType"+j+1}>
                                                {item.item_type === "VEG"
                                                    ? <i className="fa fa-circle veg" aria-hidden="true"></i>
                                                    : <i className="fa fa-circle non-veg" aria-hidden="true"></i>
                                                }
                                            </Grid>
                                            <Grid item xs={6} md={8} key={"itemName"+j+1} className="item-name"><span>{item.item_name}</span></Grid>
                                            <Grid item xs={4} md={2} key={"itemPrice"+j+1} className="item-price"><i className="fa fa-inr" aria-hidden="true"></i> {item.price.toFixed(2)}</Grid>
                                            <Grid item xs={1} md={1} key={"plus"+j+1}><IconButton className="addIcon" onClick={() => this.snackbarOpenHandler({item}, "Item added to cart!")}><AddIcon/></IconButton></Grid>
                                        </Grid>
                                    ))}
                                </div>
                            ))
                        }
                        
                        {/* Snackbar */}
                        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} open={this.state.snackBarOpen} autoHideDuration={2000}
                        onClose={this.snackbarCloseHandler} message={this.state.snackBarMessage}
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.snackbarCloseHandler} value="close">
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                    </div>

                    {/* Shopping cart container */}
                    <div className="cart-container">
                        <Card>
                          <CardContent id="card-content">
                            <div className="card-header">
                              <Badge badgeContent={this.state.cartCount} color="primary" showZero>
                                <ShoppingCartIcon />
                              </Badge>
                              <p className="card-heading">My Cart</p>
                            </div>

                            <div className="cart-items">
                              { /* Display each item with all the details which is added to cart */
                                this.state.cartItems.map((cartItem, j) =>(
                                  <Grid container key={"itemList"+j+1} className="cart-item-details-container">
                                    <Grid item xs={1} md={1} key={"itemType"+j+1}>
                                        {cartItem.item.item_type === "VEG"
                                            ? <i className="fa fa-stop-circle-o veg" aria-hidden="true"></i>
                                            : <i className="fa fa-stop-circle-o non-veg" aria-hidden="true"></i>
                                        }
                                    </Grid>
                                    <Grid item xs={3} md={4} key={"itemName"+j+1} className="cart-item-name">
                                      <span>{cartItem.item.item_name}</span>
                                    </Grid>
                                    <Grid item xs={3} md={3} key={"itemQuant"+j+1} className="cart-quantity-container">
                                      <i className="fa fa-minus cart-minus" aria-hidden="true" onClick={() => this.cartDecrementQuantityHandler(cartItem, "Item quantity decreased by 1!")}></i>
                                      <span className="cart-quantity">{cartItem.item.quantity}</span>
                                      <i className="fa fa-plus cart-plus" aria-hidden="true" onClick={() => this.snackbarOpenHandler(cartItem, "Item quantity increased by 1!")}></i>
                                    </Grid>
                                    <Grid item xs={3} md={2} key={"itemPrice"+j+1} className="cart-item-price">
                                      <i className="fa fa-inr" aria-hidden="true"></i>
                                      <span> {(cartItem.item.quantity*cartItem.item.price).toFixed(2)}</span>
                                    </Grid>
                                  </Grid>          
                                )) 
                              }
                            </div>

                            {/* Total amount and CHECKOUT button */}
                            <div className="total">
                              <span className="total-amount">TOTAL AMOUNT</span>
                              <span className="amount"><i className="fa fa-inr" aria-hidden="true"></i> {this.state.totalCost.toFixed(2)}</span>
                            </div>
                            <Button className="checkout" variant="contained" color="primary" onClick={this.checkoutHandler}>
                              Checkout
                            </Button>
                          </CardContent>
                        </Card>
                    </div> {/* End of Shopping cart container */}
                </div> {/* End of order-menu */}
            </div> 
          : <i className="fa fa-spinner fa-spin loading" /> }
          </div>
        );
    }
}

export default Details;