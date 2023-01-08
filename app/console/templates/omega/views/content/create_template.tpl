{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Template <span class="fc-9">{{ template.name }}</span></h4>
                        {% if template.id %}
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="templateMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-300-px dy-ne" id="templateContextMenu">
                                    <a class="menu-item" href="/content/templates/attributes?pid={{ page.id }}&id={{ template.id }}">
                                        <i class="ico-attr mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Template Attributes</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        {% /if %}
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', template) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('template_file', 'fc-9') }}">{{ errors.get('template_file', 'Template File') }}</label>
                    {{ 
                        html.select('template_file', template)
                        .option('','')
                        .fromArray(templateFiles)
                    }}
                </div>

                {% if !attributes.empty() %}

                    <div class="app-content-section">
                        <div class="inner-section">
                            <h4 class="fw-700">Attributes</h4>
                        </div>
                    </div>

                    {% foreach attribute in attributes %}
                        <div class="mb-20">
                            <label class="mb-5 dy-bk fw-700 {{ errors.hasError('attr_' + attribute.property, 'fc-9') }}">{{ errors.get('attr_' + attribute.property, attribute.name) }}</label>

                            {% if attribute.type == 'ATTR_TEXT' %}
                                {{ html.textbox('attr_' + attribute.property, util.getObjProperty(template.attributes, attribute.property).value).css('input-1') }}
                            {% /if %}       

                            {% if attribute.type == 'ATTR_TEXTAREA' %}
                                {{ html.textarea('attr_' + attribute.property, util.getObjProperty(template.attributes, attribute.property).value).css('input-1') }}
                            {% /if %}

                            {% if attribute.type == 'ATTR_DATE' %}
                                {{ html.date('attr_' + attribute.property, util.getObjProperty(template.attributes, attribute.property).value).css('input-1') }}
                            {% /if %}

                            {% if attribute.type == 'ATTR_MENU' %}
                                {{ 
                                    html.select('attr_' + attribute.property, util.getObjProperty(template.attributes, attribute.property).value)
                                    .option('', '')
                                    .fromArray(attribute.menu_items)
                                }}
                            {% /if %}
                        </div>
                    {% /foreach %}
                {% /if %}

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ template.page_id }}" name="page_id" />
                    <input type="hidden" value="{{ template.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){
            this.click('#templateMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#templateContextMenu');
                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });
        }
    }

    new App();

</script>