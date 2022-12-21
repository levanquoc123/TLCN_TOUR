import React from 'react'
import "./lichsu.css"
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { hoadonData, updatehoadon } from "./hoadon";

export default function Lichsu() {
    const infor = useSelector(state => state.infor.infor.data)
    const hoadons = useSelector(state => state.hoadons.hoadon.data)
    const dispatch = useDispatch();
    let thongtin = []
    const actionResult = async () => {
        await dispatch(hoadonData());
      };
    const handleStatus = (e, id) => {
        if (e === 1) {
            dispatch(updatehoadon({ huy: 0, idsua: id }))
        setTimeout(() => {
            actionResult();
        }, 500);
    }}
    if (hoadons && infor) {
        for (let i = 0; i < hoadons.length; i++) {
            if (hoadons[i].userId === infor.id) {
                thongtin.push(hoadons[i])
            }
        }
    }
    return (
        <div className="history">
            <div className="history__header">
                <h3 className='text-center'>Lịch sử đặt tour</h3>
                <div className="hr"></div>
            </div>
            <div className="history__content">
                {thongtin.length === 0 ? <div className="spin"><Spin className="mt-5" /></div> :
                    thongtin.map((ok, index) => (
                            <div className="history__box" key={index}>
                                                        <Link to={`/tour/${ok.tourId}`}>

                                <img src={ok.Tour.avatar} alt="" />
                                </Link>  

                                <div className="history__tour">
                                <Link to={`/tour/${ok.tourId}`}>
                                    <div className="history--title">
                                        <div className="history--name">{ok.Tour.name}</div>
                                    </div>
                                    </Link>  
                                    <div className="history--infor">
                                        <table>
                                            <tr>
                                                <th>Ngày khởi hành &emsp;&emsp;</th>
                                                <th>{ok.ngaydi}</th>
                                            </tr>
                                            <tr>
                                                <th>Thời gian</th>
                                                <th>{ok.Tour.thoigian} Ngày</th>
                                            </tr>
                                            <tr>
                                                <th>Nơi khởi hành</th>
                                                <th>Tp.HCM</th>
                                            </tr>
                                        </table>
                                        <table className="nmn">
                                            <tr>
                                                <th>Số người lớn &emsp;&emsp;</th>
                                                <th>{ok.nguoilon}</th>
                                            </tr>
                                            <tr>
                                                <th>Số trẻ em</th>
                                                <th>{ok.treem}</th>
                                            </tr>
                                            <tr>
                                                <th>Số em bé</th>
                                                <th>{ok.embe}</th>
                                            </tr>
                                            <tr>
                                                <th>Tổng tiền</th>
                                                <th>{(ok.thanhtien).toLocaleString()} vnđ</th>
                                            </tr>
                                        </table>
                                        <table>
                                        <div>{ok.status===1?<span className="text-primary">Đã thanh toán</span>:<span className="text-primary1">Chưa thanh toán</span>} </div>  
                                        {ok.status===1?(ok.huy===1?(<div className='action'><span onClick={() => { handleStatus(ok.huy, ok.id) }}> <i className="text-primary">HỦY TOUR</i></span></div>):<span><i className="text-primary1">TOUR ĐÃ HỦY</i></span>):<div></div>}
                                        </table>
                                    </div>                                   
                                </div>
                            </div>
                    ))
                }
                
            </div>
        </div>
    )
}
