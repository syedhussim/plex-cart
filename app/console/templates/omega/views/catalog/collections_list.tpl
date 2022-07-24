{% if !collections.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/catalog/collections/create" class="btn-action"><i class="ico-add"></i></a>
            </div>
        </div>

        <div class="container">
            {% foreach collectionRow in collections %}
                <div class="data-row {{ collection.id == collectionRow.id ? 'data-row-selected' : '' }}" >
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-15">
                        <a href="/catalog/collections/create?id={{ collectionRow.id }}" class="fs-18 fw-500">{{ collectionRow.name }}</a>
                        <div class="fs-13 fc-6 mt-5">{{ collectionRow.property }}</div>
                        <div class="fx mt-10">
                            <span class="attr-green">{{ collectionRow.type }}</span>
                            {% if collectionRow.required %}
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