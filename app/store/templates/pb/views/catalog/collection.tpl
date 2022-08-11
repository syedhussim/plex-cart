{% foreach product in products %}
    <div><a href="{{ product.url | url }}">{{ product.name }}</a></div>
    <div>{{ product.description }}</a></div>
    <div>{{ product.price | money }}</div>
{% /foreach %}