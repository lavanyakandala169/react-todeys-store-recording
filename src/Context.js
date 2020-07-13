import React, { Component } from "react";
import {StoreProducts, detailProduct} from './Data';
import Cart from "../src/Components/Cart/Cart";


const ProductContext = React.createContext();
//Provider
//consumer
class ProductProvider extends Component{
    state = {
        products: [], 
        detailProduct: detailProduct,
        cart: StoreProducts,
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        count:0,
        total:0
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        StoreProducts.forEach(item=>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem]
        });
        this.setState(()=>{
            return{products:tempProducts}
        })
            
    };
    getItem = (prod_det_item_id) => {
        const product = this.state.products.find(item => item.prod_det_item_id === prod_det_item_id);
        return product;
    }
    handleDetail = (prod_det_item_id) => {
        const product = this.getItem(prod_det_item_id);
        this.setState(() => {
            return{detailProduct:product}
        })
    };
    addToCart = prod_det_item_id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(prod_det_item_id))
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const prod_det_item_price = product.prod_det_item_price;
        product.total = prod_det_item_price;
        this.setState(()=>{
            return {products:tempProducts,cart:[...this.state.cart,product]};
        },()=>{
            console.log(this.state)
        });
    };
    openModal = prod_det_item_id => {
        const product = this.getItem(prod_det_item_id);
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true}
        })
    }
    closeModal = () => {
        this.setState(() => {
            return {modalOpen:false}
        });
    };
    increment = (prod_det_item_id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=> item.prod_det_item_id === prod_det_item_id)

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.prod_det_item_price;

        this.setState(
            () => {
                return { Cart: [...tempCart] }; 
            },
                 ()=>{
                     this.addTotals();
                }
        );
            

    };
    decrement = (prod_det_item_id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=> item.prod_det_item_id === prod_det_item_id)

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count= product.count - 1;

        if(product.count === 0){
            this.removeItem(prod_det_item_id)
        }
        else{
            product.total = product.count * product.prod_det_item_price;
            this.setState(
                ()=>{
                    return { cart: [...tempCart] };

                },
                ()=> {
                    this.addTotals();
                }
            )
        }

    };
    removeItem = (prod_det_item_id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.prod_det_item_id !== prod_det_item_id);
        const index = tempProducts.indexOf(this.getItem(prod_det_item_id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(()=>{
            return{
                cart:[...tempCart],
                Products:[...tempProducts]
            }
        }, ()=>{
            this.addTotals();
        })
        };
        clearCart = () => {
            this.setState(()=>{
                return {cart: [] };
            },()=>{
                this.setProducts();
                this.addTotals();
            })
        };
        addTotals = () =>{ 
            let subTotal = 0;
            this.state.cart.map(item => (subTotal += item.total));
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = subTotal + tax;
            this.setState(() => {
                return{
                    cartSubTotal:subTotal,
                    cartTax:tax,
                    cartTotal:total
                }
            }) 
        } 

    render(){
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart

            }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };