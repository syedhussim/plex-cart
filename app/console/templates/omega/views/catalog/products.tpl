{{ await include('catalog/products_list') }}

<div class="{{ products.empty() ? 'app-container-full' : 'app-container' }} fx-jc-cr fx-ai-cr">
    <div class="dy-fx fx-fd-cn fx-ai-cr">
        <h1>Catalog</h1>
        <p class="fs-18">You don't have any products in your catalog yet.</p>
        <div class="dy-fx fx-ai-cr fx-jc-sb wh-100-pc">
            <div>
                <a href="/catalog/products/create" class="btn-commit maxw-200-px">Add Product</a>
            </div>
            <div>
                <a href="/catalog/collections" class="btn-commit maxw-200-px">Collections</a>
            </div>
            <div>
                <a href="/catalog/attributes" class="btn-commit maxw-200-px">Attributes</a>
            </div>
        </div>
    </div>
</div>