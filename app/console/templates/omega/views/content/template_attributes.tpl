{{ await include('content/pages_list') }}

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Template / Attributes / <span class="fc-9">{{ template.name }}</span></h4>
                    </div>
                </div>

                <div class="mb-20">
                    <div class="input-container listbox">
                        <ul>
                            {% foreach attribute in attributes %}
                                <li>
                                    <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                                        <div>
                                            <span class="fw-700">{{ attribute.name }}</span>
                                        </div>
                                        <div class="fs-13 fc-6 mt-5">
                                            <span>{{ attribute.property }} / {{ attribute.type | lower | split | last }}</span>
                                        </div>
                                    </div>
                                    <div class="pr-15">
                                        <input type="checkbox" name="attribute_id" value="{{ attribute.id }}" id="chk_{{ attribute.id }}" {{ attribute.template_id ? 'checked' : '' }} />
                                        <label for="chk_{{ attribute.id }}"></label>
                                    </div>
                                </li>
                            {% /foreach %}
                        </ul>
                    </div>
                </div>

                <div class="mb-20 dy-fx fx-jc-fe">
                    <input type="hidden" value="{{ page.id }}" name="pid" />
                    <input type="hidden" value="{{ template.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>