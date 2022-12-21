import { red } from '@material-ui/core/colors';
import React from 'react'
import { useSelector } from 'react-redux';
import './Chitietgia.css'
function Chitietgia(props) {
    const tours = useSelector(state => state.tours.tour.data);
    const tour = [];
    if (tours) {
        for (let i = 0; i < tours.length; i++) {
            if (tours[i].id === +props.id) {
                tour.push(tours[i])
            }
        }
    }
    const tinhkhuyenmai = (money, km) => {
        return ((money) - ((money) * (km / 100)))
    }
    const checkKhuyenmai = () => {
        if (tour[0].Khuyenmais.length === 0) {
            return tour[0].gianguoilon;
        } else {
            if (tour[0].Khuyenmais[0].status === 0) {
                return tour[0].gianguoilon;
            } else {
                return tinhkhuyenmai(tour[0].gianguoilon, tour[0].Khuyenmais[0].khuyenmai);
            }
        }
    }
    
    return (
        <div>
            <div className="heading-nx">
                <h3>Chi tiết giá</h3>
            </div>
            <div className="container">
                <div className="Chitietgia">
                    {tour.map(ok => (
                        <div key={ok.id}>
                            <p>
                                - Giá tiền người lớn: {checkKhuyenmai().toLocaleString()} vnd
                            </p>
                            <p>
                                - Giá tiền trẻ em: {(ok.gianguoilon*0.75).toLocaleString()} vnd
                            </p>
                            <p>
                                - Giá tiền em bé: {(ok.gianguoilon*0.1).toLocaleString()} vnd
                            </p>
                        </div>
                    ))}
                    <span className="text-primary1" style={{fontsize: 10}} >
                    Quý khách vui lòng thanh toán hoàn tất trước 10 ngày khởi hành.
                    <br/>Thanh toán bằng tiền mặt hoặc chuyển khoản tới tài khoản ngân hàng của Vietravel.
                    <br/>Tên Tài Khoản : Công ty CP Du lịch HQTravel
                    <br/>Tên tài khoản viết tắt : HQTravel
                    <br/>Số Tài khoản : 007 100 115 1480
                    <br/>Ngân hàng : Vietcombank – CN Tp.HCM
                    <br/>Việc thanh toán được xem là hoàn tất khi HQTravel nhận được đủ tiền vé du lịch trước lúc khởi hành. Bất kỳ mọi sự thanh toán chậm trễ dẫn đến việc hủy dịch vụ không thuộc trách nhiệm của HQTravel.
                    </span>
                </div>
            </div>
        </div>
    )
}

Chitietgia.propTypes = {

}

export default Chitietgia
