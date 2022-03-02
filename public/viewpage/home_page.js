import { MENU, root } from "./elements.js";
import { ROUTE_PATHNAMES } from "../controller/route.js";
import * as Util from './util.js'
import { getProductList } from "../controller/firestore_controller.js";
import { DEV } from "../model/constants.js";
import { currentUser } from "../controller/firebase_auth.js";

export function addEventListeners() {
    MENU.Home.addEventListener('click', async () => {
        history.pushState(null, null, ROUTE_PATHNAMES.HOME);
        const label = Util.disableButton(MENU.Home);
        await home_page();
        Util.enableButton(MENU.Home, label);
    });
}
export async function home_page() {
    let html = '<h1>Enjoy Shopping!</h1>'
    let products;
    try {
        products = await getProductList();
    } catch (e) {
        if (DEV) console.log(e);
        Util.info('Failed to get the product list', JSON.stringify(e));
    }
    for (let i = 0; i < products.length; i++) {
        html += buildProductView(products[i], i);
    }
    root.innerHTML = html;

}
function buildProductView(product, index) {
    return `
    <div class="card" style="width: 18rem; display: inline-block;">
        <img src="${product.imageURL}" class="card-img-top">
        <div class="card-body">
             <h5 class="card-title">${product.name}</h5>
             <p class="card-text">
                ${Util.currency(product.price)}<br>
                ${product.summary}
             </p>
        <div class="container pt-3 bg-light ${currentUser ? 'd-block' : 'd-none'}">
            <form method="post" class="form-product-qty">
                <input type="hidden" name="index" value="${index}">
                <button class="btn btn-outline-danger" type="submit"
                    onclick="this.form.submitter='DEC'">&minus;</button>
                <div class="container rounded text-center text-white bg-primary d-inline-block w-50">
                    ${product.qty == null || product.qty == 0 ? 'Add' : product.qty}
                </div>
                <button class="btn btn-outline-danger" type="submit"
                    onclick="this.form.submitter='INC'">&plus;</button>
            </form>
        </div>
  </div>
</div>
    `;
}