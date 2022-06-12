<div class="app-panel">
    <div class="toolbar">
        <ul class="actions">
            <li class="mn-5">
                <a href="/catalog/products/create" class="btn-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </a>
            </li>
            <li class="mn-5">
                <a class="btn-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </a>
            </li>
        </ul>
        <div class="dy-fx">
            <form action="/catalog/products" class="dy-fx fx-fx-maxc">
                <input type="text" name="search" />
            </form>
        </div>
    </div>

    <div class="container">
        @{foreach productRow in products} 
            <div class="data-row ${equals(product.id, productRow.id, 'data-row-selected')}" >
                <div class="dy-fx pl-15 pr-15">
                    <div class="dy-fx minw-70-px fx-jc-cr" style="border:2px solid #dbe1f9; background-color:#fff; height:70px; border-radius:4px; ">
                        <img src="/omega/public/images/camera.svg" class="wh-40-px" />
                    </div>
                </div>
                <div class="wh-100-pc pt-15 pb-15 pr-15">
                    <a href="/catalog/products/create?pid=${productRow.id}" class="fs-18 fw-500">${productRow.sku}</a>
                    <div class="fs-13 fc-6 mt-5">${productRow.name}</div>
                    <div class="fx mt-10">
                        <span class="attr-orange">Visible</span>
                        <span class="attr-green">${productRow.quantity}</span>
                    </div>
                </div>
                <div class="minw-100-px dy-fx pr-20 fx-jc-fe fs-16">${productRow.price}</div>
            </div>
        @{/foreach}
    </div>
</div>