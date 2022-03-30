import { formatDate , formatDateNew} from 'components/Formatting/FormatDate';
import {averageStarRating} from 'components/Formatting/FormatNumber';
import ReactStars from 'react-stars';
import React from 'react';

const Rating = (props) => {
    const {detailProduct} = props;
    const avatar = 'http://res.cloudinary.com/do7qmg6jr/image/upload/v1645518444/sbgr7wd9k1t9v8f0cwvm.jpg';

    return (
        <div className='vote'>
            <h5>Đánh giá - Nhận xét từ khách hàng </h5>
            <div className='star-overview'>
                <div className='star col-md-3'>
                    <div className='numbStar'>
                        <span className='text-primary mr-2' style={{fontSize: '27px'}}>
                            {
                                detailProduct.ratingData?.length > 0 ?
                                averageStarRating(detailProduct.ratingData) : 0
                            }
                        </span>
                        
                        <>
                            <ReactStars
                                count={5}
                                value={
                                    detailProduct.ratingData?.length > 0 ?
                                    parseInt(averageStarRating(detailProduct.ratingData)) : 0
                                }
                                edit={false}
                                size={24}
                                color2={'#ffd700'}
                            />
                            <div className='small'>{detailProduct?.ratingData ? detailProduct.ratingData.length : 0} nhận xét</div>
                        </>
                    </div>
                </div>

                <div className='filter-vote col-md-9'>
                    <label>Lọc xem theo: </label>
                    <span>Mới nhất</span>
                    <span>Có hình ảnh</span>
                    <span>Đã mua hàng</span>

                    <div>5<span className="fa fa-star"></span></div>
                    <div>4<span className="fa fa-star"></span></div>
                    <div>3<span className="fa fa-star"></span></div>
                    <div>2<span className="fa fa-star"></span></div>
                    <div>1<span className="fa fa-star"></span></div>
                </div>
            </div>

            {
                detailProduct?.ratingData &&
                detailProduct.ratingData.map((item, index) => {
                    return (
                        <div className='list-vote' key={index}>
                            <div className='customer col-md-3'>
                                <img src={item.avatar? item.avatar : avatar} alt="" />
                                <div>
                                    <div className='font-weight-bold'>{item.username}</div>
                                    <span className='text-secondary small mr-1'>Tham gia từ</span>
                                    <small>{formatDateNew(item.joinDate) }</small>
                                </div>
                            </div>

                            <div className='list-vote-customer col-md-9'>
                                <div className='title d-flex'>
                                    {item.rating === 5 &&
                                    <div className='star'>
                                        <ReactStars
                                            count={5} value={5} edit={false} size={20} color2={'#ffd700'}
                                        />
                                        <b>Cực kỳ hài lòng</b>
                                    </div>}

                                    {item.rating === 4 &&
                                    <div className='star'>
                                        <ReactStars
                                            count={5} value={4} edit={false} size={20} color2={'#ffd700'}
                                        />
                                        <b>Hài lòng</b>
                                    </div>}

                                    {item.rating === 3 &&
                                    <div className='star'>
                                        <ReactStars
                                            count={5} value={3} edit={false} size={20} color2={'#ffd700'}
                                        />
                                        <b>Bình thường</b>
                                    </div>}

                                    {item.rating === 2 &&
                                    <div className='star'>
                                        <ReactStars
                                            count={5} value={2} edit={false} size={20} color2={'#ffd700'}
                                        />
                                        <b>Không hài lòng</b>
                                    </div>}

                                    {item.rating === 1 &&
                                    <div className='star'>
                                        <ReactStars
                                            count={5} value={1} edit={false} size={20} color2={'#ffd700'}
                                        />
                                        <b>Rất tệ</b>
                                    </div>}
                                </div>
                                <span className='small text-success'>
                                    <i className="fa fa-check-circle mr-2" aria-hidden="true"></i>
                                    Đã mua hàng
                                </span>
                                <div className='my-2'>
                                    <div className='d-flex'>
                                        <span>{item.comment}</span>
                                    </div>
                                    <span className='small text-secondary'>{formatDate(item.date)}</span>
                                </div>

                                <div className='reply'>
                                    <button type="button" className="btn btn-outline-primary font-weight-normal">Hữu ích</button>
                                    <span>Bình luận</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            {
                detailProduct?.ratingData?.length === 0 &&
                <div className='text-center my-2'>Chưa có nhận xét nào</div>
            }
        </div>
    );
}
export default Rating;