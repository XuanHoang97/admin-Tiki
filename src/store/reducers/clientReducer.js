import actionTypes from '../actions/actionTypes';
import { toast } from "react-toastify";

let dataLocalStorage = JSON.parse(localStorage.getItem('dataCart')) || []
const initialState = {
    // Option 1: Order without login
    carts: dataLocalStorage,
    qty: 1,
    delivery: [],
    payment: [],
    orders: [],
    statusOrder: [],
    filterOrder: [],

    // Option 2: Order with login
    cartsUser: 0,
    listOrder: [],
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        //QUANTITY
        case actionTypes.COUNT:
            return {
                ...state,
                qty: action.payload
            }

        case actionTypes.INCREMENT_QUANTITY:
            return {
                ...state,
                qty: state.qty + 1
            }

        case actionTypes.DECREMENT_QUANTITY:
            return {
                ...state,
                qty: state.qty - 1
            }
 
        // Option 1: Order without login
        //add to cart
        case actionTypes.ADD_TO_CART:
            localStorage.setItem('dataCart', JSON.stringify([...state.carts, action.payload]));
            const { id, qty } = action.payload
            let { carts } = state;
            const index1 = carts.findIndex(item => item.id === id);
            let newArr
            if (index1 !== -1) {
                carts.map(item => {
                    if (item.id === id) {
                        newArr = [...carts.slice(0, index1), {
                            ...item,
                            qty: qty + item.qty
                        }, ...carts.slice(index1 + 1)]
                        return 0;
                    } else {
                        return 0;
                    }
                })
                carts = [...newArr]
            } else {
                carts.push(action.payload)
            }
            toast.success('Sản phẩm đã được thêm vào giỏ hàng');

            return {
                ...state,
                carts: [...carts]
            }

        case actionTypes.DELETE_ITEM_CART:
            const index = state.carts.findIndex(item => item.id === action.payload)
            state.carts.splice(index, 1)
            localStorage.setItem('dataCart', JSON.stringify(state.carts))
            return {
                ...state,
                carts: [...state.carts]
            }

        //delete all item cart
        case actionTypes.DELETE_ALL_ITEM_CART:
            // localStorage.removeItem('dataCart')
            localStorage.clear()
            return {
                ...state,
                carts: []
            }

            //get all delivery
        case actionTypes.FETCH_ALL_DELIVERY_SUCCESS:
            return {
                ...state,
                delivery: action.dataDelivery
            }

        case actionTypes.FETCH_ALL_DELIVERY_FAILED:
            return {
                ...state,
                delivery: []
            }

            //get all payment
        case actionTypes.FETCH_ALL_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: action.dataPayment
            }

        case actionTypes.FETCH_ALL_PAYMENT_FAILED:
            return {
                ...state,
                payment: []
            }

        //get all order
        case actionTypes.FETCH_ALL_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }

        // get status order
        case actionTypes.FETCH_STATUS_ORDER_SUCCESS:
        return {
            ...state,
            statusOrder: action.payload
        }
    
        // Filter order by status
        case actionTypes.FILTER_ORDER_BY_STATUS_SUCCESS:
            return {
                ...state,
                filterOrder: action.payload,
            }

        // ----------------------------------------------------
        // Option 2: Order with login
        // Get cart by user
        case actionTypes.GET_CART_BY_USER:
            return {
                ...state,
                cartsUser: action.payload
            }

        // Get all order by user
        case actionTypes.GET_ORDER_BY_USER:
            return {
                ...state,
                listOrder: action.payload
            }

        default:
            return state;
    }
}

export default clientReducer;