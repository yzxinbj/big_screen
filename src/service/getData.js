import fetch from '@/common/fetch';

// 获取司机弹框数据
export const getDriver = () => fetch('/api/v1/bigscreen/get_driver');
// 获取订单数据
export const getOrder = () => fetch('/api/v1/bigscreen/get_order');
