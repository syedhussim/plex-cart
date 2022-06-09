<h1>Create Attribute</h1>

<form method="post">
    <div>
        <label>Name</label>
        <input type="text" name="name" value="" />
    </div>

    <div>
        <label>Property</label>
        <input type="text" name="property" value="" />
    </div>

    <div>
        <label>Type</label>
        <select name="type">
            <option value="ATTR_TEXT">Text</option>
            <option value="ATTR_TEXTAREA">Large Text</option>
            <option value="ATTR_DATE">Date</option>
            <option value="ATTR_MENU">Menu</option>
        </select>
    </div>

    <div>
        <label>Menu Items</label>
        <textarea name="menu_items"></textarea>
    </div>

    <div>
        <label>Required</label>
        <input type="checkbox" name="required" value="1" />
    </div>

    <input type="submit" value="Save" />
</form>