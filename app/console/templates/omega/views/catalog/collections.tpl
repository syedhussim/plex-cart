{{ await include('catalog/collections_list') }}

<div class="{{ collections.empty() ? 'app-container-full' : 'app-container' }} fx-jc-cr fx-ai-cr">
   
    <div class="dy-fx fx-fd-cn fx-ai-cr">
        <h1>Catalog Collections</h1>
        {% if collections.empty() %}
            <p class="fs-18 fw-500">Create attributes to add dynamic properties to product data.</p>
            <a href="/catalog/collections/create" class="btn-commit maxw-200-px">Create Collection</a>
        {% else %}
            <p class="fs-18 fw-500">Click an attribute to view and edit details.</p>
        {% /if %}
    </div>
</div>