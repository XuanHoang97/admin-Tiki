import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { numberFormat, totalMoney } from 'components/Formatting/FormatNumber';
import * as actions from 'store/actions';
import {createOrder} from 'services/clientService';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

const ModalOrderNow = (props) => {
    const saleOff = 240000;
    const [qty, setQty] = useState(1);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [delivery_method, setDelivery] = useState('');
    const [payment_method, setPayment] = useState('');
    const [note, setNote] = useState('');
    const [loadingOrder, setLoadingOrder] = useState(false);
    const history = useHistory()

    const toggle =()=>{
        props.toggle();
    }

    const handleCountDown = (e) => {
        setQty(e)
    }

    const handleCountUp = (e) => {
        setQty(e)
    }

    //order
    const dispatch = useDispatch();
    const delivery = useSelector(state => state.client.delivery);
    const payment = useSelector(state => state.client.payment);
    const carts = useSelector(state => state.client.carts);

    useEffect(() => {
        dispatch(actions.getAllDelivery());
        dispatch(actions.getAllPayment());
    }, [dispatch]);

    // add new category
    const order=async()=>{         
        setLoadingOrder(true);
        const newCart = carts.map(cart => {
            return {
                productId: cart.id,
                qty: cart.qty,
                price: cart.price,
                name: cart.name,
                image: cart.image,
                sale_off: cart.sale_off,
                total: cart.total
            }
        })
        let res = await createOrder({
            arrOrder: newCart, 
            total : totalMoney(carts),
            username: username,
            phone: phone,
            address: address,
            email: email,
            note: note,
            delivery: delivery_method,
            payment: payment_method
        });
        
        console.log('data sp trc khi order: ', carts);

        setLoadingOrder(false);
        if(res.status === 200 && res.data.errCode === 0){
            dispatch(actions.deleteAllItemCart());
            toast.success('Đặt hàng thành công');
            toggle();
            history.push('/my-order');
        }else{
            toast.error('Đặt hàng thất bại');
        } 
    }
    
    return (    
        <Modal 
            isOpen={props.show} 
            toggle={()=>toggle()} 
            size="lg"
        >
            <ModalHeader toggle={()=>toggle()}>Bạn có {carts.length} sản phẩm trong giỏ hàng</ModalHeader>
            <LoadingOverlay active={loadingOrder} spinner text='Đang xử lý, vui lòng đợi trong giây lát .....' >
                <ModalBody>
                <div>
                    <div className="">
                        {
                            carts && carts.length > 0 &&
                            carts.map((item, index) => {
                                return (
                                    <div className="product_info d-flex border-bottom py-2" key={index}>
                                        <div className="product_image d-flex col-6">
                                            <img src={item.image} style={{width: '10%'}} alt="" />
                                            <h6 className='font-weight-bold ml-3'>{item.name}</h6>
                                        </div>

                                        <div className="product_price col-3 d-flex">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <button onClick={(e) => (item.qty > 1 && --item.qty, handleCountDown(item.qty))} className="btn btn-light btn-sm px-2" style={{height: '27px'}}>
                                                        <i className="fas fa-minus small" style={{fontSize: '10px'}} />
                                                    </button>
                                                </div>

                                                <input type="text" className="form-control text-center" style={{ height: '27px', border: '1px solid #ebebeb' }}
                                                    value={item.qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                />

                                                <div className="input-group-append">
                                                    <button onClick={(e) => (++item.qty, handleCountUp(item.qty))}  className="btn btn-light btn-sm px-2" style={{height: '27px'}}>
                                                        <i className="fas fa-plus small" style={{fontSize: '10px'}} />
                                                    </button>
                                                </div>
                                            </div>   

                                            <span className='text-danger small ml-4' style={{cursor: 'pointer'}} title='xoá sản phẩm khỏi giỏ hàng' >
                                                <i className="fas fa-trash-alt"></i>    
                                            </span>    
                                        </div>

                                        <div className='col-3 text-right'>
                                            <div className='text-danger'>{numberFormat(item.price)}</div>
                                            <del className='text-secondary small'>{item.sale}</del>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className="totalPay bg-light py-2 d-flex border-bottom">
                            <div className="form-group col-6">
                                <label>Mã giảm giá</label>
                                <div className='d-flex'>
                                    <input type="text" readOnly className="form-control col-9" placeholder='voucher...' style={{ height: '31px' }} />
                                    <button type="button" className="btn btn-primary col-3 px-2">Áp dụng</button>
                                </div>
                            </div>
                            
                            <div className='col-6'>
                                <div className='d-flex justify-content-between'>
                                    <span>Tổng tiền:</span>
                                    <span>{numberFormat(totalMoney(carts))}</span>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <span>Giảm:</span>
                                    <small className="text-secondary">-{numberFormat(saleOff)}</small>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <span>Cần thanh toán:</span>
                                    <span className="text-danger font-weight-bold">
                                        {numberFormat(totalMoney(carts) - saleOff)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order_info mt-3">
                        <div className="gender d-flex px-3">
                            <div className="radio mr-4">
                                <label><input type="radio" name="gender" readOnly checked />Anh</label>
                            </div>
                            <div className="radio">
                                <label><input type="radio" name="gender" readOnly />Chị</label>
                            </div>
                        </div>

                        <div className='info d-flex'>
                            <form className="form-group col-6">
                                <input type="text" className="form-control" placeholder="Nhập họ tên..." 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input type="text" className="form-control my-2" placeholder="Nhập số điện thoại..." 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <input type="text" className="form-control my-2" placeholder="Nhập chính xác email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
          
                                <input type="text" className="form-control mt-2" placeholder="Nhập địa chỉ..." 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </form>

                            <div className="form-group col-6">
                                <label className='font-weight-bold'>Hình thức nhận hàng</label>
                                <div className="delivery d-flex mb-3">
                                    {
                                        delivery && delivery.length >0 &&
                                        delivery.map((item, index) => {
                                            return (
                                                <div className="radio mr-4" key={index}>
                                                    <label>
                                                        <input type="radio" name="delivery" 
                                                            value={item.valueVi}
                                                            onChange={(e) => setDelivery(e.target.value)}
                                                        />
                                                        <span>{item.valueVi}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <label className='font-weight-bold'>Hình thức thanh toán</label>
                                <div className="payment d-flex">
                                    {
                                        payment && payment.length >0 &&
                                        payment.map((item, index) => {
                                            return (
                                                <div className="radio mr-4" key={index}>
                                                    <label>
                                                        <input type="radio" name="payment"
                                                            value={item.valueVi}
                                                            onChange={(e) => setPayment(e.target.value)}
                                                        />
                                                        <span>{item.valueVi}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <input type="text" className="form-control" placeholder="Ghi chú..." 
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                </ModalBody>

                <ModalFooter>
                    <Button color="success" className="px-4 font-weight-normal" onClick={()=>order()}>
                        HOÀN TẤT ĐẶT HÀNG
                    </Button>

                    <Button color="secondary" className="px-4 font-weight-normal">HUỶ ĐƠN</Button>
                </ModalFooter>
            </LoadingOverlay>
        </Modal>
    )
}
export default ModalOrderNow;
