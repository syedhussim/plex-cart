${ await include('catalog/products_list'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <h3>Attribute</h3>
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
                    <button value="delete" class="delete" onclick="deleteAttribute()">Delete</button>
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
    async function deleteProduct(){
        
        let response = await fetch('/catalog/products/create', {
            method : 'DELETE',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            },
            body : JSON.stringify( { pid : '${product.id}' })
        });

        //console.log()
    }
</script>