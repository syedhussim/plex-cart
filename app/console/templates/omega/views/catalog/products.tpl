{{ await include('catalog/products_list') }}

<div class="{{ products.empty() ? 'app-container-full' : 'app-container' }} fx-jc-cr fx-ai-cr">
   
    <div class="dy-fx fx-fd-cn fx-ai-cr">
    <h1>Catalog</h1>
    <p class="fs-18">You don't have any products in your catalog yet.</p>
    <a href="/catalog/products/create" class="btn-commit maxw-200-px">Add Product</a>
    </div>

</div>