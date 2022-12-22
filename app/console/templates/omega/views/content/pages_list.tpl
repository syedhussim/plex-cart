
{% if !pages.empty() %}
    <div class="app-panel">
        <div class="toolbar">
            <div class="actions">
                <a href="/content/pages/create" class="btn-action"><i class="ico-add"></i></a>
            </div>
        </div>

        <div class="container">
            {% foreach pageRow in pages %}
                <div class="data-row cr-pr {{ page.id == pageRow.id ? 'data-row-selected' : '' }}" onclick="window.location='/content/pages/create?pid={{ pageRow.id }}'" >
                    <div class="wh-100-pc pt-15 pb-15 pl-20 pr-15">
                        <div>
                            <span class="fs-18 fw-500">{{ pageRow.name }}</span>
                        </div>
                        <div class="fs-13 fc-6 mt-5">{{ pageRow.url }}</div>
                    </div>
                </div>
            {% /foreach %}
        </div>
    </div>
{% /if %}