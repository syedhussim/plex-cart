{% if !collections.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/catalog/collections/create" class="btn-action"><i class="ico-add"></i></a>
            </div>
        </div>

        <div class="container">
            {% foreach collectionRow in collections %}
                <div class="data-row cr-pr {{ collection.id == collectionRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/catalog/collections/create?pid={{ collectionRow.id }}'" >
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-15">
                        <div>
                            <span class="fs-18 fw-500">{{ collectionRow.name }}</span>
                        </div>
                        <div class="fs-13 fc-6 mt-5">{{ collectionRow.url }}</div>
                    </div>
                </div>
            {% /foreach %}
        </div>
    </div>
{% /if %}