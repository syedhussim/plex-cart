{{ await include('catalog/products_list') }}

<div class="{{ products.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Product</h4>
                        {% if product.id %}
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="productMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-200-px dy-ne" id="productContextMenu">
                                    <a class="menu-item" href="{{ store.url }}{{ product.url }}" target="_blank">
                                        <i class="ico-open-window mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Store View</span>
                                        </div>
                                    </a>
                                    <div class="menu-item" id="btnCloneProduct" data-product_id="{{ product.id }}">
                                        <i class="ico-copy mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Clone</span>
                                        </div>
                                    </div>
                                    <div class="menu-item" id="btnConfirmDeleteProduct">
                                        <i class="ico-trash mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                    <div class="dy-ne fx-fd-cn pg-15 bg-7" id="deleteMsg">
                                        <p class="mn-0">Are you sure you want to delete this product?<p>
                                        <div class="dy-fx fx-jc-sb">
                                            <button type="button" class="btn-cancel">Cancel</button>
                                            <button type="button" class="btn-delete" id="btnDeleteProduct" data-product_id="{{ product.id }}">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {% /if %}
                    </div>
                </div>

                <div class="dy-fx fx-jc-fe mb-20">
                    <input type="checkbox" id="chk_{{ product.id }}" value="1" name="active" {{ product.active == 1 ? 'checked' : '' }}>
                    <label for="chk_{{ product.id }}"></label>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError ('name', 'fc-9') }}" >{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', product) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('description', 'fc-9') }}">{{ errors.get('description', 'Description') }}</label>
                    {{ html.textarea('description', product).css('ht-100-px') }}</textarea>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('price', 'fc-9') }}">{{ errors.get('price', 'Price') }}</label>
                    {{ html.textbox('price', product) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('taxable', 'fc-9') }}">{{ errors.get('taxable', 'Taxable') }}</label>
                    {{ 
                        html.select('taxable', product)
                        .option('0', 'No')
                        .option('1', 'Yes')
                    }}
                </div>

                <div class="app-content-section">
                    <div class="inner-section">
                        <h4 class="fw-700">Inventory</h4>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('sku', 'fc-9') }}">{{ errors.get('sku', 'SKU') }}</label>
                    {{ html.textbox('sku', product) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('barcode', 'fc-9') }}">{{ errors.get('barcode', 'Barcode') }}</label>
                    {{ html.textbox('barcode', product) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('quantity', 'fc-9') }}">{{ errors.get('quantity', 'Quantity') }}</label>
                    {{ html.textbox('quantity', product) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('track_quantity', 'fc-9') }}">{{ errors.get('track_quantity', 'Track Quantity') }}</label>
                    {{ 
                        html.select('track_quantity', product)
                        .option('0', 'No')
                        .option('1', 'Yes')
                    }}
                </div>

                {% if attributes.length > 0 %}

                    <div class="app-content-section">
                        <div class="inner-section">
                            <h4 class="fw-700">Attributes</h4>
                        </div>
                    </div>

                    {% foreach attribute in attributes %}
                        <div class="mb-20">
                            <label class="mb-5 dy-bk fw-700 {{ errors.hasError('attr_' + attribute.property, 'fc-9') }}">{{ errors.get('attr_' + attribute.property, attribute.name) }}</label>

                            {% if attribute.type == 'ATTR_TEXT' %}
                                {{ html.textbox('attr_' + attribute.property, attribute.product_value).css('input-1') }}
                            {% /if %}       

                            {% if attribute.type == 'ATTR_TEXTAREA' %}
                                {{ html.textarea('attr_' + attribute.property, attribute.product_value).css('input-1') }}
                            {% /if %}

                            {% if attribute.type == 'ATTR_DATE' %}
                                {{ html.date('attr_' + attribute.property, attribute.product_value).css('input-1') }}
                            {% /if %}

                            {% if attribute.type == 'ATTR_MENU' %}
                                {{ 
                                    html.select('attr_' + attribute.property, attribute.product_value)
                                    .option('', '')
                                    .fromArray(attribute.menu_items)
                                }}
                            {% /if %}
                        </div>
                    {% /foreach %}
                {% /if %}

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ product.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>
            </div>

            <div class="app-content-right-panel">
                <div>
                    <span class="btn-action" id="btnAssetPanel"><i class="ico-eclipse"></i></span>
                </div>
               
                <div class="dy-fx fx-fd-cn wd-100-pc" id="productImages"></div>
            </div>

            <div class="app-side-container dy-ne" id="assetPanel">
                <div class="inner-container" id="assetList"></div>
            </div>
        </form>
    </div>
