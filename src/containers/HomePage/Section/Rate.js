import React from 'react';
import { path } from 'utils';

function Rate(props) {
    return (
        <div className='d-flex mb-2'>
            <div className="vote" style={{fontSize:'9px'}}>
                <span className="fa fa-star checked text-warning" />
                <span className="fa fa-star checked text-warning" />
                <span className="fa fa-star checked text-warning" />
                <span className="fa fa-star text-warning" />
                <span className="fa fa-star text-secondary" />
            </div>
            <span className="text-muted ml-2" style={{fontSize: '11px'}}>Đã bán 111</span>
        </div>
    );
}

export default Rate;