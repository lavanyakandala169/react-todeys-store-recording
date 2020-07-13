import React, { Component } from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProductConsumer } from "../Context";

export default class Product extends Component{
    render(){
        const {prod_det_item_id, prod_det_name, prod_det_item_img, inCart, prod_det_item_price} 
        = this.props.products;
        return(
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {(value) => (
                            <div className="img-container p-5" 
                            onClick={() =>
                                value.handleDetail(prod_det_item_id)
                            }>
                            <Link to = "/details">
                                <img src= {prod_det_item_img} alt="pro_item" className="card-img-top"/>
                            </Link>
                            <button 
                            className="cart-btn" 
                            disabled={inCart ? true : false} 
                            onClick={() => {
                                value.addToCart(prod_det_item_id);
                                value.openModal(prod_det_item_id);
                                }}
                                >
                                {inCart ? (
                                    <i className="fas fa-cart-plus"/>
                            
                            ) : (
                                
                                <p className="text-capitalize mb-0" disabled> {" "} in Cart</p>

       
                                )}
    
                                </button>
                    </div>
                        )}
                        
                </ProductConsumer>
                {/* cardfooter */}
                <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0 text-blue">{prod_det_name}</p>
                        <h6 className="text-blue font-italic mb-0">
                            <span className="mr-1">RS.</span>
                            {prod_det_item_price}
                        </h6>
                </div>
                </div>
                </ProductWrapper>
        );
    }
}
Product.propTypes={
    product:PropTypes.shape({
        prod_det_item_id: PropTypes.number,
        prod_det_item_img: PropTypes.string,
        prod_det_name: PropTypes.string,
        prod_det_item_price: PropTypes.number, 
        inCart: PropTypes.bool
     }).isRequired
}
const ProductWrapper = styled.div`
.card{
    border-color:transparent;
    transition:all 1s linear;
    }
    .card-footer{
        background:transparent;
        border-top:transperant;
        transition:all 1s linear;
    }
    &:hover{
        .card{
            border:0.04 solid rgba(0,0,0,0.2);
            box-shadow:2px 2px 5px 0px rgba(0, 0, 0, 0.2);
        }
        .card-footer{
            background: rgba(247, 247, 247);
        }
    }
    .img-container{
        position:relative;
        overflow:hidden;
    }
    .card-img-top:{
        transition:all 1s linear;

    }
    .img-container:hover .card-img-top{
        transform:scale(1.2);
    }
    .cart-btn{
        position: absolute;
        bottom:0;
        right:0;
        padding:  0.2rem, 0.4rem;
        background: var(--lightBlue);
        border:none;
        color: var(--mainWhite);
        font-size:1.4rem;
        border-radius:0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition:all 1s linear;
        }
    .img-container:hover .cart-btn{
        transform: translate(0, 0);
    }
    .cart-btn:hover{
        color: var(--mainBlue);
        cursor:pointer;
    }
    
`;