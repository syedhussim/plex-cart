{% if !attributes.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/content/attributes/create" class="btn-action"><i class="ico-add"></i></a>
            </div>
        </div>

        <div class="container">
            {% foreach attributeRow in attributes %}
                <div class="data-row {{ attribute.id == attributeRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/content/attributes/create?id={{ attributeRow.id }}'">
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-20 dy-fx fx-jc-sb fx-ai-cr">
                        <div>
                            <div>
                                <span class="fs-16 fw-700">{{ attributeRow.name }}</span>
                            </div>
                            <div class="fs-13 fc-6 mt-5">{{ attributeRow.property }}</div>
                        </div>
                        <div><span class="active{{ attributeRow.active }}"></span></div>
                    </div>
                </div>
            {% /foreach %}
        </div>
    </div>
{% /if %}