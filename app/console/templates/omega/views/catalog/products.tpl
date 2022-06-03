${await include('shared/header')}
<table border="1">
@{foreach product in products} 
    <tr>
        <td><a href="/catalog/products/create?pid=${product.id}">${product.name}</a></td>
        <td>${product.sku}</td>
        <td>${product.price}</td>
    </tr>
@{/foreach}
</table>