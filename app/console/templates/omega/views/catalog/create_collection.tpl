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
                                    <div class="menu-item" id="btnDeleteProduct" data-collection_id="{{ collection.id }}">
                                        <i class="ico-trash mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {% /if %}
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', collection) }}
                </div>

                <div class="app-content-section">
                    <div class="inner-section">
                        <h4 class="fw-700">Filters</h4>
                    </div>
                </div>

                {% foreach attribute in attributes %}
                    <div class="dy-fx fx-jc-sb fx-ai-cr br-cr-4 br-4-px mb-10">
                        <div class="pl-15 pr-15">
                            {{ attribute.name }}
                            {{ html.hidden('property', attribute).id('') }}
                        </div>

                        <div class="dy-fx">

                        <div class="dy-fx wh-200-px">
                            {{ 
                                html.select('op')
                                .id('')
                                .option('eq', 'Equals')
                                .option('lk', 'Like')
                                .option('lt', 'Less Than')
                                .option('gt', 'Greater Than')
                            }}
                        </div>

                        <div class="dy-fx wh-300-px">
                            {% if attribute.type == 'ATTR_TEXT' %}
                                {{ html.textbox('property_value', attribute.product_value).css('input-1') }}
                            {% /if %}       

                            {% if attribute.type == 'ATTR_DATE' %}
                                {{ html.date('property_value', attribute.product_value).css('input-1') }}
                            {% /if %}

                            {% if attribute.type == 'ATTR_MENU' %}
                                {{ 
                                    html.select('property_value', attribute.product_value)
                                    .option('', '')
                                    .fromArray(attribute.menu_items)
                                }}
                            {% /if %}
                        </div>

                        </div>
                    </div>
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

            let attributes = {{ JSON.stringify(attributes.toArray()) }};

            this.change('.property', (sender) => {
                
            });
        }
    }

    new App();

</script>