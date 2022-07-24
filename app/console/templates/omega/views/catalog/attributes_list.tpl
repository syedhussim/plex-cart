{% if !attributes.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/catalog/attributes/create" class="btn-action"><i class="ico-add"></i></a>
            </div>
        </div>

        <div class="container">
            {% foreach attributeRow in attributes %}
                <div class="data-row {{ attribute.id == attributeRow.id ? 'data-row-selected' : '' }}" >
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-15">
                        <a href="/catalog/attributes/create?id={{ attributeRow.id }}" class="fs-18 fw-500">{{ attributeRow.name }}</a>
                        <div class="fs-13 fc-6 mt-5">{{ attributeRow.property }}</div>
                        <div class="fx mt-10">
                            <span class="attr-green">{{ attributeRow.type }}</span>
                            {% if attributeRow.required %}
                                <span class="attr-pink">Required</span>
                            {% /if %}
                        </div>
                    </div>
                    <div class="minw-100-px dy-fx pr-20 fx-jc-fe fs-16"></div>
                </div>
            {% /foreach %}
        </div>
    </div>
{% /if %}