/**
 * 配置开发环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */

let baseUrl = '';
const routerMode = 'hash';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://easy-mock.com/mock/5a7e8e0808a0d3721d1a744f';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '';
}

export {
  baseUrl,
  routerMode,
};
