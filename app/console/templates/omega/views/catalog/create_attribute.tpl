${ await include('catalog/attributes_list'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">

                <div class="app-content-header">
                    <h3>Attribute</h3>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('name', 'fc-9')}">${errors.get('name', 'Name')}</label>
                    ${html.textbox('name', attribute)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('property', 'fc-9')}">${errors.get('property', 'Property Name')}</label>
                    ${html.textbox('property', attribute)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('type', 'fc-9')}">${errors.get('type', 'Type')}</label>
                    ${
                        html.select('type', attribute)
                        .option('ATTR_TEXT', 'Text')
                        .option('ATTR_TEXTAREA', 'Large Text')
                        .option('ATTR_DATE', 'Date')
                        .option('ATTR_MENU', 'Menu')
                    }
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('menu_items', 'fc-9')}">${errors.get('menu_items', 'Menu Items')}</label>
                    ${html.textarea('menu_items', attribute)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('visibility', 'fc-9')}">${errors.get('visibility', 'Visibility')}</label>
                    ${
                        html.select('visibility', attribute)
                        .option('', '')
                        .option('1', 'Internal')
                        .option('2', 'Product')
                        .option('3', 'Product - Collection')
                        .option('4', 'Product - Collection - Basket')
                    }
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('required', 'fc-9')}">${errors.get('required', 'Required')}</label>
                    <input type="checkbox" name="required" value="1" />
                </div>

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="${attribute.id}" name="id" />
                    <button type="submit" class="commit">Save</button>
                    <button value="delete" class="delete" onclick="deleteAttribute()">Delete</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">
    async function deleteAttribute(){
        
        let response = await fetch('/catalog/attributes/create', {
            method : 'DELETE',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            },
            body : JSON.stringify( { id : '${attribute.id}' })
        });
    }
</script>