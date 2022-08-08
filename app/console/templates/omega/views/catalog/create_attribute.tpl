{{ await include('catalog/attributes_list') }}

<div class="{{ attributes.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
            
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Attribute</h4>
                        {% if attribute.id %}
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="attributeMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-200-px dy-ne" id="attributeContextMenu">
                                    <div class="menu-item" id="btnDeleteProduct" data-attribute_id="{{ attribute.id }}">
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

                <div class="dy-fx fx-jc-fe mb-20">
                    <input type="checkbox" id="chk_{{ attribute.id }}" value="1" name="active" {{ attribute.active == 1 ? 'checked' : '' }}>
                    <label for="chk_{{ attribute.id }}"></label>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', attribute) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('property', 'fc-9') }}">{{ errors.get('property', 'Property Name') }}</label>
                    {{ html.textbox('property', attribute) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('type', 'fc-9') }}">{{ errors.get('type', 'Type') }}</label>
                    {{ 
                        html.select('type', attribute)
                        .option('ATTR_TEXT', 'Text')
                        .option('ATTR_TEXTAREA', 'Large Text')
                        .option('ATTR_DATE', 'Date')
                        .option('ATTR_MENU', 'Menu')
                    }}
                </div>

                <div class="mb-20 menu-items {{ attribute.type != 'ATTR_MENU' ? 'dy-ne' : '' }}">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('menu_items', 'fc-9') }}">{{ errors.get('menu_items', 'Menu Items') }}</label>
                    {{ html.textarea('menu_items', attribute).css('ht-100-px') }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('visibility', 'fc-9') }}">{{ errors.get('visibility', 'Visibility') }}</label>
                    {{ 
                        html.select('visibility', attribute)
                        .fromArray(visibility, true)
                    }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('required', 'fc-9') }}">{{ errors.get('required', 'Required') }}</label>
                    {{ 
                        html.select('required', attribute)
                        .option('0', 'No')
                        .option('1', 'Yes')
                    }}
                </div>

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ attribute.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#attributeMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#attributeContextMenu');
                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnDeleteProduct', async(sender) => {

                let response = await fetch('/catalog/attributes/create', {
                    method : 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.attribute_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/catalog/attributes';
                }
            });

            this.keyup('#name', (sender) => {
                document.querySelector('#property').value = sender.value.replaceAll(' ', '_').toLowerCase();
            });

            this.change('#type', (sender) => {
                if(sender.value == 'ATTR_MENU'){
                    document.querySelector('.menu-items').classList.remove('dy-ne');
                }else{
                    document.querySelector('.menu-items').classList.add('dy-ne');
                }
            });
        }
    }

    new App();

</script>