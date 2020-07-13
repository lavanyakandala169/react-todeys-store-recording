import React, { Component } from "react";
import styled from 'styled-components';
import {ProductConsumer} from '../Context';
import {ButtonContainer} from '../Components/Button';
import {Link} from 'react-router-dom';

export default class Modal extends Component{
    render(){
        return(
            <ProductConsumer>
                {value => {
                    const {modalOpen,closeModal} = value;
                    const{prod_det_item_img,prod_det_name,prod_det_item_price} = value.modalProduct;

                    if(!modalOpen){
                        return null;
                    }
                    else{
                        return(
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                        <h5>item added to the cart</h5>
                                        <img src={prod_det_item_img} className="img-fluid" alt="product"/>
                        <h5>{prod_det_name}</h5>
                        <h5 className="text-muted">Price : RS. {prod_det_item_price}</h5>
                        <Link to ="/">
                            <ButtonContainer onClick={() => closeModal()}>
                                store
                            </ButtonContainer>
                        </Link>
                        <Link to ="/cart">
                            <ButtonContainer onClick={() => closeModal()}>
                                go to cart
                            </ButtonContainer>
                        </Link>

                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                        );
                    }
                }}
            </ProductConsumer>
            
            );
    }
}
const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
#modal{
    background: var(--mainWhite);
}
`