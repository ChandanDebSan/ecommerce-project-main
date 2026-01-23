import {renderOrderPage} from '../scripts/order.js'
import { getProduct, Product, loadProducts, loadProductsEach } from '../data/products.js'

await loadProductsEach();
renderOrderPage();