import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import ModalProduct from './ModalProduct';
import ModalEditProduct from './ModalEditProduct';
import { numberFormat } from '../../../components/Formatting/FormatNumber';
import Sort from './Sort';
import './style.scss';

const ProductManage = (props) => {
    const [modalProduct, setModalProduct] = useState(false);
    const [modalEditProduct, setModalEditProduct] = useState(false);
    const [productEdit, setProductEdit] = useState('');

    //fetch product
    const dispatch = useDispatch();
    const listProducts = useSelector(state => state.admin.products);
    useEffect(() => {
        dispatch(actions.fetchProducts());
    }, [dispatch]);

    //create product
    const handleAddNewProduct = () => {
        setModalProduct(!modalProduct);
    }
    const CreateNewProduct=(data)=> {
        const dataProduct = new FormData();
        dataProduct.append('name', data.name);
        dataProduct.append('price', data.price);
        dataProduct.append('sale', data.sale);
        dataProduct.append('category_id', data.category_id);
        dataProduct.append('supplier_id', data.supplier_id);
        data.image && dataProduct.append('image', data.image);
        dispatch(actions.CreateNewProduct(dataProduct));
    }

    //delete product
    const deleteProduct = (product) => {
        dispatch(actions.DeleteProduct(product.id));
    }

    //edit product
    const editProduct = (product) => {
        setModalEditProduct(!modalEditProduct);
        setProductEdit(product);
    }
    const handleEditProduct = (data) => {
        const product = new FormData();
        product.append('id', productEdit.id);
        product.append('name', data.name);
        product.append('price', data.price);
        product.append('sale', data.sale);
        product.append('category_id', data.category_id);
        product.append('supplier_id', data.supplier_id);
        data.image && product.append('image', data.image);
        dispatch(actions.EditProduct(product));
    }

    return (        
        <div className="productManage">
            <ModalProduct
                isOpen={modalProduct}
                toggleParent={handleAddNewProduct}
                createProduct={CreateNewProduct}
            />

            <ModalEditProduct  
                isOpen={modalEditProduct}
                toggleParent={editProduct}
                currentProduct={productEdit}
                editProduct={handleEditProduct}
            />

            <div className='addProduct'>
                <div className='product-head'>
                    <img src="https://icon-library.com/images/icon-product/icon-product-18.jpg" style={{width: '5%'}} alt=""/>
                    <div className="productTitle">Sản phẩm (<small>{listProducts.length}</small>)</div>
                </div>

                <div className="action">
                    <button onClick={() => handleAddNewProduct()} type="button" className="btn btn-success">
                        <i className="fas fa-plus"></i> Thêm sản phẩm
                    </button>
                </div>
            </div>
                    <Sort />

            <table className="table table-striped table-bordered table-hover">
                <thead className="text-white">
                    <tr>
                        <td>STT</td>
                        <td>Ảnh</td>
                        <td>Tên SP</td>
                        <td>Bán được</td>
                        <td>Số lượng</td>
                        <td>Trạng thái</td>
                        <td>Giá (VND)</td>
                        <td>Sale (VND)</td>
                        <td>Tác vụ</td>
                    </tr>
                </thead>
                <tbody>
                    {   
                        listProducts?.length>0 ?
                        listProducts.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{width:'5%'}}><img src={item.image} className="w-100"  alt="" /> </td>
                                    <td className='text-primary'>{item.name}</td>
                                    <td>0</td>
                                    <td>50</td>
                                    <td><span className='badge badge-success'>Còn hàng</span></td>
                                    <td>{numberFormat(item.price)}</td>
                                    <td>{numberFormat(item.sale)}</td>
                                    <td>
                                        <button onClick={()=> editProduct(item)} type="button" className="btn text-primary">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={()=> deleteProduct(item)} type="button" className="btn text-danger">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        : 
                        <tr>
                            <td colSpan="10" className="text-center text-danger">Không có sản phẩm nào</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
export default ProductManage;
