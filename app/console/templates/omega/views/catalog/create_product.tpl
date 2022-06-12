${ await include('catalog/products_list'); }

<form method="post" class="dy-fx fx-fx-maxc wh-100-pc pl-20 pr-20" style="background-color: var(--color-3);">
    <div class="dy-fx fx-fd-rw fx-fx-maxc wh-100-pc br-10"  style="background-color: var(--color-1);">
        <div class="dy-fx fx-fd-cn wh-70-pc pg-25">

            <div class="pt-10 pb-10 mb-30 bb-cr-1-2px">
                <h3>Product</h3>
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('name', 'fc-3')}">${errors.get('name', 'Name')}</label>
                ${html.textbox('name', product)}
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('description', 'fc-3')}">${errors.get('description', 'Description')}</label>
                <textarea name="description">${product.description}</textarea>
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('price', 'fc-3')}">${errors.get('price', 'Price')}</label>
                ${html.textbox('price', product)}
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('visibility', 'fc-3')}">${errors.get('visibility', 'Visibility')}</label>
                ${
                    html.select('visibility', product)
                    .option('1', 'Visible')
                    .option('0', 'Hidden')
                }
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('sku', 'fc-3')}">${errors.get('sku', 'SKU')}</label>
                ${html.textbox('sku', product)}
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('barcode', 'fc-3')}">${errors.get('barcode', 'Barcode')}</label>
                ${html.textbox('barcode', product)}
            </div>

            <div class="dy-fx wh-100-pc mb-20">
                <div class="wh-50-pc pr-15">
                    <label class="mb-5 dy-bk fw-500 ${errors.hasError('quantity', 'fc-3')}">${errors.get('quantity', 'Quantity')}</label>
                    ${html.textbox('quantity', product)}
                </div>
                <div class="wh-50-pc pl-15">
                    <label class="mb-5 dy-bk fw-500 ${errors.hasError('track_quantity', 'fc-3')}">${errors.get('track_quantity', 'Track Quantity')}</label>
                    ${
                        html.select('track_quantity', product)
                        .option('0', 'No')
                        .option('1', 'Yes')
                    }
                </div>
            </div>

            <div class="mb-20">
                <input type="hidden" value="${product.id}" name="id" />
                <input type="submit" value="Save" />
                <input type="button" value="delete" onclick="deleteProduct()" />
            </div>
        </div>

        <div class="dy-fx fx-fd-cn wh-30-pc minw-400-px pg-25 bl-cr-1-1px bg-2">
            <div class="pt-10 pb-10 mb-30 bb-cr-2-2px">
                <h3>Attributes</h3>
            </div>
        @{foreach attribute in attributes}
            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('attr_' + attribute.property, 'fc-3')}">${errors.get('attr_' + attribute.property, attribute.name)}</label>

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
        </div>
    </div>
</form>

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