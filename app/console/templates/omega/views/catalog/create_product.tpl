<form method="post" class="dy-fx fx-fx-maxc wh-100-pc">
    <div class="dy-fx fx-fd-rw fx-fx-maxc wh-100-pc">
        <div class="dy-fx fx-fd-cn wh-70-pc pg-25">

            <div class="pt-10 pb-10 mb-30 bb-cr-1-2px">
                <h3>Create Product</h3>
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('name', 'fc-3')}">${errors.get('name', 'Name')}</label>
                <input type="text" name="name" value="${product.name}" />
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('description', 'fc-3')}">${errors.get('description', 'Description')}</label>
                <textarea name="description">${product.description}</textarea>
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('price', 'fc-3')}">${errors.get('price', 'Price')}</label>
                <input type="text" name="price" value="${product.price}" />
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('visibility', 'fc-3')}">${errors.get('visibility', 'Visibility')}</label>
                <select name="visibility">
                    <option value="1" ${product.visibility == 1 ? 'selected' : ''}>Visible</option>
                    <option value="0" ${product.visibility == 0 ? 'selected' : ''}>Hidden</option>
                </select>
            </div>

            <div class="pt-10 pb-10 mb-40 bb-cr-1-2px">
                <h3>Inventory</h3>
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('sku', 'fc-3')}">${errors.get('sku', 'SKU')}</label>
                <input type="text" name="sku" value="${product.sku}" />
            </div>

            <div class="mb-20">
                <label class="mb-5 dy-bk fw-500 ${errors.hasError('barcode', 'fc-3')}">${errors.get('barcode', 'Barcode')}</label>
                <input type="text" name="barcode" value="${product.barcode}" />
            </div>

            <div class="dy-fx wh-100-pc mb-20">
                <div class="wh-50-pc pr-15">
                    <label class="mb-5 dy-bk fw-500 ${errors.hasError('quantity', 'fc-3')}">${errors.get('quantity', 'Quantity')}</label>
                    <input type="text" name="quantity" value="${product.quantity}" />
                </div>
                <div class="wh-50-pc pl-15">
                    <label class="mb-5 dy-bk fw-500 ${errors.hasError('track_quantity', 'fc-3')}">${errors.get('track_quantity', 'Track Quantity')}</label>
                    <select name="track_quantity">
                        <option value="0" ${product.track_quantity == 0 ? 'selected' : ''}>No</option>
                        <option value="1" ${product.track_quantity == 1 ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
            </div>

            <div class="mb-20">
                <input type="hidden" value="${product.id}" name="id" />
                <input type="submit" value="Save" />
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
                    <input type="text" class="input-1" name="attr_${attribute.property}" value="${attribute.product_value}" />
                @{/if}

                @{if attribute.type == 'ATTR_TEXTAREA'}
                    <textarea name="attr_${attribute.property}" class="input-1">${attribute.product_value}</textarea>
                @{/if}

                @{if attribute.type == 'ATTR_DATE'}
                    <input type="date" class="input-1" name="attr_${attribute.property}" value="${attribute.product_value}" />
                @{/if}

                @{if attribute.type == 'ATTR_MENU'}
                    <select name="attr_${attribute.property}" class="input-1">
                        <option value=""></option>
                    @{foreach item in attribute.menu_items}
                        <option value="${item}" ${attribute.product_value == item ? 'selected' : ''}>${item}</option>
                    @{/foreach}
                    </select>
                @{/if}
            </div>
        @{/foreach}
        </div>
    </div>
</form>