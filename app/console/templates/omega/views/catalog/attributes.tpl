{{ await include('catalog/attributes_list') }}

<div class="{{ attributes.empty() ? 'app-container-full' : 'app-container' }} fx-jc-cr fx-ai-cr">
   
    <div class="dy-fx fx-fd-cn fx-ai-cr">
        <h1>Catalog Attributes</h1>
        {% if attributes.empty() %}
            <p class="fs-18 fw-500">Create attributes to add dynamic properties to product data.</p>
            <a href="/catalog/attributes/create" class="btn-commit maxw-200-px">Create Attribute</a>
        {% else %}
            <p class="fs-18 fw-500">Click an attribute to view and edit details.</p>
        {% /if %}
    </div>
</div>