</div>

<template id="item">
    <div class="data-row cr-pr image-row bg-1 mb-10 br-4-px" data-image_id="id" data-image="name" data-image_size="image_size">
        <div class="dy-fx pl-25 pr-15">
            <div class="dy-fx minw-80-px fx-jc-cr">
                <div class="x"><img data-src="img" class="wh-100-pc" /></div>
            </div>
        </div>
        <div class="fx fx-fx-maxc pt-30 pb-30 pr-15 wh-350-px">
            <a data-name="name" class="fs-18 fw-500"></a>
            <div class="fs-13 fc-6 mt-5" data-name="image_size"></div>
        </div>
        <div class="minw-40-px dy-fx pr-20 fx-jc-fe">
            <i class="dy-ne tick">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </i>
        </div>
    </div>
</template>

<template id="productThumb">
    <div class="data-row data-row-active mb-10 br-4-px" data-image_id="id" data-image="name" data-image_size="image_size">
        <div class="dy-fx pl-25 pr-15">
            <div class="dy-fx minw-80-px fx-jc-cr">
                <div class="x"><img data-src="img" class="wh-100-pc" /></div>
            </div>
        </div>
        <div class="fx fx-fx-maxc pt-30 pb-30 pr-15 wh-350-px">
            <a data-name="name" class="fs-18 fw-500"></a>
            <div class="fs-13 fc-6 mt-5" data-name="image_size"></div>
        </div>
        <div class="minw-40-px dy-fx pr-20 fx-jc-fe">
            <i class="dy-ne tick">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </i>
        </div>
        <input type="hidden" name="images" value="id" />
    </div>
</template>

<script type="text/javascript">

    class App extends AppBase{

        mount(){
            this.productImages = new Map({{JSON.stringify(product.images)}}.map(obj => [obj.id, obj]));

            this.click('#productMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#productContextMenu');
                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnCloneProduct', async(sender) => {

                let response = await fetch('/catalog/products/clone', {
                    method : 'POST',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.product_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/catalog/products/create?pid=' + result.id;
                }
                
            });

            this.click('#btnAssetPanel', async () => {

                let e = document.querySelector('#assetPanel');
                e.classList.add('dy-fx');

                document.querySelector('#assetList').replaceChildren();

                let response = await fetch('/media/library.json');

                let result = await response.json();

                for(let item of result.data){
                    item.img = '/' + item.name;
                    item.image_size = item.image_size.join(' x ');
                    item.selected = this.productImages.has(item.id);

                    this.render('assetList', 'item', item, {
                        loaded : (template) => {

                            let imageRow = template.querySelector('.image-row');

                            imageRow.addEventListener('click', () => {
                                if(this.productImages.has(imageRow.dataset.image_id)){

                                    let e = imageRow.querySelector('.tick');
                                    e.classList.add('dy-ne');
                                    e.classList.remove('symbol-green');

                                    this.productImages.delete(imageRow.dataset.image_id);
                                }else{

                                    let e = imageRow.querySelector('.tick');
                                    e.classList.remove('dy-ne');
                                    e.classList.add('symbol-green');

                                    this.productImages.set(imageRow.dataset.image_id, {
                                        id : imageRow.dataset.image_id,
                                        name : imageRow.dataset.image,
                                        img : '/' + imageRow.dataset.image,
                                        image_size : imageRow.dataset.image_size
                                    });
                                }
                                
                                this.renderProductImages();
                            });

                            if(item.selected){
                                let e = template.querySelector('.tick');
                                e.classList.remove('dy-ne');
                                e.classList.add('symbol-green');
                            }
                        }
                    });
                }
            });

            this.click('#btnConfirmDeleteProduct', () => {

                event.stopPropagation();

                let e = document.querySelector('#deleteMsg')
                e.classList.remove('dy-ne');
                e.classList.add('dy-fx');

                let ctxMenu = document.querySelector('#productContextMenu')
                ctxMenu.classList.remove('wh-200-px');
                ctxMenu.classList.add('wh-300-px');
            });

            this.click('#btnDeleteProduct', async (sender) => {

                let response = await fetch('/catalog/products/create', {
                    method : 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.product_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/catalog/products';
                }
            });

            this.renderProductImages();
        }

        renderProductImages(){

            document.querySelector('#productImages').replaceChildren();

            for(let [id,image] of this.productImages){
                this.render('productImages', 'productThumb', image);
            }
        }
    }

    new App();

</script>

