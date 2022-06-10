<div class="dy-fx fx-fd-rw minw-600-px maxw-600-px fx-fx-maxc">
    <div class="dy-fx fx-fd-cn wh-100-pc pt-25 pb-25">
        <div class="pt-10 pb-10 mb-30 bb-cr-1-2px">
            <h3>Products</h3>
        </div>

        <div class="dy-fx">
            <table class="grid">
            @{foreach productRow in products} 
                <tr class="bb-cr-1-1px" style="${equals(product.id, productRow.id, 'border-left:3px solid red')}" >
                    <td class="wh-80-px bb-cr-1-1px pl-10 pt-15 pb-15 pr-10">
                        <div style="background-color: #fff;
border: 2px solid #dbe1f9;
padding: 15px;
justify-content: center;
height: 80px;
width: 80px;
font-size: 9px;
letter-spacing: 1px;
text-transform: uppercase;
align-items: center;
border-radius: 3px;
display: flex;">
                            <svg version="1.1" viewBox="0 0 512.001 512.001" width="40" fill="#dbe1f9">
                                <path d="M160.235,276.571l-144.5-159.983c-9.383,5.578-15.734,15.711-15.734,27.414v256.005c0,17.672,14.328,31.994,32,31.994 h268.625l-58.867-65.17C196.993,360.155,162.407,322.662,160.235,276.571z"></path>
                                <path d="M480.001,112.001h-112l-23.156-46.313c-5.422-10.84-16.5-17.687-28.625-17.687H195.782 c-12.125,0-23.203,6.848-28.625,17.688l-10.836,21.672L87.782,10.594C75.985-2.539,55.735-3.61,42.594,8.211 c-13.141,11.828-14.203,32.063-2.375,45.196l399.992,448c6.313,7.024,15.031,10.594,23.797,10.594 c7.625,0,15.281-2.711,21.391-8.211c13.141-11.828,14.203-32.067,2.375-45.2l-23.734-26.59h15.961c17.672,0,32-14.321,32-31.994 V144.002C512.001,126.33,497.672,112.001,480.001,112.001z M237.196,177.94c6.086-1.219,12.359-1.938,18.805-1.938 c53.016,0,96,42.981,96,96.002c0,10.223-1.758,19.996-4.727,29.227L237.196,177.94z"></path>
                            </svg>
                        </div>
                    </td>
                    <td class="pl-10 pt-15 pb-15 pr-10">
                    <div style="font-weight:700; font-size:18px">${productRow.sku}</div>
                        <a href="/catalog/products/create?pid=${productRow.id}" style="color:#686886; display:block; margin-top:4px">${productRow.name}</a>
                        <div class="fx mt-10">
                        <span style="color:orange; font-weight:700;  display:inline-block; padding:5px 10px; border-radius:4px; background-color: #f4ecdc; font-size: 10px;
text-transform: uppercase;
letter-spacing: 0px;">Visible</span>
                        <span style="color: #4a6c5a; font-weight:700; display:inline-block; padding:5px 10px; border-radius:4px; background-color: #d8f4e5; font-size: 10px;
text-transform: uppercase;
letter-spacing: 0px;">1000</span>
                        </div>
                    </td>
                    <td class="pg-10">${productRow.price}</td>
                </tr>
            @{/foreach}
            </table>
        </div>
    </div>
</div>