${ await include('catalog/attributes_list'); }

<h1>Create Attribute</h1>

<form method="post">
    <div>
        <label>Name</label>
        ${html.textbox('name', attribute)}
    </div>

    <div>
        <label>Property Name</label>
        ${html.textbox('property', attribute)}
    </div>

    <div>
        <label>Type</label>
        ${
            html.select('type', attribute)
            .option('ATTR_TEXT', 'Text')
            .option('ATTR_TEXTAREA', 'Large Text')
            .option('ATTR_DATE', 'Date')
            .option('ATTR_MENU', 'Menu')
        }
    </div>

    <div>
        <label>Menu Items</label>
        <textarea name="menu_items"></textarea>
    </div>

    <div>
        <label>Required</label>
        <input type="checkbox" name="required" value="1" />
    </div>

    <input type="hidden" value="${attribute.id}" name="id" />
    <input type="submit" value="Save" />
    <input type="button" value="delete" onclick="deleteAttribute()" />
</form>

<script type="text/javascript">
    async function deleteAttribute(){
        
        let response = await fetch('/catalog/attributes/create', {
            method : 'DELETE',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            },
            body : JSON.stringify( { id : '${attribute.id}' })
        });

        //console.log()
    }
</script>