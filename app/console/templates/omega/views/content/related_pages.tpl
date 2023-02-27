{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
            
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Template / Related Pages / <span class="fc-9">{{ template.name }}</span></h4>
                    </div>
                </div>

                <div class="mb-20">
                    <div class="input-container listbox">
                        <ul>
                            {% foreach attribute in attributes %}
                                {% if ['ATTR_TEXT', 'ATTR_DATE', 'ATTR_MENU'].includes(attribute.type) %}
                                    <li>
                                        <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                                            <div>
                                                <span class="fw-700">{{ attribute.name }}</span>
                                            </div>
                                            <div class="fs-13 fc-6 mt-5">
                                                <span>{{ attribute.property }} / {{ attribute.type | lower | split | last }}</span>
                                            </div>
                                        </div>

                                        <div class="dy-fx  mr-15">
                                            <div class="dy-fx wh-150-px mr-20">
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
                                    </li>
                                {% /if %}
                            {% /foreach %}
                        </ul>
                    </div>
                </div>

                <div class="mb-20 dy-fx fx-jc-fe">
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