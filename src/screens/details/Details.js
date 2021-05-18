import React, { Component } from "react";
import './Details.css';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from "@material-ui/core";
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            restaurantData : {
                "id": "5485eb18-a23b-11e8-9077-720006ceb890",
                "restaurant_name": "Splitsvilla Bar & Lounge",
                "photo_URL": "https://b.zmtcdn.com/data/pictures/9/18634739/6d62975f9bb88caec207ef0c1f570f81.jpg?output-format=webp",
                "customer_rating": 4,
                "average_price": 1000,
                "number_customers_rated": 848,
                "address": {
                  "id": "9c174b25-cb31-66a8-98b4-d06ffc9d5f9f",
                  "flat_building_name": "House 101, Opposite Vijay Sales",
                  "locality": "Chembur",
                  "city": "Mumbai",
                  "pincode": "400092",
                  "state": {
                    "id": "c860e78a-a29b-11e8-9a3a-720006ceb890",
                    "state_name": "Maharashtra"
                  }
                },
                "categories": [
                  {
                    "id": "2ddf5e9c-ecd0-11e8-8eb2-f2801f1b9fd1",
                    "category_name": "Chinese",
                    "item_list": [
                      {
                        "id": "f55086f7-b51e-4044-b258-b7b96c4b7f42",
                        "item_name": "Cataplana Algarve",
                        "price": 245,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf36f6-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "pastry",
                        "price": 210,
                        "item_type": "VEG"
                      }
                    ]
                  },
                  {
                    "id": "2ddf6158-ecd0-11e8-8eb2-f2801f1b9fd1",
                    "category_name": "Continental",
                    "item_list": [
                      {
                        "id": "2ddf4768-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "chillie chowmine",
                        "price": 210,
                        "item_type": "NON_VEG"
                      },
                      {
                        "id": "2ddf6a5e-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Grilled 0",
                        "price": 203,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf42d6-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "matar paneer",
                        "price": 270,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf4e66-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "mushroom biryani",
                        "price": 203,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf3be2-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "naan",
                        "price": 30,
                        "item_type": "VEG"
                      }
                    ]
                  },
                  {
                    "id": "2ddf567c-ecd0-11e8-8eb2-f2801f1b9fd1",
                    "category_name": "Indian",
                    "item_list": [
                      {
                        "id": "2ddf27ce-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "chiken burger",
                        "price": 100,
                        "item_type": "NON_VEG"
                      },
                      {
                        "id": "2ddf59f6-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Corn-On-The-Cob",
                        "price": 270,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf6a5e-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Grilled 0",
                        "price": 203,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf36f6-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "pastry",
                        "price": 210,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf2f4e-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "vanilla icecream",
                        "price": 230,
                        "item_type": "VEG"
                      }
                    ]
                  },
                  {
                    "id": "2ddf5546-ecd0-11e8-8eb2-f2801f1b9fd1",
                    "category_name": "Italian",
                    "item_list": [
                      {
                        "id": "f55086f7-b51e-4044-b258-b7b96c4b7f42",
                        "item_name": "Cataplana Algarve",
                        "price": 245,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf5546-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Chicken Roll",
                        "price": 150,
                        "item_type": "NON_VEG"
                      },
                      {
                        "id": "2ddf6284-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Espetada",
                        "price": 210,
                        "item_type": "NON_VEG"
                      },
                      {
                        "id": "2ddf4e66-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "mushroom biryani",
                        "price": 203,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf230a-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "pizza",
                        "price": 200,
                        "item_type": "NON_VEG"
                      }
                    ]
                  },
                  {
                    "id": "2ddf57a8-ecd0-11e8-8eb2-f2801f1b9fd1",
                    "category_name": "Snacks",
                    "item_list": [
                      {
                        "id": "2ddf5546-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Chicken Roll",
                        "price": 150,
                        "item_type": "NON_VEG"
                      },
                      {
                        "id": "2ddf59f6-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Corn-On-The-Cob",
                        "price": 270,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf6284-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "Espetada",
                        "price": 210,
                        "item_type": "NON_VEG"
                      },
                      {
                        "id": "2ddf42d6-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "matar paneer",
                        "price": 270,
                        "item_type": "VEG"
                      },
                      {
                        "id": "2ddf3be2-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "naan",
                        "price": 30,
                        "item_type": "VEG"
                      }
                    ]
                  },
                  {
                    "id": "2ddf59f6-ecd0-11e8-8eb2-f2801f1b9fd1",
                    "category_name": "Sweet Dish",
                    "item_list": [
                      {
                        "id": "2ddf4768-ecd0-11e8-8eb2-f2801f1b9fd1",
                        "item_name": "chillie chowmine",
                        "price": 210,
                        "item_type": "NON_VEG"
                      }
                    ]
                  }
                ]
              },
        }
    }

    render() {
        
        let data = this.state.restaurantData; // shorthand for this.state.restaurantData

        return(
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
                            <p>
                            {   /* Loop through each category and display it*/
                                this.state.restaurantData.categories.map((element,i) => (
                                    data.categories.length-1 !== i 
                                    ? <span key={"cat"+i+1}>{element.category_name}, </span>
                                    : <span key={"cat"+i+1}>{element.category_name} </span>
                            ))}</p>
                        </Grid>

                        {/* This grid contains the details of ratings and average cost for 2 persons */}
                        <Grid container item xs={12} alignItems="center" className="r-details-container-bottom">
                            <Grid item xs={6} className="r-rating">
                                <div>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <span> {data.customer_rating}</span>
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
                                            <Grid item xs={1} key={"itemType"+j+1}>
                                                {item.item_type === "VEG"
                                                    ? <i className="fa fa-circle veg" aria-hidden="true"></i>
                                                    : <i className="fa fa-circle non-veg" aria-hidden="true"></i>
                                                }
                                            </Grid>
                                            <Grid item xs={8} key={"itemName"+j+1} className="item-name"><span>{item.item_name}</span></Grid>
                                            <Grid item xs={2} key={"itemPrice"+j+1} className="item-price"><i className="fa fa-inr" aria-hidden="true"></i> {item.price.toFixed(2)}</Grid>
                                            <Grid item xs={1} key={"plus"+j+1}><IconButton className="addIcon"><AddIcon/></IconButton></Grid>
                                        </Grid>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;