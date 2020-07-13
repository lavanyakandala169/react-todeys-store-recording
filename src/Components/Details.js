import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {ButtonContainer} from "./Button"
import { ProductConsumer } from "../Context";

export default class Details extends Component{
    render(){
        return(
            <ProductConsumer>
                {value =>{
                    const {
                        prod_det_item_id,
                        prod_det_brand,
                        prod_det_item_img,
                        prod_det_name,
                        prod_det_item_price,
                        info,
                        inCart
                    } = value.detailProduct;
                    

                    return(
                        <div className="container py-5">
                            <div className="row">
                                {/* title */}
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{prod_det_brand}</h1>
                                </div>
                                {/* end title */}
                            </div>
                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={prod_det_item_img} className="img-fluid" alt="img"/>
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>{prod_det_name}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2"> 
                                    Brand : <span className="text-uppercase">{prod_det_brand}</span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            Price : <span>RS.</span> {prod_det_item_price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-old mt-3 mb-0">some info about product:</p>
                    <p className="text-muted lead">{info}</p>
                                </div>
                            </div>
                            {/* end product info */}
                            {/* Buttons */}
                            <div>
                                <Link to = "/">
                                    <ButtonContainer>
                                        back to product
                                    </ButtonContainer>
                                    </Link>
                                    <ButtonContainer cart
                                    disabled={inCart ? true : false}
                                    onClick={()=>{
                                        value.addToCart(prod_det_item_id);
                                        value.openModal(prod_det_item_id);
                                    }}>
                                        {inCart ? "incart" : "add to cart"}
                                    </ButtonContainer>
                                
                            </div>
                        </div>
                    );
                }}
            </ProductConsumer>
            
            );
            
    };
};