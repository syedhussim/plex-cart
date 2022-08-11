{% foreach item in basket %}
{% console.log(item); %}
    <div>
        <div><a href="{{ item.product.url | url }}">{{ item.product.name }}</a></div><div>{{ item.quantity }}</div>
        <div>{{ item.product.price | money }}</div>
    </div>
{% /foreach %}

<div>Subtotal : {{ basket.subtotal() | money }}</div>
<div>Total : {{ basket.total() | money }}</div>

<a href="{{ '/basket/checkout/shipping' | url }}">Continue to Shipping</a>