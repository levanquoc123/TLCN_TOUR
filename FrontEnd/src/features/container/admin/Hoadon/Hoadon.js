import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Popconfirm, Popover, Spin, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hoadonData, removehoadon, updatehoadon } from "./hoadonSlice";
function Hoadon() {
  const columns = [
    {
      title: "Người dùng",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
    },
    {
      title: "Tour",
      dataIndex: "tour",
    },
    {
      title: "Ngày đi",
      dataIndex: "date",
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tien",
    },

    {
      title: "Thanh toán",
      dataIndex: "status",
    },

    {
      title: "Status",
      dataIndex: "huy"
    },

    {
      title: "Thời gian cập nhập",
      dataIndex: "updatedAt"
    }
  ];

  const hoadons = useSelector((state) => state.hoadons.hoadon.data);
  const soluong = (nguoilon, treem, embe) => {
    return nguoilon + treem + embe;
  };
  const loading = useSelector((state) => state.hoadons.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(hoadonData());
  };

  const handleStatus = (e, id) => {
    if (e === 1) {
        dispatch(updatehoadon({ status: 0, idsua: id }))
    } else {
        dispatch(updatehoadon({ status: 1, idsua: id }))
    }
    setTimeout(() => {
        actionResult();
    }, 500);
  }

  const handleHuy = (e,id)=>{
    if (e === 1) {
      dispatch(updatehoadon({ huy: 0, idsua: id }))
  } else {
      dispatch(updatehoadon({ huy: 1, idsua: id }))
  }
  setTimeout(() => {
      actionResult();
  }, 500);
  }

  const hangdleDelete = (e) => {
    dispatch(removehoadon(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const tongtien = (nguoilon, treem, embe, gnl, gte, geb) => {
    return (nguoilon * gnl + treem * gnl * 0.75 + embe * gnl * 0.5).toLocaleString();
  };
  const title = (nguoilon, treem, embe) => {
    return (
      <div>
        <span>Người lớn: {nguoilon}</span>
        <br />
        <span>Trẻ em: {treem}</span>
        <br />
        <span>Em bé: {embe}</span>
      </div>
    );
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Hoá đơn</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={hoadons.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.User.name}</span>,
              sdt: <span>{ok.User.sdt}</span>,
              tour: <span>{ok.Tour.name}</span>,
              date: <span>{ok.ngaydi}</span>,
              soluong: (
                <Tooltip title={title(ok.nguoilon, ok.treem, ok.embe)}>
                  <span>{soluong(ok.nguoilon, ok.treem, ok.embe)}</span>
                </Tooltip>
              ),
              tien: (
                <span>
                  {tongtien(
                    ok.nguoilon,
                    ok.treem,
                    ok.embe,
                    ok.Tour.gianguoilon,
                    ok.Tour.giatreem,
                    ok.Tour.giaembe
                  )}{" "}
                  vnđ
                </span>
              ),
              status: <div className="action">{ ok.status === 1 ? <span onClick={() => { handleStatus(ok.status, ok.id) }}><i className="far fa-thumbs-up text-primary"></i></span> : <span onClick={() => handleStatus(ok.status, ok.id)}><i className="far fa-thumbs-down "></i></span>}</div>,
              huy: (ok.status===0 ? (ok.huy===1? <div className="action"><span onClick={() => { handleHuy(ok.huy, ok.id) }}><i className="text-primary">HỦY TOUR</i></span></div>:<span><i className="text-primary1">TOUR ĐÃ HỦY</i></span>): (ok.huy===1?<div>TOUR CHƯA HỦY</div>:<div>TOUR ĐÃ HỦY</div>)),
              
              //<div className="action">{ok.huy === 1 ? <span onClick={() => { handleStatus(ok.huy, ok.id) }}><i className="text-primary">HỦY TOUR</i></span> : <span><i className="text-primary1">TOUR ĐÃ HỦY</i></span>}</div>,
              updatedAt: <span>{ok.updatedAt}</span>
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default Hoadon;
