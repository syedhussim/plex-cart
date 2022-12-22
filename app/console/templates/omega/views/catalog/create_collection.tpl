{{ await include('catalog/collections_list') }}

<div class="{{ collections.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
            
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>collection</h4>
                        {% if collection.id %}
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="collectionMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-200-px dy-ne" id="collectionContextMenu">
                                    <a class="menu-item" href="{{ store.url }}{{ collection.url }}" target="_blank">
                                        <i class="ico-open-window mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Store View</span>
                                        </div>
                                    </a>
                                    <div class="menu-item" id="btnConfirmDeletePage">
                                        <i class="ico-trash mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                    <div class="dy-ne fx-fd-cn pg-15 bg-7" id="deleteMsg">
                                        <p class="mn-0">Are you sure you want to delete this collection?<p>
                                        <div class="dy-fx fx-jc-fe">
                                            <button type="button" class="btn-delete" id="btnDeletePage" data-page_id="{{ collection.id }}">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {% /if %}
                    </div>
                </div>

                <div class="dy-fx fx-jc-fe mb-20">
                    <input type="checkbox" id="chk_{{ collection.id }}" value="1" name="active" {{ collection.active == 1 ? 'checked' : '' }}>
                    <label for="chk_{{ collection.id }}"></label>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', collection) }}
                </div>

                <div class="app-content-section">
                    <div class="inner-section">
                        <h4 class="fw-700">Templates</h4>
                        {% if collection.id %}
                            <a href="/collections/templates/create?cid={{ collection.id }}" class="btn-action"><i class="ico-add"></i></a>
                        {% /if %}
                    </div>
                </div>

                {% foreach template in templates %}
                    <div class="dy-fx fx-jc-sb fx-ai-cr br-cr-4 br-4-px mb-15">
                        <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                            <div>
                                <a href="/collections/templates/create?cid={{ collection.id }}&id={{ template.id }}" class="fs-18 fw-500">{{ template.name }}</a>
                            </div>
                            <div class="fs-13 fc-6 mt-5">{{ template.template_file }}</div>
                        </div>
                        <div class="pr-15">
                            <input type="radio" name="template_id" value="{{ template.id }}" id="rdo_{{ template.id }}" {{ collection.template_id == template.id ? 'checked' : '' }} />
                            <label for="rdo_{{ template.id }}"></label>
                        </div>
                    </div>
                {% /foreach %}

                <div class="app-content-section">
                    <div class="inner-section">
                        <h4 class="fw-700">Filters</h4>
                    </div>
                </div>

                <label class="mb-5 dy-bk fw-700 fc-9">{{ errors.get('attribute_error') }}</label>

                {% foreach attribute in attributes %}
                    {% if ['ATTR_TEXT', 'ATTR_DATE', 'ATTR_MENU'].includes(attribute.type) %}
                        <div class="dy-fx fx-jc-sb fx-ai-cr br-cr-4 br-4-px mb-10">
                            <div class="pl-15 pr-15">
                                {{ attribute.name }}
                                {{ html.hidden('property', attribute).id('') }}
                            </div>

                            <div class="dy-fx">
                                <div class="dy-fx wh-200-px">
                                    {{ 
                                        html.select('op', attribute)
                                        .id('')
                                        .option('eq', 'Equals')
                                        .option('lk', 'Like')
                                        .option('lt', 'Less Than')
                                        .option('gt', 'Greater Than')
                                    }}
                                </div>

                                <div class="dy-fx wh-300-px">
                                    {% if attribute.type == 'ATTR_TEXT' %}
                                        {{ html.textbox('property_value', attribute.value).css('input-1') }}
                                    {% /if %}       

                                    {% if attribute.type == 'ATTR_DATE' %}
                                        {{ html.date('property_value', attribute.value).css('input-1') }}
                                    {% /if %}

                                    {% if attribute.type == 'ATTR_MENU' %}
                                        {{ 
                                            html.select('property_value', attribute.value)
                                            .option('', '')
                                            .fromArray(attribute.menu_items)
                                        }}
                                    {% /if %}
                                </div>
                            </div>
                        </div>
                    {% /if %}
                {% /foreach %}

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ collection.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#collectionMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#collectionContextMenu');

                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnConfirmDeletePage', () => {

                event.stopPropagation();

                let e = document.querySelector('#deleteMsg')
                e.classList.remove('dy-ne');
                e.classList.add('dy-fx');

                let ctxMenu = document.querySelector('#collectionContextMenu')
                ctxMenu.classList.remove('wh-200-px');
                ctxMenu.classList.add('wh-300-px');
            });

            this.click('#btnDeletePage', async (sender) => {

                let response = await fetch('/catalog/collections/create', {
                    method : 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.page_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/catalog/collections';
                }
            });
        }
    }

    new App();

</script>