<div class="app-panel">
    <div class="toolbar">
        <h3>Products</h3>
        <ul>
            <li><a href="">+</a></li>
            <li><a href="">a</a></li>
            <li><a href="">c</a></li>
        </ul>
    </div>

    <div class="container">
        
            
            @{foreach productRow in products} 
                <div class="data-row ${equals(product.id, productRow.id, 'data-row-selected')}" >
                    <div class="dy-fx pl-15 pr-15">
                        <div class="dy-fx minw-70-px fx-jc-cr" style="border:2px solid #dbe1f9; background-color:#fff; height:70px; border-radius:4px; ">
                            <img src="/images/camera.svg" class="wh-40-px" />
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
                    <div class="minw-100-px dy-fx pr-15 fx-jc-fe fs-18">${productRow.price}</div>
                </div>
            @{/foreach}


    </div>
</div>