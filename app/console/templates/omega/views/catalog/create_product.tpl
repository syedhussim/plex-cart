<h1>Create Product</h1>

<form method="post">
    <div>
        <label>Name</label>
        <input type="text" name="name" value="${product.name}" />
        <span>${errors.get('name')}</span>
    </div>

    <div>
        <label>Description</label>
        <textarea name="description">${product.description}</textarea>
    </div>

    <div>
        <label>Price</label>
        <input type="text" name="price" value="${product.price}" />
        <span>${errors.get('price')}</span>
    </div>

    <div>
        <label>SKU</label>
        <input type="text" name="sku" value="${product.sku}" />
        <span>${errors.get('sku')}</span>
    </div>

    <div>
        <label>Barcode</label>
        <input type="text" name="barcode" value="${product.barcode}" />
    </div>

    @{foreach attribute in attributes}
        <div>
            <label>${attribute.name}</label>

            @{if attribute.type == 'ATTR_TEXT'}
                <input type="text" name="attr_${attribute.property}" value="${attribute.product_value}" />
            @{/if}

            @{if attribute.type == 'ATTR_TEXTAREA'}
                <textarea name="attr_${attribute.property}">${attribute.product_value}</textarea>
            @{/if}

            @{if attribute.type == 'ATTR_DATE'}
                <input type="date" name="attr_${attribute.property}" value="${attribute.product_value}" />
            @{/if}

            @{if attribute.type == 'ATTR_MENU'}
                <select name="attr_${attribute.property}">
                    <option value=""></option>
                @{foreach item in attribute.menu_items}
                    <option value="${item}" ${attribute.product_value == item ? 'selected' : ''}>${item}</option>
                @{/foreach}
                </select>
            @{/if}

            <span>${errors.get('attr_' + attribute.property)}</span>
        </div>
    @{/foreach}

    <input type="submit" value="Save" />
</form>