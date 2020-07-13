import React from 'react'

export default function CartItem(item, value){
    const{prod_det_item_id,prod_det_name,prod_det_item_img,prod_det_item_price,total,count} = item;
    const{increment, decrement,removeItem} = value;
    return(
        <div className="row my-2 text-center text-capitalize">
            <div className="col-10 mx-auto col-lg-2">
                <img src={prod_det_item_img}  style={{width:'5rem', height:'5rem'}} className="img-fluid"  alt="product"/>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">product: </span>{prod_det_name}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">price: </span>{prod_det_item_price}
                </div>
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <div>
                    <span className="btn btn-black mx-1" onClick={() => decrement(prod_det_item_id)}>-</span>
                    <span className="btn btn-black mx-1">{count}</span>
                    <span className="btn btn-black mx-1" onClick={() => increment(prod_det_item_id)}>+</span>
                    </div>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <div className="cart-icon" onClick={()=>removeItem(prod_det_item_id)}>
                            <i className="fas fa-trash"/>

                        </div>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <strong>item total : Rs.{total}</strong>
                    </div>

                </div>
        </div>
    )
}