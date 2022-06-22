${ await include('catalog/products_list'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h3>Product</h3>

                        <div class="dy-fx" style="position:relative">
                            <span class="btn-action" onclick="toggleProductMenu(event)"><i class="ico-eclipse"></i></span>
                            <div class="dropdown-menu wh-200-px dy-ne" id="productMenu">
                                <div class="menu-item">
                                    <i class="ico-copy mr-10 minw-30-px"></i>
                                    <span onclick="copy(event)">Copy</span>
                                </div>
                                <div class="menu-item">
                                    <i class="ico-paste mr-10 minw-30-px"></i>
                                    <span onclick="alert('paste')">Paste</span>
                                </div>
                                <div class="menu-item" onclick="confirmDelete(event)">
                                    <i class="ico-trash mr-10 minw-30-px"></i>
                                    <div class="dy-fx fx-fd-cn">
                                        <span>Delete</span>
                                    </div>
                                </div>
                                <div class="dy-ne fx-fd-cn pg-15 bg-7" id="deleteMsg">
                                    <p class="mn-0">Are you sure you want to delete this product?<p>
                                    <div class="dy-fx fx-jc-sb">
                                        <button type="button" class="cancel">Cancel</button>
                                        <button type="button" class="delete" onclick="deleteProduct('${product.id}')">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('name', 'fc-9')}">${errors.get('name', 'Name')}</label>
                    ${html.textbox('name', product)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('description', 'fc-9')}">${errors.get('description', 'Description')}</label>
                    <textarea name="description">${product.description}</textarea>
                </div>

                @{foreach attribute in attributes}
                    <div class="mb-20">
                        <label class="mb-5 dy-bk fw-700 ${errors.hasError('attr_' + attribute.property, 'fc-9')}">${errors.get('attr_' + attribute.property, attribute.name)}</label>

                        @{if attribute.type == 'ATTR_TEXT'}
                            ${html.textbox('attr_' + attribute.property, attribute.product_value).css('input-1')}
                        @{/if}

                        @{if attribute.type == 'ATTR_TEXTAREA'}
                            ${html.textarea('attr_' + attribute.property, attribute.product_value).css('input-1')}
                        @{/if}

                        @{if attribute.type == 'ATTR_DATE'}
                            ${html.date('attr_' + attribute.property, attribute.product_value).css('input-1')}
                        @{/if}

                        @{if attribute.type == 'ATTR_MENU'}
                            ${
                                html.select('attr_' + attribute.property, attribute.product_value)
                                .option('', '')
                                .fromArray(attribute.menu_items)
                            }
                        @{/if}
                    </div>
                @{/foreach}

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="${product.id}" name="id" />
                    <button type="submit" class="commit">Save</button>
                </div>
            </div>

            <div class="app-content-right-panel">
                <div class="data-row" >
                    <div class="dy-fx pl-15 pr-15">
                        <div class="dy-fx minw-70-px fx-jc-cr" style="border:2px solid #dbe1f9; background-color:#fff; height:70px; border-radius:4px; ">
                            <img src="/omega/public/images/camera.svg" class="wh-40-px" />
                        </div>
                    </div>
                    <div class="wh-100-pc pt-15 pb-15 pr-15">
                        <a href="/catalog/products/create?pid=" class="fs-18 fw-500">Filename</a>
                        <div class="fs-13 fc-6 mt-5">old name</div>
                        <div class="fx mt-10">
                            <span class="attr-orange">Visible</span>
                        </div>
                    </div>
                </div>    
    

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('price', 'fc-9')}">${errors.get('price', 'Price')}</label>
                    ${html.textbox('price', product)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('visibility', 'fc-9')}">${errors.get('visibility', 'Visibility')}</label>
                    ${
                        html.select('visibility', product)
                        .option('1', 'Visible')
                        .option('0', 'Hidden')
                    }
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('sku', 'fc-9')}">${errors.get('sku', 'SKU')}</label>
                    ${html.textbox('sku', product)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('barcode', 'fc-9')}">${errors.get('barcode', 'Barcode')}</label>
                    ${html.textbox('barcode', product)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('quantity', 'fc-9')}">${errors.get('quantity', 'Quantity')}</label>
                    ${html.textbox('quantity', product)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('track_quantity', 'fc-9')}">${errors.get('track_quantity', 'Track Quantity')}</label>
                    ${
                        html.select('track_quantity', product)
                        .option('0', 'No')
                        .option('1', 'Yes')
                    }
                </div>
            </div>
        </form>
    </div>
</div>

<script type="text/javascript">
    function toggleProductMenu(){
        let e = document.querySelector('#productMenu');

        if(e.classList.contains('dy-ne')){
            e.classList.remove('dy-ne');
            e.classList.add('dy-fx');
        }else{
            e.classList.remove('dy-fx');
            e.classList.add('dy-ne');
        }
        event.stopPropagation();
    }

    function copy(event){

        alert('ok')
        event.stopPropagation();
        
    }

    function confirmDelete(event){

        event.stopPropagation();

        let e = document.querySelector('#deleteMsg')
        e.classList.remove('dy-ne');
        e.classList.add('dy-fx');

        let m = document.querySelector('#productMenu')
        m.classList.remove('wh-200-px');
        m.classList.add('wh-300-px');
    }

    async function deleteProduct(id){
        
        let response = await fetch('/catalog/products/create', {
            method : 'DELETE',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            },
            body : JSON.stringify({ product_id : id })
        });

        let result = await response.json();

        if(result.success){
            window.location = '/catalog/products';
        }
    }
</script>