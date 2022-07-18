<h1>{{ product.name | trim | upper }}</h1>

<p>{{ product.description }}</p>

<div>{{ product.price | money }}</div>

<form method="post" action="/basket">
    <input type="hidden" name="product_id" value= "{{ product.id }}" />
    <input type="hidden" name="quantity" value= "1" />
    <input type="submit" value="Add to cart" />
</form>