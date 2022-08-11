<form method="post">
    <div>
        <label>First Name</label>
        {{ html.textbox('first_name', '') }}
    </div>

    <div>
        <label>Last Name</label>
        {{ html.textbox('last_name') }}
    </div>

    <div>
        <label>Address Line 1</label>
        {{ html.textbox('address_line1') }}
    </div>

    <div>
        <label>Address Line 2</label>
        {{ html.textbox('address_line2') }}
    </div>

    <button type="submit" name="gateway" value="stripe">Pay by card</button>
    <button type="submit" name="gateway" value="paypal">PayPal</button>
</form>