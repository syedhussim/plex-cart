${ await include('catalog/products_list'); }

<div class="dy-fx fx-fd-cn wh-100-pc fx-fx-maxc">
    <div class="dy-fx fx-fd-cn wh-100-pc pt-25 pb-25">

        <div class="pt-10 pb-10 mb-30 bb-cr-1-2px">
            <h3>Products</h3>
        </div>

        @{if selectedProduct.id}
            <div>${selectedProduct.name}</div>
            <div>${selectedProduct.description}</div>
        @{/if}
    </div>
</div>