import React, {Component} from 'react'; 
import './Home.css'; 
import Header from '../../common/header/Header'; 

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css';

class Home extends Component{

  constructor(){
    super(); 
    this.state={
      listOfAllRestaurants: [], 
      listOfRestaurantsBySearch: [],
      searchRestaurant:"" 
    }
  }

  componentWillMount(){
        let data = null; 
        let  xhr = new XMLHttpRequest(); 
        let that = this; 

        xhr.addEventListener("readystatechange", function(){
          if(this.readyState === 4){
            that.setState({listOfAllRestaurants: JSON.parse(this.responseText).restaurants}); 
          }
        }); 
        
        xhr.open("GET", this.props.baseUrl+"restaurant"); 
        xhr.setRequestHeader("Cache-Control", "no-cache"); 
        xhr.send(data); 
  }

  searchRestaurantByName = (resName) =>{
    console.log("search word = " + resName); 
    this.setState({searchRestaurant: resName}); 

    if(resName !== "" && resName!== " "){
            let data = null; 
            let xhr = new XMLHttpRequest(); 
            let that = this; 
            let getUrl = this.props.baseUrl+"restaurant/name/"+resName ; 
            console.log("getUrl = "+ getUrl); 

            xhr.addEventListener("readystatechange", function(){
              if(this.readyState === 4){
                that.setState({listOfRestaurantsBySearch: JSON.parse(this.responseText).restaurants}); 
              }
            }); 
            
            xhr.open("GET", getUrl); 
            xhr.setRequestHeader("Cache-Control", "no-cache"); 
            xhr.send(data); 
       }
  }

  restaurantClickHandler = (restaurantId) =>{
    this.props.history.push('/restaurant/'+restaurantId); 
  }
  
    render(){

        let restaurants = []; 
        if(this.state.searchRestaurant === ""){
          restaurants = this.state.listOfAllRestaurants; 
        }else{
          restaurants = this.state.listOfRestaurantsBySearch 
        }

        return (  
            <div> 
                <div className="home-hdr">
                <Header searchRestaurantByName={this.searchRestaurantByName} baseUrl={this.props.baseUrl} page="HomePage"/>
                </div>
                <div className="home-body">{
                  (restaurants !==null ) 
                  ?
                  <div className="grid-root">   
                    <GridList cellHeight={500} cols={4} spacing={50} className="grid-list">
                      {
                        restaurants.map(res=>(
                           <GridListTile key={res.id}>
                             <Card className="card-root" onClick={()=> this.restaurantClickHandler(res.id)}>
                              <img id= {res.id} src={res.photo_URL} alt={res.restaurant_name} className="restaurant-image"/>
                              <CardContent className="card-content">
                              <div className="home-rest-name">
                                <Typography variant="h4" color="textPrimary" component="h5">
                                      {res.restaurant_name}
                                </Typography>
                              </div>
                              <div className="home-rest-categories">
                              <Typography variant="body1" color="textPrimary" component="p">
                                    {res.categories}
                              </Typography>
                              </div>
                              <div className="rating-and-price"> 
                                    <div className="rating"> 
                                      <i className="fa fa-star" aria-hidden="true"></i>
                                      {" "}  {res.customer_rating} ({res.number_customers_rated})
                                    </div>
                                    <p><i className="fa fa-inr" aria-hidden="true"></i>{res.average_price} for two </p>
                              </div>                               
                              </CardContent>  
                             </Card>  
                            
                           </GridListTile> 
                         )) 
                      }
                    </GridList> 
                  </div> 
                  :
                      <div> <span> No restaurant with the given name. </span></div>
                 }
                </div>
            </div>
        ) 
    }
}

export default Home; 